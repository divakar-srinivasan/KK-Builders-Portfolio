const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  image: {
    type: Buffer,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  projectType: {
    type: String,
    required: true,
    
  }
});

module.exports = mongoose.model('Project', projectSchema);

