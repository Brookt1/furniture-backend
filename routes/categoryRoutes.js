// categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { verifyJWT, verifyRole } = require("../middleware/authMiddleware");
const {
  validateAddCategory,
  validateAddSubCategory,
} = require("../middleware/validateMiddleware");
const ROLES_LIST = require("../config/roles_list");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

router.post(
  "/",
  verifyJWT,
  verifyRole(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  validateAddCategory,
  categoryController.createCategory
);

router.put(
  "/:id",
  verifyJWT,
  verifyRole(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  validateAddCategory,
  categoryController.updateCategory
);

router.delete(
  "/:id",
  verifyJWT,
  verifyRole(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  categoryController.deleteCategory
);

router.post(
  "/subcategory",
  verifyJWT,
  verifyRole(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  validateAddSubCategory,
  categoryController.createSubCategory
);

router.put(
  "/subcategory/:id",
  verifyJWT,
  verifyRole(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  validateAddSubCategory,
  categoryController.updateSubCategory
);

router.delete(
  "/subcategory/:id",
  verifyJWT,
  verifyRole(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  categoryController.deleteSubCategory
);

module.exports = router;
