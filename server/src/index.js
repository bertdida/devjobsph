const path = require('path');

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { getJobs } = require('./db');

const app = express();
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS.split(',') }));

const port = process.env.PORT || 5000;
const clientPath = path.resolve('../client/build/');

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});

app.use(express.static(clientPath));
app.get('/', (req, res) => res.sendFile(clientPath));

app.get('/v1/jobs', async (req, res, next) => {
  try {
    const jobs = await getJobs();
    res.json({ data: jobs });
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    ...(process.NODE_ENV !== 'production' && { stack: error.stack }),
  });
});
