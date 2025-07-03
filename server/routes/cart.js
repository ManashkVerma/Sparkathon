const express = require('express');
const { body, validationResult } = require('express-validator');
const database = require('../utils/database');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await database.all(`
      SELECT c.id, c.quantity, c.createdAt,
             p.id as productId, p.name, p.price, p.originalPrice, p.image, p.stock,
             cat.name as categoryName
      FROM cart c
      JOIN products p ON c.productId = p.id
      LEFT JOIN categories cat ON p.categoryId = cat.id
      WHERE c.userId = ? AND p.isActive = 1
      ORDER BY c.createdAt DESC
    `, [userId]);

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      items: cartItems,
      subtotal: parseFloat(subtotal.toFixed(2)),
      totalItems
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add item to cart
router.post('/add', auth, [
  body('productId').isInt({ min: 1 }),
  body('quantity').isInt({ min: 1, max: 99 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Check if product exists and is active
    const product = await database.get('SELECT * FROM products WHERE id = ? AND isActive = 1', [productId]);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock available' });
    }

    // Check if item already exists in cart
    const existingItem = await database.get('SELECT * FROM cart WHERE userId = ? AND productId = ?', [userId, productId]);

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity;
      if (product.stock < newQuantity) {
        return res.status(400).json({ error: 'Insufficient stock available' });
      }

      await database.run(
        'UPDATE cart SET quantity = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
        [newQuantity, existingItem.id]
      );

      res.json({ message: 'Cart item updated successfully' });
    } else {
      // Add new item
      await database.run(
        'INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity]
      );

      res.status(201).json({ message: 'Item added to cart successfully' });
    }
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update cart item quantity
router.put('/update', auth, [
  body('cartItemId').isInt({ min: 1 }),
  body('quantity').isInt({ min: 1, max: 99 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cartItemId, quantity } = req.body;
    const userId = req.user.id;

    // Check if cart item exists and belongs to user
    const cartItem = await database.get(`
      SELECT c.*, p.stock 
      FROM cart c 
      JOIN products p ON c.productId = p.id 
      WHERE c.id = ? AND c.userId = ?
    `, [cartItemId, userId]);

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Check stock availability
    if (cartItem.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock available' });
    }

    // Update quantity
    await database.run(
      'UPDATE cart SET quantity = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [quantity, cartItemId]
    );

    res.json({ message: 'Cart item updated successfully' });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove item from cart
router.delete('/remove/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if cart item exists and belongs to user
    const cartItem = await database.get('SELECT * FROM cart WHERE id = ? AND userId = ?', [id, userId]);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Remove item
    await database.run('DELETE FROM cart WHERE id = ?', [id]);

    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    await database.run('DELETE FROM cart WHERE userId = ?', [userId]);

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 