const mongoDbHelper = require('./mongoHelper');
mongoDbHelper.connect().then(async () => {
  // Load helpers
  const userModelDB1 = require('./model');

  userModelDB1.findOne({});
});
