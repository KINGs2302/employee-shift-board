const Shift = require('../models/Shift');
const Employee = require('../models/Employee');
const mongoose = require('mongoose');

/* Helper: convert "HH:MM" to minutes since midnight*/
function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/*Admin-only (checked in route middleware)*/
exports.createShift = async (req, res, next) => {
  try {
    const { employeeId, date, startTime, endTime } = req.body;

   
    const emp = await Employee.findById(employeeId);
    if (!emp) return res.status(400).json({ message: 'Employee not found' });

    const s = toMinutes(startTime);
    const e = toMinutes(endTime);

    if (e <= s) return res.status(400).json({ message: 'endTime must be after startTime' });


    if (e - s < 4 * 60) return res.status(400).json({ message: 'Shift must be at least 4 hours' });

   
    const existing = await Shift.find({ employee: employeeId, date });

   
    for (const ex of existing) {
      const exS = toMinutes(ex.startTime);
      const exE = toMinutes(ex.endTime);
      if (s < exE && exS < e) {
        return res.status(400).json({ message: 'Overlapping shift exists for this employee on this date' });
      }
    }

    const shift = await Shift.create({
      employee: employeeId,
      date,
      startTime,
      endTime,
      createdBy: req.user.id
    });

    const populated = await shift.populate('employee', 'name code department').execPopulate?.() || await Shift.findById(shift._id).populate('employee', 'name code department');

    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};


exports.getShifts = async (req, res, next) => {
  try {
    const { employee: employeeQuery, date } = req.query;
    const filter = {};

    if (req.user.role === 'admin') {
      if (employeeQuery) filter.employee = employeeQuery;
    } else {
      // normal user must be linked to an employee
      if (!req.user.employeeId) return res.status(403).json({ message: 'User has no linked employee record' });
      filter.employee = req.user.employeeId;
    }

    if (date) filter.date = date;

    const shifts = await Shift.find(filter).populate('employee', 'name code department').sort({ date: 1, startTime: 1 });
    res.json(shifts);
  } catch (err) {
    next(err);
  }
};

/* Admin-only (middleware)*/
exports.deleteShift = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid shift id' });
    const shift = await Shift.findById(id);
    if (!shift) return res.status(404).json({ message: 'Shift not found' });
    await shift.deleteOne();
    res.json({ message: 'Shift deleted' });
  } catch (err) {
    next(err);
  }
};
