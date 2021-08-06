let Project = require('../models/Project');
const User = require('../models/User')

//creat project instance
const createProject = async (req, res) => {
    const project = new Project({
        ...req.body, owner: req.user._id
    });
    req.user.projects = req.user.projects.concat( project._id );
    await project.save();
    await req.user.save();
    return res.status(201).send(project);
};

//edit project
const updateProject = async (req, res) => {
    const updates = Object.keys(req.body);
    
    try{
        const project = await Project.findOne({_id: req.params.id, owner: req.user._id});
        updates.forEach((update)=>project[update] = req.body[update]);
        if(!project){
            return res.status(404).send({ error: "The project not found." })
        }
        await project.save();
        res.send({
            message: "Project updated successfully!",
            data: project,
          });
    }catch(e){
        res.status(400).send(e);
    }
};

//fetch all projects
const fetchUserProjects = async(req, res) =>{
    try{
        // let projects = await Project.find({owner: req.user._id}); //works the same way
        const user = await User.findOne({_id: req.user._id}).populate('projects').exec();
        // await req.user.populate('projects').execPopulate()
        res.status(200).send(user.projects)
        // res.status(200).send(req.user.projects);
    }catch(e){
        res.status(500).send()
    }
};

// fetch a project by id
const getSingleProject = async(req, res)=>{
    try {
        const project = await Project.findById(req.params.id);
        if (project == null) {
            return res.status(404).json({ message: "Cannot find Project" });
        }
        res.status(200).send(project)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

//Delete Project from database
const deleteProject = async(req, res) =>{
    try{
        const project = await Project.findOne({_id: req.params.id, owner: req.user._id})
        if(!project){
            return res
            .status(404) 
            .send({error: 'Project not found'});
        }
        await project.deleteOne();
        res.send({message: `Project sucessfully deleted`});

    }catch(e){
        res.status(400).send(e)
    }
};

//fetch all projects
const fetchAllProjects = async(req, res) =>{
    try{
        let projects = await Project.find({})
        return res.status(200).send(projects);
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
};

module.exports = {createProject, updateProject, fetchUserProjects, deleteProject, fetchAllProjects, getSingleProject};
