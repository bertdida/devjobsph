const config = require('./config');

function getJobTagsFromString(string) {
  return Object.entries(config.tagRegexMap).reduce((carry, [tag, regex]) => {
    if (regex.test(string)) {
      return [...carry, tag];
    }

    return carry;
  }, []);
}

module.exports = {
  getJobTagsFromString,
};
