const tagRegexMap = require('./tagRegexMap');

module.exports = {
  /** the maximum page to scrape */
  maxPage: 1,

  /** whether to scrape tags or not  */
  scrapeTags: true,

  /** an object with tag and regex pattern as key value pairs */
  tagRegexMap,
};
