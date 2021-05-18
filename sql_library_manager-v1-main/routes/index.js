var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error) {
      res.status(500).send(error);
    }
  }
}

// redirect
router.get('/', asyncHandler(async (req, res) => {
  res.redirect("/books");
}));

/* GET home page. */
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render('index', { books, title: "Tomas Express App" });
}));

//form
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render("new-book");
}));

//post new entry book
router.post('/books/new', asyncHandler(async (req, res) => {

  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books/");
  } catch (error) {
    if( error.name === "SequelizeValidationError") { // checking the error
      book = await Book.build(req.body);
      res.render('new-book', { book, errors: error.errors, title: "New Book" })
    } else {
      throw error;
    }  
  }

}));
//get book
router.get("/books/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  //res.render("update-book", { book });
  if ( book ) {
    res.render("update-book", { book });
  } else {
    res.sendStatus(404);
  }
  }));

//post updated entry 
router.post("/books/:id", asyncHandler(async (req, res) => {
  let book;
  try {
    const book = await Book.findByPk(req.params.id);
    if ( book ) {
      await book.update(req.body);
      res.redirect("/");
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if( error.name === "SequelizeValidationError" ) {
      book = await Book.build(req.body);
      book.id = req.params.id; // make sure correct article gets updated
      res.render("update-book", { book, errors: error.errors, title: "Edit Book" })
    } else {
      throw error;
    }
  }
  
}));

// delete entry
router.post("/books/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if ( book ) {
    await book.destroy();
    res.redirect("/books");
  } else {
    res.sendStatus(404);
  }
}));

module.exports = router;
