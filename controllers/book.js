const Book = require('../models/book');
const { errorHandler } = require('../helpers/dbErrorHandler');

//Create New Book
exports.create = async (req, res) => {
  const {
    name,
    description,
    price,
    publishedDate,
    author,
    categories,
  } = req.body;
  const book = new Book({
    name,
    description,
    price,
    publishedDate,
    author,
    categories,
  });

  await book.save((err, data) => {
    if (err) return res.status(500).json({ error: errorHandler(err) });
    return res.json({ success: true, message: 'Book create successful!' });
  });
};

//List Book
exports.list = async (req, res) => {
  await Book.find()
    .populate('categories', '_id name slug')
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) return res.status(400).json({ error: errorHandler(err) });
      return res.json({ success: true, data: data });
    });
};

//Edit Book
exports.edit = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    description,
    price,
    publishedDate,
    author,
    categories,
  } = req.body;

  const oldCourse = await Book.findById({ _id: id });

  if (!oldCourse) return res.status(400).json({ error: 'Course not found!' });

  oldCourse.name = name;
  oldCourse.description = description;
  oldCourse.price = price;
  oldCourse.publishedDate = publishedDate;
  oldCourse.author = author;
  oldCourse.categories = categories;
  await oldCourse.save((err, newCourse) => {
    if (err) return res.status(400).send({ error: errorHandler(err) });
    res
      .status(200)
      .json({ success: true, message: 'Course successfully updated' });
  });
};

//Read Book
exports.read = async (req, res) => {
  const { id } = req.params;
  const course = await Book.findById({ _id: id });
  if (!course) return res.status(400).json({ error: 'Course not found!' });
  res.send(course);
};

//Delete Book
exports.remove = async (req, res) => {
  const { id } = req.params;
  const course = await Book.findOneAndRemove({ _id: id });
  if (!course) return res.status(400).json({ error: 'Course not found!' });
  res
    .status(200)
    .json({ success: true, message: 'Course removed successfully done!' });
};
