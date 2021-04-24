const Category = require('../models/categories');
const { errorHandler } = require('../helpers/dbErrorHandler');
const slugify = require('slugify');

//Create new category
exports.create = async (req, res) => {
  const { name } = req.body;
  const slug = slugify(name).toLowerCase();
  const findCategory = await Category.find({ slug });
  if (findCategory) res.status(404).json({ error: 'Category already exists' });
  const category = new Category({ name, slug });
  await category.save((err, data) => {
    if (err) return res.status(404).json({ error: errorHandler(err) });
    res.json(data);
  });
};

//List all category
exports.list = async (req, res) => {
  await Category.find().exec((err, data) => {
    if (err) return res.status(422).json({ error: errorHandler(err) });
    res.send({ success: true, data: data });
  });
};

//Read specific category
exports.read = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  await Category.findOne({ slug }).exec((err, data) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    if (!data) return res.status(400).json({ error: 'Category not found!' });
    return res.json({ success: true, data: data });
  });
};

//Delete category
exports.remove = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  await Category.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    if (!data) return res.status(400).json({ error: 'Category not found!' });
    return res.json({ message: 'Category removed!' });
  });
};
