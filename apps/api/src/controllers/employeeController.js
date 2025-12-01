const Employee = require('../models/Employee');

exports.listEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().select('-__v').lean();
    res.json(employees);
  } catch (err) {
    next(err);
  }
};
