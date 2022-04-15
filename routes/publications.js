const express = require('express');
const router = express.Router();

// import middleware d'authentification
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const publicationsCtrl = require('../controllers/publications');

router.post('/', auth, multer, publicationsCtrl.createPublications);

module.exports = router;