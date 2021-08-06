let router = require('express').Router();
let auth = require('../middleware/auth');

let { createUser, loginUser, fetchUser, updateUser, deleteUser, logOutUser, logOutAll, fetchAllUsers, fetchUserById} = require('../controllers/userControllers');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/me', auth, fetchUser);
router.get('/me/:id', fetchUserById);
router.patch('/me', auth, updateUser);
router.delete('/me', auth, deleteUser);
router.post('/logout', auth, logOutUser);
router.post('/logoutAll', auth, logOutAll);
router.get('/all', fetchAllUsers);

module.exports = router;
