const express = require('express');
const router = express.Router();
const { body, query, param, validationResult } = require('express-validator');
const { auth, isAdmin } = require('../middleware/auth');
const shiftController = require('../controllers/shiftController');

// create shift (admin only)
router.post(
  '/',
  auth,
  isAdmin,
  [
    body('employeeId').isMongoId(),
    body('date').isISO8601().withMessage('date must be YYYY-MM-DD'),
    body('startTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('startTime must be HH:MM'),
    body('endTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('endTime must be HH:MM')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
    shiftController.createShift(req, res, next);
  }
);

router.get(
  '/',
  auth,
  [
    query('employee').optional().isMongoId(),
    query('date').optional().isISO8601()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
    shiftController.getShifts(req, res, next);
  }
);

// delete shift (admin only)
router.delete('/:id', auth, isAdmin, [param('id').isMongoId()], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
  shiftController.deleteShift(req, res, next);
});

module.exports = router;
