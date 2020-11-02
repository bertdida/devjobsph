const { indeed } = require('./scrapers');
const { glassdoor } = require('./scrapers');
const { onlinejobs } = require('./scrapers');
const { saveJobs } = require('./db');

const JOB_TITLE = 'software developer';

const functions = [
  indeed.scrapeJobs,
  glassdoor.scrapeJobs,
  onlinejobs.scrapeJobs,
];

async function scrapeJobs() {
  const results = await Promise.all(functions.map((func) => func(JOB_TITLE)));
  const jobs = results.reduce((carry, result) => [...carry, ...result], []);
  // saveJobs(jobs);
  console.log(jobs);
}

scrapeJobs();
