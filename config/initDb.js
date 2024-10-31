const db = require("./db");

function initializeDatabase() {
  db.serialize(() => {
    db.run(`
            CREATE TABLE IF NOT EXISTS Furniture (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                categoryId INTEGER,
                imageUrl TEXT,
                averageRating REAL DEFAULT 0,
                FOREIGN KEY (categoryId) REFERENCES Categories(id)
            )
        `);

    db.run(`
            CREATE TABLE IF NOT EXISTS FurnitureImages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                furnitureId INTEGER NOT NULL,
                imageUrl TEXT NOT NULL,
                FOREIGN KEY (furnitureId) REFERENCES Furniture(id)
            )
        `);

    db.run(`
            CREATE TABLE IF NOT EXISTS Reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                furnitureId INTEGER NOT NULL,
                reviewerName TEXT,
                reviewText TEXT,
                email TEXT,
                rating INTEGER CHECK(rating >= 1 AND rating <= 5),
                reviewDate TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (furnitureId) REFERENCES Furniture(id)
            )
        `);

    db.run(`
            
        CREATE TABLE IF NOT EXISTS Categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
            )
        `);
    db.run(`
            INSERT OR IGNORE INTO Categories (name) VALUES ('Sofa'), ('Chair'), ('Table'), ('Bed'), ('Cabinet')
        `);

    console.log("Database tables initialized.");
  });
}

module.exports = initializeDatabase;
