require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const shiftRoutes = require('./routes/shifts');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const FRONTEND_ORIGIN = 'https://employee-shift-board-qa9p.vercel.app';

app.use(cors({
  origin: (origin, callback) => {
    if (origin === FRONTEND_ORIGIN) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: This origin is not allowed'), false);
  }
}));
app.use(express.json());

connectDB();


app.use('/login', authRoutes);          
app.use('/employees', employeeRoutes); 
app.use('/shifts', shiftRoutes);        

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
