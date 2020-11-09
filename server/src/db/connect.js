const dotenv = require('dotenv');
const mongoose = require('mongoose');

function connect(callback) {
  dotenv.config();
  const dbUri = process.env.DB_URI;

  mongoose.connect(dbUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  const { connection } = mongoose;

  connection.on('open', () => {
    console.log('✅ Database connection established successfully');

    if (typeof callback === 'function') {
      callback(connection);
    }
  });

  connection.on('close', () => {
    console.log('✅ Database connection closed successfully');
  });
}

module.exports = connect;
