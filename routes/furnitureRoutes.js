const express = require('express');
const router = express.Router();
const furnitureController = require('../controllers/furnitureController');
const {body, validationResult} = require('express-validator');

router.get('/', furnitureController.getAllFurniture);
router.get('/:id', furnitureController.getFurnitureById);
router.delete('/:id', furnitureController.deleteFurniture);
router.post('/',
    [
        body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
        body('description').optional().isString().withMessage('Description must be a string'),
        body('imageUrl').notEmpty().withMessage('Image required').isString().withMessage('ImageUrl must be a string'),
        body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
        body('categoryId').optional().isInt().withMessage('Category ID must be an integer'),
    ]
    
    
    , furnitureController.addFurniture);


router.post('/:id/reviews',
    [
        body('reviewerName').notEmpty().withMessage('Reviewer name is required').isString().withMessage('Reviewer name must be a string'),
        body('reviewText').notEmpty().withMessage('Review text is required').isString().withMessage('Review text must be a string'),
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
        body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
    ],
    furnitureController.addReview);

// router.put('/:id', furnitureController.updateFurniture);
// router.delete('/:id', furnitureController.deleteFurniture);

module.exports = router;
