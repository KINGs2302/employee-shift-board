require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Employee = require('../models/Employee');

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error('Set MONGODB_URI in .env before seeding.');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);

  console.log('Connected to DB — seeding data...');

  // Clear collections (CAUTION: in production don't drop)
  await User.deleteMany({});
  await Employee.deleteMany({});

  // Create employees
  const emp1 = new Employee({ name: 'Alice Admin', code: 'E001', department: 'HR' });
  const emp2 = new Employee({ name: 'Bob User', code: 'E002', department: 'Sales' });
  await emp1.save();
  await emp2.save();

  // Create users
  const salt = bcrypt.genSaltSync(10);
  const admin = new User({
    username: 'admin',
    password: bcrypt.hashSync('admin123', salt),
    role: 'admin',
    employee: emp1._id // optional: admin linked to emp1
  });

  const normal = new User({
    username: 'user',
    password: bcrypt.hashSync('user123', salt),
    role: 'user',
    employee: emp2._id
  });

  await admin.save();
  await normal.save();

  console.log('Seed complete:');
  console.log('Admin -> username: admin, password: admin123');
  console.log('User -> username: user, password: user123');
  console.log('Employee IDs:', emp1._id.toString(), emp2._id.toString());

  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
