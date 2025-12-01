const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const employeeController = require('../controllers/employeeController');

router.get('/', auth, employeeController.listEmployees);

module.exports = router;
