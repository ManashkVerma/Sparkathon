const express = require('express');
const { body, validationResult } = require('express-validator');
const database = require('../utils/database');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Create new order
router.post('/', auth, [
  body('shippingAddress').notEmpty(),
  body('paymentMethod').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { shippingAddress, paymentMethod } = req.body;
    const userId = req.user.id;

    // Get user's cart
    const cartItems = await database.all(`
      SELECT c.id, c.quantity, c.productId,
             p.name, p.price, p.stock
      FROM cart c
      JOIN products p ON c.productId = p.id
      WHERE c.userId = ? AND p.isActive = 1
    `, [userId]);

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Check stock availability and calculate total
    let totalAmount = 0;
    for (const item of cartItems) {
      if (item.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${item.name}. Available: ${item.stock}` 
        });
      }
      totalAmount += item.price * item.quantity;
    }

    // Start transaction
    await database.run('BEGIN TRANSACTION');

    try {
      // Create order
      const orderResult = await database.run(
        'INSERT INTO orders (userId, totalAmount, shippingAddress, paymentMethod) VALUES (?, ?, ?, ?)',
        [userId, totalAmount, shippingAddress, paymentMethod]
      );

      const orderId = orderResult.id;

      // Create order items and update stock
      for (const item of cartItems) {
        await database.run(
          'INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.productId, item.quantity, item.price]
        );

        // Update product stock
        await database.run(
          'UPDATE products SET stock = stock - ? WHERE id = ?',
          [item.quantity, item.productId]
        );
      }

      // Clear user's cart
      await database.run('DELETE FROM cart WHERE userId = ?', [userId]);

      // Commit transaction
      await database.run('COMMIT');

      // Get created order with items
      const order = await database.get('SELECT * FROM orders WHERE id = ?', [orderId]);
      const orderItems = await database.all(`
        SELECT oi.*, p.name, p.image, cat.name as categoryName
        FROM order_items oi
        JOIN products p ON oi.productId = p.id
        LEFT JOIN categories cat ON p.categoryId = cat.id
        WHERE oi.orderId = ?
      `, [orderId]);

      res.status(201).json({
        message: 'Order created successfully',
        order: {
          ...order,
          items: orderItems
        }
      });
    } catch (error) {
      // Rollback transaction
      await database.run('ROLLBACK');
      throw error;
    }
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const sql = 'SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC';
    const params = [userId];

    // Get total count
    const countResult = await database.getCount(sql, params);
    const total = countResult.total;

    // Get paginated results
    const orders = await database.getPaginated(sql, params, parseInt(page), parseInt(limit));

    // Get order items for each order
    for (const order of orders) {
      const items = await database.all(`
        SELECT oi.*, p.name, p.image, cat.name as categoryName
        FROM order_items oi
        JOIN products p ON oi.productId = p.id
        LEFT JOIN categories cat ON p.categoryId = cat.id
        WHERE oi.orderId = ?
      `, [order.id]);
      order.items = items;
    }

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.json({
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext,
        hasPrev
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await database.get('SELECT * FROM orders WHERE id = ? AND userId = ?', [id, userId]);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const items = await database.all(`
      SELECT oi.*, p.name, p.image, p.description, cat.name as categoryName
      FROM order_items oi
      JOIN products p ON oi.productId = p.id
      LEFT JOIN categories cat ON p.categoryId = cat.id
      WHERE oi.orderId = ?
    `, [id]);

    res.json({
      order: {
        ...order,
        items
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update order status (for admin use)
router.put('/:id/status', auth, [
  body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    // Check if order exists and belongs to user
    const order = await database.get('SELECT * FROM orders WHERE id = ? AND userId = ?', [id, userId]);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update order status
    await database.run(
      'UPDATE orders SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [status, id]
    );

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 