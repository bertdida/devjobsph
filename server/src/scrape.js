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
  const uniqueJobs = removeDuplicates(jobs);
  saveJobs(uniqueJobs);
}

function removeDuplicates(jobs) {
  return jobs.filter((job, index, self) => {
    const { title, postedBy } = job;
    const titleUpper = title.toUpperCase();
    const postedByUpper = postedBy.toUpperCase();

    return index === self.findIndex((currJob) => currJob.title.toUpperCase() === titleUpper
      && currJob.postedBy.toUpperCase() === postedByUpper);
  });
}

scrapeJobs();
