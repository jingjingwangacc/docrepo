const express = require('express');

const userController = require('../controllers/userController.js');

const router = express.Router();

router.post('/',
  userController.createUser,
  (req, res) => res.status(200).json(res.locals.user)
);

// A very simple login without any session / cookie settings.
router.post('/login',
  userController.verifyUserNameAndPassword,
  (req, res) => res.status(200).json(res.locals.user))

module.exports = router;
