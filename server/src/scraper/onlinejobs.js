const url = require('url');
const axios = require('axios');
const cheerio = require('cheerio');

const config = require('./config');
const { getJobTagsFromString, formatPostedAt } = require('./utils');

const BASE_URL = 'https://www.onlinejobs.ph';
const ONE_DAY = 1 * 24 * 60 * 60 * 1000;

async function scrapeJobs(jobTitle) {
  const formData = {
    jobkeyword: jobTitle,
    search: 'Search Job',
    Freelance: 'on',
    partTime: 'on',
    fullTime: 'on',
    isFromJobsearchForm: 1,
  };

  const params = new url.URLSearchParams(formData);
  let response = null;

  try {
    response = await axios.post(`${BASE_URL}/jobseekers/jobsearch`, params.toString());
  } catch (error) {
    return [];
  }

  const $ = cheerio.load(response.data);
  const targets = $('.jobpost-cat-box');

  const results = targets.map((_, element) => {
    const title = $(element).find('h4').contents().get(0).nodeValue.trim();

    const $postedAt = $(element).find('p:contains("Posted on")');
    const postInfo = $postedAt.text().trim();
    const postedBy = postInfo.split(' • ')[0];
    const postedAt = $(element).find('p[data-temp]').data('temp');

    const salary = $postedAt.next().text().trim();
    const urlRelative = $(element).find('> a').attr('href');

    return {
      title,
      postedBy,
      salary: salary || null,
      postedAt: formatPostedAt(postedAt),
      url: `${BASE_URL}${urlRelative}`,
    };
  }).get();

  const jobs = results.filter((result) => isWithin24Hours(result.postedAt));

  if (!config.scrapeTags) {
    return jobs;
  }

  const promises = jobs.map(async (job) => ({ ...job, tags: await scrapeJobTags(job) }));
  return Promise.all(promises);
}

function isWithin24Hours(postedAt) {
  return new Date(postedAt) > (Date.now() - ONE_DAY);
}

async function scrapeJobTags({ url: jobUrl }) {
  let response = null;

  try {
    response = await axios.get(jobUrl);
  } catch (error) {
    return [];
  }

  const $ = cheerio.load(response.data);
  const description = $('#job-description').text();
  return getJobTagsFromString(description);
}

module.exports = { scrapeJobs };
