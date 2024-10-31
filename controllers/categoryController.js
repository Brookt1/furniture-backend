

const db = require('../config/db');


exports.getAllCategories = (req, res) => {
    db.all('SELECT * FROM Categories', (err, categories) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (categories.length === 0) {
            return res.status(404).json({ error: 'No categories found' });
        }

        res.json(categories);
    });
}