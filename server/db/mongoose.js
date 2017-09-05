var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/billpro';

mongoose.connect(url)

mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

module.exports = {mongoose};
