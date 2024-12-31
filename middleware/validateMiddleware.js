const Joi = require("joi");

exports.validateRegister = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) console.error(error.details);

  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

exports.validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

exports.validateAddCart = (req, res, next) => {
  const schema = Joi.object({
    furnitureId: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

exports.validateAddFurniture = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    imageUrls: Joi.array().items(Joi.string().uri()).required(),
    price: Joi.number().integer().greater(0).required(),
    categoryId: Joi.number().integer().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};


exports.validateAddCategory = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};


exports.validateAddReview = (req, res, next) => {
  const schema = Joi.object({
    content: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    furnitureId: Joi.number().integer().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
