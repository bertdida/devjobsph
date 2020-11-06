const path = require('path');

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const compression = require('compression');

const { getJobs } = require('./db');

dotenv.config();

const port = process.env.PORT || 5000;
const clientPath = path.join(__dirname, '../../client/build');
const clientIndex = path.join(clientPath, 'index.html');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(compression());
app.use(express.static(clientPath));

app.get('/', (req, res) => {
  res.sendFile(clientIndex);
});

app.get('/api/jobs', async (req, res, next) => {
  try {
    const jobs = await getJobs();
    res.json({ data: jobs });
  } catch (error) {
    next(error);
  }
});

app.get('*', (req, res) => {
  res.sendFile(clientIndex);
});

app.listen(port, () => {
  console.log(`🌍 Serving app on port ${port}...`);
});
