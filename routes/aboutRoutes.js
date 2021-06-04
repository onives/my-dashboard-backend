let router = require('express').Router();
let auth = require('../middleware/auth');

let { createAbout, fetchAbout, updateAbout , deleteAbout} = require('../controllers/aboutControllers');

router.post('/', auth, createAbout);
router.get('/', auth, fetchAbout);
router.patch('/:id', auth, updateAbout);
router.delete('/:id', auth, deleteAbout);

module.exports = router;