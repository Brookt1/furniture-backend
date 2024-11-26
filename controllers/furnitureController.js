const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllFurniture = (req, res) => {
  prisma.furniture
    .findMany()
    .then((furniture) => {
      res.json(furniture);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.getFurnitureById = (req, res) => {
  const furnitureId = parseInt(req.params.id, 10);

  prisma.furniture
    .findUnique({
      where: { id: furnitureId },
      include: { reviews: true, images: true },
    })
    .then((furniture) => {
      if (furniture) {
        res.json(furniture);
      } else {
        res.status(404).json({ error: "Furniture not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.addFurniture = async (req, res) => {
  const { name, description, price, categoryId, imageUrls } = req.body;
  try {
    const furniture = await prisma.furniture.create({
      data: {
        name,
        description,
        price,
        category: {
          connect: { id: categoryId },
        },
        images: {
          create: imageUrls.map((url) => ({
            url,
          })),
        },
      },
      include: { category: true, images: true },
    });
    res.json(furniture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFurniture = (req, res) => {
  const furnitureId = req.params.id;
  db.run("DELETE FROM Furniture WHERE id = ?", [furnitureId], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ error: "Furniture not found" });
    }

    res.json({ success: true });
  });
};

exports.addReview = (req, res) => {
  const furnitureId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { reviewerName, reviewText, email, rating } = req.body;
  db.run(
    "INSERT INTO Reviews (furnitureId, reviewerName, reviewText, email, rating) VALUES (?, ?, ?, ?, ?)",
    [furnitureId, reviewerName, reviewText, email, rating],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ id: this.lastID });
    }
  );
};
