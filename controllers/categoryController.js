// categoryController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subCategories: true,
      },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        subCategories: {
          include: {
            furniture: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await prisma.category.create({
      data: { name, description },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.update({
      where: { id: parseInt(req.params.id) },
      data: { name },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await prisma.category.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSubCategory = async (req, res) => {
  try {
    const { name, categoryId, description } = req.body;
    const subCategory = await prisma.subCategory.create({
      data: {
        name,
        categoryId: parseInt(categoryId),
        description,
      },
    });
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await prisma.subCategory.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        furniture: {
          include: {
            images: true,
          },
        },
      },
    });
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    res.json(subCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const subCategory = await prisma.subCategory.update({
      where: { id: parseInt(req.params.id) },
      data: { name },
    });
    res.json(subCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    await prisma.subCategory.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
