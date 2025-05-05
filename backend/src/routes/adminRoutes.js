const express = require('express');
const router = express.Router();
const multer = require('multer');
const { adminLogin } = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/authMiddleware');
const { createProject, getAllProjects, deleteProject , updateProject } = require('../controllers/projectController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/login', adminLogin);
router.get('/protected', verifyAdmin, (req, res) => {
  res.json({ message: 'Access granted to admin' });
});
router.post('/add', upload.single('image'), createProject);
router.get('/get', getAllProjects); 
router.delete('/delete/:id', deleteProject);
router.put('/update/:id', upload.single('image'), updateProject);
 


module.exports = router;
