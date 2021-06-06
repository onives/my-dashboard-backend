let router = require('express').Router();
let {createProject, updateProject, fetchProjects, deleteProject} = require('../controllers/projectControllers');
let auth = require('../middleware/auth');

router.post('/', auth, createProject);
router.get('/', auth, fetchProjects);
router.patch('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;