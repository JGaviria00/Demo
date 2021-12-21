const mongoDbHelper = require("./mongoHelper")
mongoDbHelper.connect().then(async () => {
    // Load helpers
    const userModelDB1 = require("./model");
  
    console.log(userModelDB1.findOne({}))
  
})