//importing the about model
let About = require('../models/About');

//create a new about in database
const createAbout = async (req, res) =>{ 
    const about = new About({
        ...req.body, owner: req.user._id
    });
    await about.save();
    return res.status(201).send(about)
};

//fetch the about description
const fetchAbout = async(req, res) =>{
    try{
        // let about = await About.find({owner: req.user._id}); //works the same way
        await req.user.populate('about').execPopulate()
        res.status(200).send(req.user.about);
    }catch(e){
        res.status(500).send()
    }
    
};


// Edit about information
const updateAbout = async (req, res) => {
    try{
        const updatedAbout = await About.findOne({_id: req.params.id, owner: req.user._id});
        if(!updatedAbout){
            return res.status(404).send({ error: "What you are searching for was not found." })
        }
        const { description } = req.body;
        updatedAbout.description = description;
        await updatedAbout.save();
        res.send({
            message: "About updated successfully!",
            data: updatedAbout,
          });
    }catch(e){
        res.status(400).send(e);
    }
};

const deleteAbout = async(req, res) =>{
    try{
        const about = await About.findOne({_id: req.params.id, owner: req.user._id})
        // const about = await About.findByIdAndDelete(req.params.id);
        if(!about){
            return res
            .status(404) 
            .send({error: 'The About you are searching for was not found'});
        }
        await about.deleteOne();
        res.send({message: `About has been sucessfully deleted`});

    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
    
    
};
module.exports = { createAbout, fetchAbout, updateAbout , deleteAbout};

