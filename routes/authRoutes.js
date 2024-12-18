const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/user", authMiddleware.verifyJWT, (req, res) => {
  res.json({ message: "from user" });
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  "/register",
  validateMiddleware.validateRegister,
  authController.register
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              email:
 *                type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/login", validateMiddleware.validateLogin, authController.login);

/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Refresh token
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/refresh", authController.refreshToken);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout a user
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/logout", authController.logout);

module.exports = router;
