let router = require('express').Router();
let {createProject, updateProject, fetchUserProjects, deleteProject, fetchAllProjects, getSingleProject, fetchProjectsByUserId} = require('../controllers/projectControllers');
let auth = require('../middleware/auth');

router.post('/', auth, createProject);
router.get('/', auth, fetchUserProjects);
router.patch('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);
router.get('/all', fetchAllProjects);
router.get('/:id', getSingleProject);
router.get('/me/:id', fetchProjectsByUserId)


module.exports = router;
