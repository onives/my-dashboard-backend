let router = require('express').Router();

let { createUser, loginUser} = require('../controllers/userControllers');

router.post('/signup', createUser);
router.post('/login', loginUser);

module.exports = router;