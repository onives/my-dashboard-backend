let Blog = require('../models/Blog');

//creat blog instance
const createBlog = async (req, res) => {
    try {
      const blog = new Blog(req.body);
      await blog.save();
      res.status(201).send(blog);
    } catch (error) {
      res.status(400).send(error);
    }
  };

//edit blog
const updateBlog = async (req, res) => {
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
        if(!updatedBlog){
            return res.status(404).send({ error: "The blog you are searching for was not found." })
        }
        res.send({
            message: "Blog updated successfully!",
            data: updatedBlog,
          });
    }catch(e){
        res.status(400).send(e);
    }
};

//fetch all blogs
const fetchBlogs = async(req, res) =>{
    let blogs = await Blog.find({})
    return res.status(200).send(blogs);
};

//Delete Blog from database
const deleteBlog = async(req, res) =>{
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
       return res
       .status(404) 
       .send({error: 'The Blog you are searching for was not found'});
    }

    await blog.deleteOne(blog);

    return res
    .status(200)
    .send({message: `Blog ${blog.title} has been sucessfully deleted`})
};

module.exports = {createBlog, updateBlog, fetchBlogs, deleteBlog};