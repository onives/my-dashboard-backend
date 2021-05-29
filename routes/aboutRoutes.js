let router = require('express').Router();

let { createAbout, fetchAbout, updateAbout } = require('../controllers/aboutControllers');

router.post('/', createAbout);
router.get('/', fetchAbout);
router.patch('/:id', updateAbout);

module.exports = router;