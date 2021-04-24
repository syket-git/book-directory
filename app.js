const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

//Routes
const bookRoute = require('./routes/book');
const categoryRoute = require('./routes/category');

//middleware
app.use(express.json());

//routes middleware
app.use('/api', bookRoute);
app.use('/api', categoryRoute);

//Database connection
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected!!!'))
  .catch((err) => console.log(err));

//Route route
app.get('/', (req, res) => {
  res.send('Welcome to the book directory backend');
});

//PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App up and running on ${port}`));
