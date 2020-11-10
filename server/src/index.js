const path = require('path');

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const yup = require('yup');
const dotenv = require('dotenv');
const compression = require('compression');

const db = require('./db');

dotenv.config();

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

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.get('/api/jobs', async (req, res, next) => {
  const schema = yup.object().shape({
    page: yup.number().positive().required().default(1),
    perPage: yup.number().oneOf([10, 15, 20]).default(20),
    tag: yup.string().nullable().default(null),
  });

  try {
    const params = await schema.validate(req.query);
    const results = await db.client.getJobs(params);
    await sleep(3000);

    res.json(results);
  } catch (error) {
    next(error);
  }
});

app.get('*', (req, res) => {
  res.sendFile(clientIndex);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status ? error.status : 500);
  res.json({
    message: error.message,
    ...(process.env.NODE_ENV !== 'production' && ({ stack: error.stack })),
  });
});

db.connect(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`✅ Serving app on port ${port}...`);
  });
});
