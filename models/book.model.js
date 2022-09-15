const mongoose = require('mongoose');

//simple schema
const bookschema = new mongoose.Schema({
  bookid: {
    type: String,
    required: true,
	unique: true
  },
  bookname: {
    type: String,
    required: true
  },
  ISBN: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});


//custom method to generate authToken 


const Book = mongoose.model('Book', bookschema);


exports.Book = Book; 
