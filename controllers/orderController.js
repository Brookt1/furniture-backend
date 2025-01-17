const { PrismaClient } = require("@prisma/client");
const { get } = require("../routes/orderRoutes");
const prisma = new PrismaClient();

exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            furniture: true,
          },
        },
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
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

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  const orderId = parseInt(req.params.id, 10);

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            furniture: true,
          },
        },
      },
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addOrder = async (req, res) => {
  const { firstName, lastName, email, city, phone } = req.body;
  const userId = req.user.id;

  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId: userId },
      include: {
        furniture: true,
      },
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const orderItems = cartItems.map((item) => ({
      furnitureId: item.furnitureId,
      quantity: item.quantity,
    }));

    const furnitureIds = orderItems.map((item) => item.furnitureId);
    const furnitureItems = await prisma.furniture.findMany({
      where: {
        id: { in: furnitureIds },
      },
    });

    const furniturePriceMap = furnitureItems.reduce((map, item) => {
      map[item.id] = item.price;
      return map;
    }, {});

    const totalAmount = orderItems.reduce((total, item) => {
      const itemPrice = furniturePriceMap[item.furnitureId];
      return total + itemPrice * item.quantity;
    }, 0);

    //TODO: include the shppiment cost

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        orderItems: {
          create: orderItems.map((item) => ({
            furnitureId: item.furnitureId,
            quantity: item.quantity,

            price: furniturePriceMap[item.furnitureId] * item.quantity,
          })),
        },
      },
      include: {
        orderItems: {
          include: {
            furniture: true,
          },
        },
      },
    });

    await prisma.cart.deleteMany({
      where: { userId },
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  //   const { orderId } = req.params;
  //   const { status } = req.body;
  //   try {
  //     const order = await prisma.order.update({
  //       where: { id: parseInt(orderId, 10) },
  //       data: { status },
  //     });
  //     res.json(order);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  res.status(500).json({ message: "Unauthorized access" });
};

exports.deleteOrder = async (req, res) => {
  //   const { orderId } = req.params;

  //   try {
  //     await prisma.order.delete({
  //       where: { id: parseInt(orderId, 10) },
  //     });
  //     res.status(204).send();
  //   } catch (error) {
  // }
  res.status(500).json({ message: "Unauthorized access" });
};
