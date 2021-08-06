let router = require('express').Router();
let auth = require('../middleware/auth');
let {createBlog, updateBlog, fetchUserBlogs, deleteBlog, fetchAllBlogs, getSingleBlog} = require('../controllers/blogControllers');


router.post('/', auth, createBlog);
router.get('/', auth, fetchUserBlogs);
router.patch('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);
router.get('/all', fetchAllBlogs);
router.get('/:id', getSingleBlog);


module.exports = router;
