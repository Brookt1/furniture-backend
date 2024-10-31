



const db = require('../config/db');
const {validationResult} = require('express-validator');






exports.getAllFurniture = (req, res) => {
    db.all('SELECT * FROM Furniture', (err, furniture) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (furniture.length === 0) {
            return res.status(404).json({ error: 'No furniture found' });
        }

        res.json(furniture);
    });
};


exports.getFurnitureById = (req, res) => {

    const furnitureId = req.params.id;
    db.get('SELECT * FROM Furniture WHERE id = ?', [furnitureId], (err, furniture) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all('SELECT imageUrl FROM FurnitureImages WHERE furnitureId = ?', [furnitureId], (err, images) => {
            if (err) return res.status(500).json({ error: err.message });

            db.all('SELECT reviewerName, reviewText, rating, reviewDate FROM Reviews WHERE furnitureId = ?', [furnitureId], (err, reviews) => {
                if (err) return res.status(500).json({ error: err.message });

                res.json({
                    furniture,
                    images: images.map(img => img.imageUrl),
                    reviews
                });
            });
        });
    });
}




exports.addFurniture = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, price, categoryId, imageUrl } = req.body;
    db.run('INSERT INTO Furniture (name, description, price, categoryId, imageUrl) VALUES (?, ?, ?, ?, ?)', [name, description, price, categoryId, imageUrl], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ id: this.lastID });
    });
}


exports.deleteFurniture = (req, res) => {
    const furnitureId = req.params.id;
    db.run('DELETE FROM Furniture WHERE id = ?', [furnitureId], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Furniture not found' });
        }

        res.json({ success: true });
    });
}

exports.addReview = (req, res) => {
    const furnitureId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { reviewerName, reviewText, email, rating } = req.body;
    db.run('INSERT INTO Reviews (furnitureId, reviewerName, reviewText, email, rating) VALUES (?, ?, ?, ?, ?)', [furnitureId, reviewerName, reviewText, email, rating], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ id: this.lastID });
    });
}