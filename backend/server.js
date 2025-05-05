const express = require('express');
const cors = require('cors');
const { port } = require('./src/config/dotenv');
const adminRoutes = require('./src/routes/adminRoutes');
const contactRoutes = require('./src/routes/contactRoutes'); 
const blogRoutes = require('./src/routes/blogRoutes');
const DB = require('./src/config/db');

require('dotenv').config(); 

const app = express();
DB();
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
