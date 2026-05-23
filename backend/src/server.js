const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';

// Add logging middleware to verify requests are reaching the server
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Manual CORS middleware for extra reliability
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Simplify CORS for debugging - reflecting origin
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json());

// Temporarily comment out helmet to rule it out
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" }
// }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/quiz', require('./routes/quizRoutes'));
app.use('/api/spelling', require('./routes/spellingRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/tutor', require('./routes/tutorRoutes'));
app.use('/api/learning', require('./routes/learningRoutes'));
app.use('/api/revision', require('./routes/revisionRoutes'));
app.use('/api/voice', require('./routes/voiceRoutes'));
app.use('/api/gamification', require('./routes/gamificationRoutes'));
app.use('/api/achievement', require('./routes/achievementRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
