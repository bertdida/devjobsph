const scraper = require('./scraper');
const { saveJobs } = require('./db');

const functions = [
  scraper.indeed.scrapeJobs,
  scraper.glassdoor.scrapeJobs,
  scraper.onlinejobs.scrapeJobs,
];

async function scrapeJobs() {
  let promises = [];
  scraper.config.searchQueries.forEach((title) => {
    promises = [...promises, ...functions.map((func) => func(title))];
  });

  const results = await Promise.all(promises);
  const jobs = results.reduce((carry, result) => [...carry, ...result], []);
  saveJobs(jobs);
}

scrapeJobs();
