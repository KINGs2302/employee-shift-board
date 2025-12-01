const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

router.post(
  '/',
  [
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
    authController.login(req, res, next);
  }
);

module.exports = router;
