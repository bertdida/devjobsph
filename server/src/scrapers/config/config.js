const tagRegexMap = require('./tag-regex-map');

module.exports = {
  /** the maximum page to scrape */
  maxPage: 1,

  /** whether to scrape tags or not. setting this to
   * `true` will do an additional request on the job's details page
   */
  scrapeTags: true,

  /** an object with tag and regex pattern as key value pairs */
  tagRegexMap,
};
