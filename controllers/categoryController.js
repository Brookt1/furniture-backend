const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

const db = require("../config/db");

exports.getCategories = (req, res) => {
  client.category
    .findMany({
      select: {
        id: true,
        name: true,
      },
    })
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

exports.getCategory = (req, res) => {
  const categoryId = parseInt(req.params.id, 10);

  client.category
    .findUnique({
      where: { id: categoryId },

      select: {
        id: true,
        name: true,
        furniture: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            images: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    })
    .then((category) => {
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the category" });
    });
};

//TODO: Implement the addCategory controller method
exports.addCategory = (req, res) => {
  const { name } = req.body;
  client.categories
    .create({
      data: {
        name,
      },
    })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
