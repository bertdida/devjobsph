const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const { jobsRoute } = require('./routes');

const app = express();
const clientPath = path.join(__dirname, '../client/build');
const clientIndex = path.join(clientPath, 'index.html');

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(express.static(clientPath));

// https://stackoverflow.com/q/63401777/8062659
app.use(helmet({
  contentSecurityPolicy: false,
}));

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status ? error.status : 500);
  res.json({
    message: error.message,
    ...(process.env.NODE_ENV !== 'production' && ({ stack: error.stack })),
  });
});

app.use('/api/jobs', jobsRoute);

app.get('*', (req, res) => {
  res.sendFile(clientIndex);
});

module.exports = app;
