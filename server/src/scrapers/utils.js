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

function formatPostedOn(postedOn) {
  const parsed = chrono.parseDate(postedOn);

  if (parsed !== null) {
    return parsed;
  }

  if (postedOn.toLowerCase() === 'just posted') {
    return chrono.parseDate('now');
  }

  if (/^(?:[1-9]|1[0-9]|2[0-4])h$/i.test(postedOn)) {
    return chrono.parseDate(`${parseInt(postedOn, 10)} hours ago`);
  }

  return postedOn;
}

module.exports = {
  getJobTagsFromString,
  formatPostedOn,
};
