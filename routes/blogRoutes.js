let router = require('express').Router();

let {createBlog, updateBlog, fetchBlogs, deleteBlog} = require('../controllers/blogControllers');

router.post('/', createBlog);
router.get('/', fetchBlogs);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;