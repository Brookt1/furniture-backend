const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { verifyJWT, verifyRole } = require("../middleware/authMiddleware");
const { validateAddCategory } = require("../middleware/validateMiddleware");
const ROLES_LIST = require("../config/roles_list");

router.get("/", categoryController.getCategories);
router.post(
  "/",
  verifyJWT,
  verifyRole(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  validateAddCategory,
  categoryController.addCategory
);
router.get("/:id", categoryController.getCategory);

module.exports = router;
