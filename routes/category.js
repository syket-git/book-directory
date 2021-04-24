const express = require('express');
const router = express.Router();

//Controllers
const { create, edit, list, read, remove } = require('../controllers/category');

router.get('/categories', list);
router.post('/category', create);
router.get('/category/:slug', read);
router.delete('/category/:slug', remove);

module.exports = router;
