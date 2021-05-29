//importing the about model
let About = require('../models/About');

//create a new about in database
const createAbout = async (req, res) =>{ 
    const about = new About(req.body);
    await about.save();
    return res.status(201).send(about)
};

//fetch the about description
const fetchAbout = async(req, res) =>{
    let about = await About.find({})
    return res.status(200).send(about);
};


// Edit about information
const updateAbout = async (req, res) => {
    try{
        const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
        if(!updatedAbout){
            return res.status(404).send({ error: "What you are searching for was not found." })
        }
        res.send({
            message: "About updated successfully!",
            data: updatedAbout,
          });
    }catch(e){
        res.status(400).send(e);
    }
};

module.exports = { createAbout, fetchAbout, updateAbout };

