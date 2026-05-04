const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mainRouter = require('./main');
const errorHandler = require('./interfaces/middlewares/error-handler');
const notFoundHandler = require('./interfaces/middlewares/not-found');

const app = express();

// 1. Security & Core Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true
}));
app.use(express.json());
app.use(morgan('combined'));

// 2. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// 3. API Routes
app.use('/api', mainRouter);

// 4. Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
