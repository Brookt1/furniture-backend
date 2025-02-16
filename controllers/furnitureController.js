const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cloudinary = require("cloudinary").v2;
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addFurniture = async (req, res) => {
  try {
    const { name, description, price, subCategoryId } = req.body;
    const files = req.files;

    // Convert files object to array of files, maintaining order
    const imageFiles = ["image1", "image2", "image3", "image4"]
      .map((key) => files[key]?.[0])
      .filter((file) => file); // Remove any undefined/null values

    const imageUrls = await Promise.all(
      imageFiles.map((file) =>
        cloudinary.uploader.upload(file.path).then((result) => result.url)
      )
    );

    const furniture = await prisma.furniture.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        subCategoryId: parseInt(subCategoryId),
        images: {
          create: imageUrls.map((url) => ({
            url,
          })),
        },
      },
      include: { subCategory: true, images: true },
    });

    res.json(furniture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllFurniture = (req, res) => {
  prisma.furniture
    .findMany({
      include: { images: { take: 1 } },
    })
    .then((furniture) => {
      res.json(furniture);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
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
        res.status(404).json({ message: "Furniture not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.deleteFurniture = (req, res) => {
  const furnitureId = parseInt(req.params.id, 10);

  prisma.furniture
    .delete({
      where: { id: furnitureId },
    })
    .then(() => {
      res.json({ message: "Furniture deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
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
      if (err) return res.status(500).json({ message: err.message });

      res.json({ id: this.lastID });
    }
  );
};
