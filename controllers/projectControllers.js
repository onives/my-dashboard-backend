let Project = require('../models/Project');

//creat project instance
const createProject = async (req, res) => {
    try {
      const project = new Project(req.body);
      await project.save();
      res.status(201).send(project);
    } catch (error) {
      res.status(400).send(error);
    }
  };

//edit project
const updateProject = async (req, res) => {
    const updates = Object.keys(req.body);
    
    try{
        const updatedProject = await Project.findById(req.params.id);
        updates.forEach((update)=>updatedProject[update] = req.body[update]);
        await updatedProject.save();

        if(!updatedProject){
            return res.status(404).send({ error: "The project you are searching for was not found." })
        }
        res.send({
            message: "Project updated successfully!",
            data: updatedProject,
          });
    }catch(e){
        res.status(400).send(e);
    }
};

//fetch all projects
const fetchProjects = async(req, res) =>{
    let projects = await Project.find({})
    return res.status(200).send(projects);
};

//Delete Project from database
const deleteProject = async(req, res) =>{
    try{
        const project = await Project.findByIdAndDelete(req.params.id);
        if(!project){
            return res
            .status(404) 
            .send({error: 'The Project you are searching for was not found'});
        }

        res.send({message: `Project ${project.title} has been sucessfully deleted`});

    }catch(e){
        res.status(400).send()
    }
    
    // const { id } = req.params;
    // const project = await Project.findById(id);
   

    // await project.deleteOne(project);

    // return res
    // .status(200)
    // .send({message: `Project ${project.title} has been sucessfully deleted`})
};

module.exports = {createProject, updateProject, fetchProjects, deleteProject};