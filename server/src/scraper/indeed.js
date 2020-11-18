const axios = require('axios');
const cheerio = require('cheerio');

const config = require('./config');
const { getJobTagsFromString } = require('./utils');

const BASE_URL = 'https://ph.indeed.com';

async function scrapeJobs(jobTitle) {
  const url = getPageUrl({ title: jobTitle, remoteOnly: false });
  const jobs = await scrapeJobsRecursively(url);

  if (!config.scrapeTags) {
    return jobs.map(removeJk);
  }

  const promises = jobs.map(async (job) => ({ ...job, tags: await scrapeJobTags(job) }));
  return (await Promise.all(promises)).map(removeJk);
}

function getPageUrl({ title: titleParam, lastDays = 1, remoteOnly = true }) {
  const title = titleParam.split(' ').join('+').toLowerCase();
  const url = `${BASE_URL}/jobs?q=${title}&fromage=${lastDays}&l=Philippines`;
  return remoteOnly ? `${url}&remotejob=1` : url;
}

async function scrapeJobsRecursively(url, results = [], page = 1) {
  let response = null;

  try {
    response = await axios.get(url);
  } catch (error) {
    return results;
  }

  const $ = cheerio.load(response.data);
  const targets = $('.result');

  const currResults = targets.map((_, element) => {
    const _jk = $(element).data('jk');
    const title = $(element).find('.title a').attr('title').trim();
    const postedBy = $(element).find('.company').text().trim();
    const salary = $(element).find('.salaryText').text().trim();
    const urlRelative = $(element).find('.title a').attr('href');

    return {
      _jk,
      title,
      postedBy,
      salary: salary || null,
      url: `${BASE_URL}${urlRelative}`,
    };
  }).get();

  const newResults = [...results, ...currResults];
  const next = $('[aria-label=Next]');

  if (next.length && page < config.maxPage) {
    const nextUrl = BASE_URL + next.attr('href');
    return scrapeJobsRecursively(nextUrl, newResults, page + 1);
  }

  return newResults;
}

async function scrapeJobTags({ _jk }) {
  let response = null;

  try {
    response = await axios.get(`${BASE_URL}/rpc/jobdescs?jks=${_jk}`);
  } catch (error) {
    return [];
  }

  const descriptionHtml = response.data[_jk];
  if (!descriptionHtml) {
    return [];
  }

  const $ = cheerio.load(descriptionHtml);
  const description = $.text();
  return getJobTagsFromString(description);
}

function removeJk({ _jk, ...rest }) {
  return rest;
}

module.exports = { scrapeJobs };
