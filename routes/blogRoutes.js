let router = require('express').Router();
let auth = require('../middleware/auth');
let {createBlog, updateBlog, fetchUserBlogs, deleteBlog, fetchAllBlogs} = require('../controllers/blogControllers');


router.post('/', auth, createBlog);
router.get('/', auth, fetchUserBlogs);
router.patch('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);
router.get('/all', fetchAllBlogs);


module.exports = router;