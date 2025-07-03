const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database', 'wwalmart.db');

class Database {
  constructor() {
    this.db = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('Error connecting to database:', err);
          reject(err);
        } else {
          console.log('Connected to SQLite database');
          this.db.run('PRAGMA foreign_keys = ON');
          resolve();
        }
      });
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.close((err) => {
          if (err) {
            console.error('Error closing database:', err);
            reject(err);
          } else {
            console.log('Database connection closed');
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Helper method for pagination
  getPaginated(sql, params = [], page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const paginatedSql = `${sql} LIMIT ? OFFSET ?`;
    const paginatedParams = [...params, limit, offset];
    
    return this.all(paginatedSql, paginatedParams);
  }

  // Helper method to get total count
  getCount(sql, params = []) {
    const countSql = sql.replace(/SELECT .* FROM/, 'SELECT COUNT(*) as total FROM');
    return this.get(countSql, params);
  }
}

// Create a singleton instance
const database = new Database();

module.exports = database; 