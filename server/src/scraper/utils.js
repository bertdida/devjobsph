const chrono = require('chrono-node');
const config = require('./config');

function getJobTagsFromString(string) {
  return Object.entries(config.tagRegexMap).reduce((carry, [tag, regex]) => {
    if (regex.test(string)) {
      return [...carry, tag];
    }

    return carry;
  }, []);
}

function formatPostedAt(postedAt) {
  const parsed = chrono.parseDate(postedAt);

  if (parsed !== null) {
    return parsed;
  }

  if (postedAt.toLowerCase() === 'just posted') {
    return chrono.parseDate('now');
  }

  if (/^(?:[1-9]|1[0-9]|2[0-4])h$/i.test(postedAt)) { // matches 1h - 24h case-insensitive
    return chrono.parseDate(`${parseInt(postedAt, 10)} hours ago`);
  }

  return postedAt;
}

module.exports = {
  getJobTagsFromString,
  formatPostedAt,
};
