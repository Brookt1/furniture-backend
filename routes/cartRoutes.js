const express = require("express");
const cartController = require("../controllers/cartController");
const { validateAddCart } = require("../middleware/validateMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all cart items
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   furnitureId:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 *                   furniture:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *       500:
 *         description: Internal server error
 */
router.get("/", cartController.getCartItems);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               furnitureId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully added item to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 furnitureId:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.post("/", validateAddCart, cartController.addItemToCart);

/**
 * @swagger
 * /api/cart/{itemId}:
 *   put:
 *     summary: Update a cart item
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the cart item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully updated cart item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 furnitureId:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.put("/:itemId", cartController.updateCartItem);

/**
 * @swagger
 * /api/cart/{itemId}:
 *   delete:
 *     summary: Remove a cart item
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the cart item to remove
 *     responses:
 *       204:
 *         description: Successfully removed cart item
 *       500:
 *         description: Internal server error
 */
router.delete("/:itemId", cartController.removeItemFromCart);

module.exports = router;
