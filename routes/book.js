const express = require('express');
const router = express.Router();

//Validator
const { bookValidation } = require('../validations/book');

//Controllers
const { create, edit, read, remove, list } = require('../controllers/book');

router.get('/book', list);
router.post('/book', bookValidation, create);
router.put('/book/:id', edit);
router.get('/book/:id', read);
router.delete('/book/:id', remove);

module.exports = router;
