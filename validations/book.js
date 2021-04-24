const { check } = require('express-validator');

exports.bookValidation = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('description').not().isEmpty().withMessage('Description is required'),
  check('price').not().isEmpty().isNumeric().withMessage('Price is required'),
  check('author').not().isEmpty().withMessage('Author is required'),
  check('categories')
    .not()
    .isEmpty()
    .isArray({ min: 1 })
    .withMessage('Category is required, at least select one element'),
];
