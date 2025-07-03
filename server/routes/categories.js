const express = require('express');
const database = require('../utils/database');

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await database.all(`
      SELECT c.*, COUNT(p.id) as productCount 
      FROM categories c 
      LEFT JOIN products p ON c.id = p.categoryId AND p.isActive = 1
      GROUP BY c.id 
      ORDER BY c.name ASC
    `);

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get category by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const category = await database.get('SELECT * FROM categories WHERE id = ?', [id]);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Get products in this category
    const products = await database.all(`
      SELECT p.*, c.name as categoryName 
      FROM products p 
      LEFT JOIN categories c ON p.categoryId = c.id 
      WHERE p.categoryId = ? AND p.isActive = 1
      ORDER BY p.rating DESC, p.reviewCount DESC
      LIMIT 8
    `, [id]);

    res.json({
      category: {
        ...category,
        products
      }
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 