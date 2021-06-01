let router = require('express').Router();

let { createUser, loginUser, fetchUsers, updateUser} = require('../controllers/userControllers');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/', fetchUsers)
router.patch('/', updateUser);

module.exports = router;