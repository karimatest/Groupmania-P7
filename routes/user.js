const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const password = require('../middleware/password');
const userCtrl = require('../controllers/user');

router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
//router.put('/:id',auth, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.get('/:id', auth, userCtrl.getOneUser);
//EXPORTS
module.exports = router;