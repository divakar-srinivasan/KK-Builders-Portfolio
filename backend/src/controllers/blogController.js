const BlogModel = require('../models/blogModel');

// Create a new blog post
exports.createBlog = async (req, res) => {
  const { title, author, date_published, content } = req.body;
  const image = req.file ? req.file.buffer : null;

  if (!title || !author || !date_published || !content || !image) {
    return res.status(400).json({ error: 'All fields (image, title, author, date_published, content) are required.' });
  }

  try {
    const newBlog = new BlogModel({
      title,
      author,
      date_published,
      content,
      image,
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create blog', details: err.message });
  }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({});
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch blogs', details: err.message });
  }
};

// Delete a blog post by ID
exports.deleteBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete blog', details: err.message });
  }
};

// Update a blog post by ID
exports.updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const { title, author, date_published, content } = req.body;
  let image;

  if (req.file) {
    image = req.file.buffer;
  }

  try {
    const updateData = {};
    if (title) updateData.title = title;
    if (author) updateData.author = author;
    if (date_published) updateData.date_published = new Date(date_published);
    if (content) updateData.content = content;
    if (image) updateData.image = image;

    const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, updateData, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update blog', details: err.message });
  }
};
