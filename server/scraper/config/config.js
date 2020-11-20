const tagRegexMap = require('./tag-regex-map');

module.exports = {
  /** list of job titles to scrape */
  searchQueries: [
    'software engineer',
    'software developer',
    'web developer',
    'full stack developer',
    'back end developer',
    'front end developer',
  ],

  /** the maximum page to scrape */
  maxPage: 1,

  /** whether to scrape tags or not. setting this to
   * `true` will do an additional request on the job's details page
   */
  scrapeTags: true,

  /** an object with tag and regex pattern as key value pairs */
  tagRegexMap,
};
