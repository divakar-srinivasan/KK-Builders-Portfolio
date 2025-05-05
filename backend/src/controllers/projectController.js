const ProjectModel = require('../models/projectModel');

exports.createProject = async (req, res) => {
  const image = req.file.buffer;
  const { description, projectType } = req.body;

  if (!image || !description || !projectType) {
    return res.status(400).json({ error: 'All fields (image, description, projectType) are required.' });
  }

  try {
    const newProject = new ProjectModel({
      image,
      description,
      projectType,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create project', details: err.message });
  }
};


exports.getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find({}); 
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch projects', details: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete project', details: err.message });
  }
};

exports.updateProject = async (req, res) => {
  const projectId = req.params.id;
  const { description, projectType } = req.body;
  let image;

  if (req.file) {
    image = req.file.buffer; 
  }

  try {
    const updateData = { description, projectType };
    if (image) {
      updateData.image = image;
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update project', details: err.message });
  }
};
