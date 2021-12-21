const mongodb = require("@condor-labs/mongodb")();
const helperMongo = require("./mongoHelper");

let BookSchema = new mongodb.mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  status: String
});

const dbConnection = helperMongo.clients["connection_mongo"]; // I got the name of the connection from mongoDbSettings
let userModel = dbConnection.model("Book", BookSchema); // then I am able to create a my model based on the connection object that I got using my helper

module.exports = userModel;