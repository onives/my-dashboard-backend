let Blog = require('../models/Blog');

//creat blog instance
const createBlog = async (req, res) => {

  const blog = new Blog({
    ...req.body, owner: req.user._id
  });
  // req.user.blogs = req.user.blogs.concat({ blog }); 
  await blog.save();
  return res.status(201).send(blog);
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
const fetchBlogs = async(req, res) =>{
  try{
    let blogs = await Blog.find({owner: req.user._id}); 
    res.status(200).send(blogs)
  }catch(e){
    console.log(e)
      res.status(500).send()
  }
};

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

module.exports = {createBlog, updateBlog, fetchBlogs, deleteBlog};