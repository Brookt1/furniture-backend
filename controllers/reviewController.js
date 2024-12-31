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
  let { content, rating, furnitureId } = req.body;
  rating = parseInt(rating, 10);
  furnitureId = parseInt(furnitureId, 10);

  const userId = req.user.id;
  const name = req.user.username;

  try {
    const review = await client.review.create({
      data: {
        content,
        rating,
        reviewBy: name,
        user: {
          connect: {
            id: userId,
          },
        },
        furniture: {
          connect: {
            id: furnitureId,
          },
        },
      },
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await client.review.findUnique({
      where: {
        id: parseInt(reviewId),
      },
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await client.review.delete({
      where: {
        id: parseInt(reviewId),
      },
    });

    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
