const { Job } = require('./models');

async function saveJobs(jobs, options = {}) {
  return Job.insertMany(jobs, options);
}

async function getJobs({ page, perPage, tag }) {
  let conditions = {};
  if (tag) {
    conditions = {
      tags: {
        $in: [
          RegExp(`^${tag}$`, 'i'),
        ],
      },
    };
  }

  const totalDocs = await Job.countDocuments(conditions).exec();
  const totalPage = Math.ceil(totalDocs / perPage);

  const nextPage = page >= totalPage ? null : page + 1;
  const prevPage = page <= 1 ? null : page - 1;

  const results = await Job
    .find(conditions)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ postedOn: 'desc', createdAt: 'desc' })
    .select('-__v')
    .exec();

  return {
    curr_page: page,
    next_page: nextPage,
    prev_page: prevPage,
    per_page: perPage,
    total: totalDocs,
    data: results,
  };
}

module.exports = { saveJobs, getJobs };
