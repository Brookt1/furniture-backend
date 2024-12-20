const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await client.review.findMany({
      include: {
        user: true,
      },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addReview = async (req, res) => {
  const { content, rating } = req.body;
  const { userId } = req.user;

  try {
    const review = await client.review.create({
      data: {
        content,
        rating,
        userId,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
