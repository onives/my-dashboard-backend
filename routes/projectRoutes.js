let router = require('express').Router();
let {createProject, updateProject, fetchProjects, deleteProject} = require('../controllers/projectControllers');

router.post('/', createProject);
router.get('/', fetchProjects);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;