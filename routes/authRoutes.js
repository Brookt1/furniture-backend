const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");

router.get("/user", authMiddleware.verifyJWT, (req, res) => {
  res.json({ message: "from user" });
});
router.post(
  "/register",
  validateMiddleware.validateRegister,
  authController.register
);
router.post("/login", validateMiddleware.validateLogin, authController.login);
router.get("/refresh", authController.refreshToken);
router.get("/logout", authController.logout);
module.exports = router;
