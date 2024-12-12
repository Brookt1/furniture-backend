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
    res.status(500).json({ error: error.message });
  }
};

exports.getOrder = async (req, res) => {
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
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.addOrder = async (req, res) => {
  const { orderItems } = req.body;
  const userId = 1; // Hardcoded user ID for simplicity

  try {
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

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        orderItems: {
          create: orderItems.map((item) => ({
            furnitureId: item.furnitureId,
            quantity: item.quantity,
            price: furniturePriceMap[item.furnitureId] * item.quantity, // Store the price of each item
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

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  //     res.status(500).json({ error: error.message });
  //   }
  res.status(500).json({ error: "Unauthorized access" });
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
  res.status(500).json({ error: "Unauthorized access" });
};
