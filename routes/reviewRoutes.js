const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const { validateAddReview } = require("../middleware/validateMiddleware");

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a new review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Invalid input
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */

router.get("/", reviewController.getAllReviews);
router.post("/", validateAddReview, reviewController.addReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
