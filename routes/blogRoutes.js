let router = require('express').Router();
let auth = require('../middleware/auth');
let {createBlog, updateBlog, fetchBlogs, deleteBlog} = require('../controllers/blogControllers');


router.post('/', auth, createBlog);
router.get('/', auth, fetchBlogs);
router.patch('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);

module.exports = router;