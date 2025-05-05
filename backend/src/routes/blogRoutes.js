const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createBlog, getAllBlogs, deleteBlog, updateBlog } = require('../controllers/blogController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), createBlog);
router.get('/get', getAllBlogs);
router.delete('/delete/:id', deleteBlog);
router.put('/update/:id', upload.single('image'), updateBlog);

module.exports = router;
