const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: {
        furniture: {
          include: {
            images: true,
          },
        },
      },
    });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addItemToCart = async (req, res) => {
  const { furnitureId, quantity } = req.body;
  const userId = req.user.id;

  console.log(userId, furnitureId, quantity);
  try {
    const cartItem = await prisma.cart.create({
      data: {
        user: { connect: { id: userId } }, // Corrected nested create syntax
        furniture: { connect: { id: furnitureId } }, // Corrected nested create syntax
        quantity,
      },
    });
    const { createdAt, ...cartItemWithoutCreatedAt } = cartItem;
    res.status(201).json(cartItemWithoutCreatedAt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await prisma.cart.update({
      where: { id: parseInt(itemId, 10) },
      data: { quantity },
    });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    await prisma.cart.delete({
      where: { id: parseInt(itemId, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
