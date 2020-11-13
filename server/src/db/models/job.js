const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  postedBy: {
    type: String,
    trim: true,
  },
  salary: {
    type: String,
    trim: true,
  },
  postedAt: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
});

jobSchema.index({ title: 1, postedBy: 1 }, { unique: true });
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
