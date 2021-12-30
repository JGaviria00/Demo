const mongodb = require('@condor-labs/mongodb')();

const BookSchema = new mongodb.mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  pages: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

// const dbConnection = helperMongo.clients['connection_mongo']; // I got the name of the connection from mongoDbSettings
const BookModel = mongodb.mongoose.model('Book', BookSchema); // then I am able to create a my model based on the connection object that I got using my helper

module.exports = BookModel;
