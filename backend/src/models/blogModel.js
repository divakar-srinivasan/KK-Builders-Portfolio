const mongoose = require('mongoose');

// Define the schema for the blog
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date_published: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
});

module.exports = mongoose.model('Blog', blogSchema);
