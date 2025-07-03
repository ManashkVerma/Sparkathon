const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'wwalmart.db');
const db = new sqlite3.Database(dbPath);

console.log('🗄️ Initializing WWalmart database...');

// Create tables
const createTables = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          address TEXT,
          phone TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Categories table
      db.run(`
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          image TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Products table
      db.run(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          price REAL NOT NULL,
          originalPrice REAL,
          categoryId INTEGER,
          image TEXT,
          stock INTEGER DEFAULT 0,
          rating REAL DEFAULT 0,
          reviewCount INTEGER DEFAULT 0,
          isActive BOOLEAN DEFAULT 1,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (categoryId) REFERENCES categories (id)
        )
      `);

      // Cart table
      db.run(`
        CREATE TABLE IF NOT EXISTS cart (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          productId INTEGER NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users (id),
          FOREIGN KEY (productId) REFERENCES products (id)
        )
      `);

      // Orders table
      db.run(`
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          totalAmount REAL NOT NULL,
          status TEXT DEFAULT 'pending',
          shippingAddress TEXT NOT NULL,
          paymentMethod TEXT NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users (id)
        )
      `);

      // Order items table
      db.run(`
        CREATE TABLE IF NOT EXISTS order_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          orderId INTEGER NOT NULL,
          productId INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          price REAL NOT NULL,
          FOREIGN KEY (orderId) REFERENCES orders (id),
          FOREIGN KEY (productId) REFERENCES products (id)
        )
      `);

      // Reviews table
      db.run(`
        CREATE TABLE IF NOT EXISTS reviews (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          productId INTEGER NOT NULL,
          rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
          comment TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users (id),
          FOREIGN KEY (productId) REFERENCES products (id)
        )
      `);

      db.run('PRAGMA foreign_keys = ON', (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ Database tables created successfully');
          resolve();
        }
      });
    });
  });
};

// Insert sample data
const insertSampleData = async () => {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.run(`
      INSERT OR IGNORE INTO users (email, password, firstName, lastName, address, phone)
      VALUES ('admin@wwalmart.com', ?, 'Admin', 'User', '123 Main St, City, State', '555-0123')
    `, [hashedPassword]);

    // Insert categories
    const categories = [
      { name: 'Electronics', description: 'Latest gadgets and electronics' },
      { name: 'Clothing', description: 'Fashion and apparel for everyone' },
      { name: 'Home & Garden', description: 'Everything for your home' },
      { name: 'Sports & Outdoors', description: 'Sports equipment and outdoor gear' },
      { name: 'Books', description: 'Books, magazines, and educational materials' },
      { name: 'Toys & Games', description: 'Fun toys and games for all ages' },
      { name: 'Health & Beauty', description: 'Health products and beauty supplies' },
      { name: 'Automotive', description: 'Car parts and accessories' }
    ];

    categories.forEach(category => {
      db.run(`
        INSERT OR IGNORE INTO categories (name, description)
        VALUES (?, ?)
      `, [category.name, category.description]);
    });

    // Insert sample products
    const products = [
      {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced camera system and A17 Pro chip',
        price: 999.99,
        originalPrice: 1099.99,
        categoryId: 1,
        stock: 50,
        rating: 4.8,
        reviewCount: 125
      },
      {
        name: 'Samsung 4K Smart TV',
        description: '55-inch 4K Ultra HD Smart LED TV with HDR',
        price: 599.99,
        originalPrice: 699.99,
        categoryId: 1,
        stock: 25,
        rating: 4.6,
        reviewCount: 89
      },
      {
        name: 'Nike Air Max 270',
        description: 'Comfortable running shoes with Air Max technology',
        price: 129.99,
        originalPrice: 149.99,
        categoryId: 2,
        stock: 100,
        rating: 4.5,
        reviewCount: 234
      },
      {
        name: 'Instant Pot Duo',
        description: '7-in-1 electric pressure cooker with 6-quart capacity',
        price: 89.99,
        originalPrice: 119.99,
        categoryId: 3,
        stock: 75,
        rating: 4.7,
        reviewCount: 567
      },
      {
        name: 'Yoga Mat Premium',
        description: 'Non-slip exercise mat for yoga and fitness',
        price: 29.99,
        originalPrice: 39.99,
        categoryId: 4,
        stock: 200,
        rating: 4.3,
        reviewCount: 156
      },
      {
        name: 'The Great Gatsby',
        description: 'Classic novel by F. Scott Fitzgerald',
        price: 12.99,
        originalPrice: 15.99,
        categoryId: 5,
        stock: 150,
        rating: 4.9,
        reviewCount: 892
      },
      {
        name: 'LEGO Star Wars Set',
        description: 'Millennium Falcon building set with 1,329 pieces',
        price: 159.99,
        originalPrice: 179.99,
        categoryId: 6,
        stock: 30,
        rating: 4.8,
        reviewCount: 445
      },
      {
        name: 'Oral-B Electric Toothbrush',
        description: 'Professional electric toothbrush with Bluetooth connectivity',
        price: 79.99,
        originalPrice: 99.99,
        categoryId: 7,
        stock: 120,
        rating: 4.4,
        reviewCount: 278
      },
      {
        name: 'Car Phone Mount',
        description: 'Universal car phone holder with suction cup mount',
        price: 19.99,
        originalPrice: 24.99,
        categoryId: 8,
        stock: 300,
        rating: 4.2,
        reviewCount: 189
      },
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'Noise-cancelling over-ear headphones with 30-hour battery',
        price: 199.99,
        originalPrice: 249.99,
        categoryId: 1,
        stock: 60,
        rating: 4.6,
        reviewCount: 334
      }
    ];

    products.forEach(product => {
      db.run(`
        INSERT OR IGNORE INTO products (name, description, price, originalPrice, categoryId, stock, rating, reviewCount)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [product.name, product.description, product.price, product.originalPrice, product.categoryId, product.stock, product.rating, product.reviewCount]);
    });

    console.log('✅ Sample data inserted successfully');
  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
  }
};

// Initialize database
const initDatabase = async () => {
  try {
    await createTables();
    await insertSampleData();
    console.log('🎉 Database initialization completed!');
    db.close();
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    db.close();
  }
};

initDatabase(); 