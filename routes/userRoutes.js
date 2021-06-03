let router = require('express').Router();
let auth = require('../middleware/auth');

let { createUser, loginUser, fetchUser, updateUser, deleteUser, logOutUser} = require('../controllers/userControllers');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/me', auth, fetchUser);
router.patch('/me', auth, updateUser);
router.delete('/me', auth, deleteUser);
router.post('/logout', auth, logOutUser);

module.exports = router;module.exports = router;