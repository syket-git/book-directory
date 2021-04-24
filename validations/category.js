const { check } = require('express-validator');

exports.categoryValidation = [
  check('name')
    .not()
    .isEmpty()
    .min(3)
    .max(50)
    .withMessage('Category name is required'),
  check('slug').not().isEmpty().withMessage('Category slug is required'),
];
