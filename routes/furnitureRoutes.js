/**
 * @swagger
 * tags:
 *   name: Furniture
 *   description: API for managing furniture
 */

/**
 *         description: A list of furniture
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Furniture'
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a single piece of furniture by ID
 *     tags: [Furniture]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The furniture ID
 *     responses:
 *       200:
 *         description: A single piece of furniture
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Furniture'
 *       404:
 *         description: Furniture not found
 */

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a piece of furniture by ID
 *     tags: [Furniture]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The furniture ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Furniture deleted
 *       404:
 *         description: Furniture not found
 *     roles:
 *       - Admin
 *       - SuperAdmin
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new piece of furniture
 *     tags: [Furniture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Furniture'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Furniture added
 *       400:
 *         description: Invalid input
 *     roles:
 *       - Admin
 *       - SuperAdmin
 */

/**
 * @swagger
 * /{id}/reviews:
 *   post:
 *     summary: Add a review to a piece of furniture
 *     tags: [Furniture]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The furniture ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Review added
 *       400:
 *         description: Invalid input
 */

const express = require("express");
const router = express.Router();
const furnitureController = require("../controllers/furnitureController");
const { body, validationResult } = require("express-validator");
const { verifyJWT, verifyRole } = require("../middleware/authMiddleware");
const ROLES_LIST = require("../config/roles_list");
const {
  validateAddFurniture,
  validateAddReview,
} = require("../middleware/validateMiddleware");

router.get("/", furnitureController.getAllFurniture);
router.get("/:id", furnitureController.getFurnitureById);
router.delete(
  "/:id",
  verifyJWT,
  verifyRole(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  furnitureController.deleteFurniture
);
router.post(
  "/",
  verifyJWT,
  verifyRole(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  validateAddFurniture,
  furnitureController.addFurniture
);

router.post(
  "/:id/reviews",
  verifyJWT,
  validateAddReview,
  furnitureController.addReview
);

// router.put('/:id', furnitureController.updateFurniture);
// router.delete('/:id', furnitureController.deleteFurniture);

module.exports = router;
