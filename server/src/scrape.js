const { indeed } = require('./scrapers');
const { glassdoor } = require('./scrapers');
const { onlinejobs } = require('./scrapers');
const { saveJobs } = require('./db');

const JOB_TITLES = [
  'software engineer',
  'software developer',
  'web developer',
];

const functions = [
  indeed.scrapeJobs,
  glassdoor.scrapeJobs,
  onlinejobs.scrapeJobs,
];

async function scrapeJobs() {
  let promises = [];
  JOB_TITLES.forEach((title) => {
    promises = [...promises, ...functions.map((func) => func(title))];
  });

  const results = await Promise.all(promises);
  const jobs = results.reduce((carry, result) => [...carry, ...result], []);
  saveJobs(jobs);
}

scrapeJobs();
