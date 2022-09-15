const  { Book } = require("../models/book.model")
const auth = require("../middleware/auth")
const express = require("express");
const router = express.Router();


// get booklist 
router.get("/booklist",auth, async(req,res) => {
	try {
		const books = await Book.find({})
		if(!books) return res.status(400).send('No books found in database')
		return res.status(200).send({
		  "message":"success",
		  "books":books
		})
	} catch(e){
		console.log(e.message)
		return res.status(500).send("something went wrong!")
	}
})



// create book data
router.post("/create",auth, async (req, res) => {
  if (!req.body.bookId || !req.body.bookname || !req.body.ISBN || !req.body.author) return res.status(400).send("Please send all the details: bookId, bookname, ISBN, author");
  const book = new Book({
    bookid: req.body.bookId,
    bookname: req.body.bookname,
    ISBN: req.body.ISBN,
	author:req.body.author
  });
  await book.save();
  res.status(200).send("book created successfully")
});


module.exports = router;
