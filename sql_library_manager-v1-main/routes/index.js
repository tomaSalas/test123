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
  res.render('index', { books, title: "Express" });
}));

//form
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render("create-new-book");
}));

//post create book
router.post('/books/new', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  //res.redirect("/books/" + book.id);
  res.redirect("/books/");
}));


//get book
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("update-book", { book });
}));
module.exports = router;
