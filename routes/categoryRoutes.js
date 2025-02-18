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

// subcategories routes

router.post(
  "/subcategory",
  verifyJWT,
  verifyRole(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  validateAddSubCategory,
  categoryController.createSubCategory
);

router.get("/subcategory/:id", categoryController.getSubCategoryById);

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

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The category ID
 *         name:
 *           type: string
 *           description: The category name
 *         description:
 *           type: string
 *           description: Category description
 *         subCategories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SubCategory'
 *
 *     SubCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The subcategory ID
 *         name:
 *           type: string
 *           description: The subcategory name
 *         description:
 *           type: string
 *           description: Subcategory description
 *         categoryId:
 *           type: integer
 *           description: ID of parent category
 *
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 *
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 *
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Category ID
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 *
 * @swagger
 * /api/categories/subcategory:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 *
 * @swagger
 * /api/categories/subcategory/{id}:
 *   get:
 *     summary: Get subcategory by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Subcategory ID
 *     responses:
 *       200:
 *         description: Subcategory details
 *       404:
 *         description: Subcategory not found
 *
 *   put:
 *     summary: Update a subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Subcategory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Subcategory not found
 *
 *   delete:
 *     summary: Delete a subcategory
 *     tags: [SubCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Subcategory ID
 *     responses:
 *       204:
 *         description: Subcategory deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Subcategory not found
 */
