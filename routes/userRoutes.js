let router = require('express').Router();

let { createUser, loginUser, fetchUsers} = require('../controllers/userControllers');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/', fetchUsers)

module.exports = router;