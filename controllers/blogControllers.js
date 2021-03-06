let Blog = require('../models/Blog');
const User = require('../models/User')

//creat blog instance
const createBlog = async (req, res) => {

  const blog = new Blog({
    ...req.body, owner: req.user._id
  });
  try{
    req.user.blogs = req.user.blogs.concat( blog._id );
    await blog.save(); 
    await req.user.save();
  
    return res.status(201).send(blog);
  }catch(e){
    console.log(e)
    res.status(400).send(e);
  }
};

//edit blog
const updateBlog = async (req, res) => {
  const updates = Object.keys(req.body);
    
  try{
      const blog = await Blog.findOne({_id: req.params.id, owner: req.user._id});
      updates.forEach((update)=>blog[update] = req.body[update]);
      if(!blog){
          return res.status(404).send({ error: "Blog not found." })
      }
      await blog.save();
      res.send({
          message: "Blog updated successfully!",
          data: blog,
        });
  }catch(e){
      res.status(400).send(e);
  }
};

//fetch all blogs
const fetchUserBlogs = async(req, res) =>{
  try{
    // let blogs = await Blog.find({owner: req.user._id}); 
    const user = await User.findOne({_id: req.user._id}).populate('blogs').exec();
    // let blogs = req.user.populate('blogs').execPopulate();
    res.status(200).send(user.blogs)
  }catch(e){
    console.log(e)
      res.status(500).send(e)
  }
};

//fetch blogs by user Id
const fetchBlogsByUserId = async(req, res)=>{
  try{
    const user = await User.findOne({_id: req.params.id}).populate('blogs').exec();
    res.status(200).send(user.blogs)
  }catch(e){
    console.log(e)
      res.status(500).send(e)
  }
}
//Delete Blog from database
const deleteBlog = async(req, res) =>{
  try{
    const blog = await Blog.findOne({_id: req.params.id, owner: req.user._id})
    if(!blog){
        return res
        .status(404) 
        .send({error: 'Blog not found'});
    }
    await blog.deleteOne();
    res.send({message: `Blog sucessfully deleted`});

}catch(e){
    res.status(400).send(e)
}
};
//fetch all blogs
const fetchAllBlogs = async(req, res) =>{
  try{
      let blogs = await Blog.find({})
      return res.status(200).send(blogs);
  }catch(e){
      console.log(e)
      res.status(500).send(e)
  }
};

// fetch a blog by id
const getSingleBlog = async(req, res)=>{
  try {
      const blog = await Blog.findById(req.params.id);
      if (blog == null) {
          return res.status(404).json({ message: "Cannot find Blog" });
      }
      res.status(200).send(blog)
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
}

module.exports = {createBlog, updateBlog, fetchUserBlogs, deleteBlog, fetchAllBlogs, getSingleBlog, fetchBlogsByUserId};
