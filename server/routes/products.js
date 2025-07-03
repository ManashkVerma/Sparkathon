const express = require('express');
const database = require('../utils/database');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all products with pagination and filters
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      search
    } = req.query;

    let sql = `
      SELECT p.*, c.name as categoryName 
      FROM products p 
      LEFT JOIN categories c ON p.categoryId = c.id 
      WHERE p.isActive = 1
    `;
    const params = [];

    // Add filters
    if (category) {
      sql += ' AND p.categoryId = ?';
      params.push(category);
    }

    if (minPrice) {
      sql += ' AND p.price >= ?';
      params.push(minPrice);
    }

    if (maxPrice) {
      sql += ' AND p.price <= ?';
      params.push(maxPrice);
    }

    if (search) {
      sql += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    // Add sorting
    const allowedSortFields = ['name', 'price', 'rating', 'createdAt'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    sql += ` ORDER BY p.${sortField} ${order}`;

    // Get total count
    const countResult = await database.getCount(sql, params);
    const total = countResult.total;

    // Get paginated results
    const products = await database.getPaginated(sql, params, parseInt(page), parseInt(limit));

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.json({
      products,
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
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const product = await database.get(`
      SELECT p.*, c.name as categoryName 
      FROM products p 
      LEFT JOIN categories c ON p.categoryId = c.id 
      WHERE p.id = ? AND p.isActive = 1
    `, [id]);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Get reviews for the product
    const reviews = await database.all(`
      SELECT r.*, u.firstName, u.lastName 
      FROM reviews r 
      JOIN users u ON r.userId = u.id 
      WHERE r.productId = ? 
      ORDER BY r.createdAt DESC
    `, [id]);

    // Get related products (same category)
    const relatedProducts = await database.all(`
      SELECT p.*, c.name as categoryName 
      FROM products p 
      LEFT JOIN categories c ON p.categoryId = c.id 
      WHERE p.categoryId = ? AND p.id != ? AND p.isActive = 1 
      LIMIT 4
    `, [product.categoryId, id]);

    res.json({
      product: {
        ...product,
        reviews,
        relatedProducts
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Search products
router.get('/search/:query', optionalAuth, async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const sql = `
      SELECT p.*, c.name as categoryName 
      FROM products p 
      LEFT JOIN categories c ON p.categoryId = c.id 
      WHERE p.isActive = 1 AND (p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ?)
      ORDER BY p.rating DESC, p.reviewCount DESC
    `;
    const searchTerm = `%${query}%`;
    const params = [searchTerm, searchTerm, searchTerm];

    // Get total count
    const countResult = await database.getCount(sql, params);
    const total = countResult.total;

    // Get paginated results
    const products = await database.getPaginated(sql, params, parseInt(page), parseInt(limit));

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.json({
      products,
      searchQuery: query,
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
    console.error('Search products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get featured products (high rating and review count)
router.get('/featured/list', optionalAuth, async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    const products = await database.all(`
      SELECT p.*, c.name as categoryName 
      FROM products p 
      LEFT JOIN categories c ON p.categoryId = c.id 
      WHERE p.isActive = 1 AND p.rating >= 4.0 AND p.reviewCount >= 10
      ORDER BY p.rating DESC, p.reviewCount DESC
      LIMIT ?
    `, [parseInt(limit)]);

    res.json({ products });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get products by category
router.get('/category/:categoryId', optionalAuth, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;

    let sql = `
      SELECT p.*, c.name as categoryName 
      FROM products p 
      LEFT JOIN categories c ON p.categoryId = c.id 
      WHERE p.categoryId = ? AND p.isActive = 1
    `;
    const params = [categoryId];

    // Add sorting
    const allowedSortFields = ['name', 'price', 'rating', 'createdAt'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    sql += ` ORDER BY p.${sortField} ${order}`;

    // Get total count
    const countResult = await database.getCount(sql, params);
    const total = countResult.total;

    // Get paginated results
    const products = await database.getPaginated(sql, params, parseInt(page), parseInt(limit));

    // Get category info
    const category = await database.get('SELECT * FROM categories WHERE id = ?', [categoryId]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.json({
      products,
      category,
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
    console.error('Get products by category error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 