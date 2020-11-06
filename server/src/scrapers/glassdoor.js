const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const config = require('./config');
const { getJobTagsFromString, formatPostedOn } = require('./utils');

const BASE_URL = 'https://www.glassdoor.com';
const SOURCE_KEY = 'glassdoor';

async function scrapeJobs(jobTitle) {
  const url = getPageUrl({ title: jobTitle });
  const jobs = await scrapeJobsRecursively(url);

  if (!config.scrapeTags) {
    return jobs;
  }

  // we use for loop below to avoid MaxListenersExceededWarning
  // https://stackoverflow.com/a/46297546/8062659

  const jobsWithTags = [];
  for (let index = 0; index < jobs.length; index += 1) {
    const job = jobs[index];
    const tags = await scrapeJobTags(job); // eslint-disable-line no-await-in-loop
    jobsWithTags.push({ ...job, tags });
  }

  return jobsWithTags;
}

function getPageUrl({ title: titleParam, lastDays = 1, remoteOnly = true }) {
  const title = titleParam.split(' ').join('-').toLowerCase();
  const url = `${BASE_URL}/Job/philippines/philippines-${title}-jobs-SRCH_IL.0,11_IN204_KO12,30.htm?fromAge=${lastDays}`;
  return remoteOnly ? `${url}&remoteWorkType=1` : url;
}

async function scrapeJobsRecursively(url, results = [], page = 1) {
  let response = null;

  try {
    response = await axios.get(url);
  } catch (error) {
    return results;
  }

  const $ = cheerio.load(response.data);
  const targets = $('.react-job-listing');

  const currResults = targets.map((_, element) => {
    const title = $(element).find('.jobTitle').text().trim();
    const postedBy = $(element).find('.jobHeader').text().trim();
    const postedOn = $(element).find('[data-test=job-age]').text().trim();
    const urlRelative = $(element).find('.jobHeader a').attr('href');

    return {
      title,
      postedBy,
      postedOn: formatPostedOn(postedOn),
      salary: null,
      url: `${BASE_URL}${urlRelative}`,
      source: SOURCE_KEY,
    };
  }).get();

  const newResults = [...results, ...currResults];
  const next = $('.next a');

  if (next.length && page < config.maxPage) {
    const nextUrl = BASE_URL + next.attr('href');
    return scrapeJobsRecursively(nextUrl, newResults, page + 1);
  }

  return newResults;
}

async function scrapeJobTags({ url }) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });
  } catch (error) {
    await browser.close();
    return [];
  }

  const description = await page.evaluate(() => {
    const target = document.getElementById('JobDescriptionContainer');
    return target.innerText;
  });

  await browser.close();
  return getJobTagsFromString(description);
}

module.exports = { scrapeJobs };
