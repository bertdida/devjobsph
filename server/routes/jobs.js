const express = require('express');
const yup = require('yup');

const db = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const schema = yup.object().shape({
    page: yup.number().positive().required().default(1),
    perPage: yup.number().oneOf([10, 15, 20]).default(20),
    tag: yup.string().nullable().default(null),
  });

  try {
    const params = await schema.validate(req.query);
    const results = await db.client.getJobs(params);
    res.json(results);
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 422;
    }

    next(error);
  }
});

module.exports = router;
