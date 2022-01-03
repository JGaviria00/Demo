const logger = require('@condor-labs/logger');
const MongoRepository = require('./../repository/MongoRepository');
const RedisRepository = require('../repository/RedisRepository');

const ClientMongo = new MongoRepository();
const ClientRedis = new RedisRepository();

const resolvers = {
  Query: {
    // list all books.
    async Books(_, { page, limit }) {
      return await ClientMongo.listAll(page, limit);
    },
    //list details about a specific book.
    async bookDetails(_, { _id }) {
      //Check if the book is on cache
      const checkIfExist = await ClientRedis.get(_id);
      if (checkIfExist !== null) {
        return checkIfExist;
      }
      //search the book and
      const res = await ClientMongo.findById(_id);
      if (!res) {
        throw new Error("This id doesn't exist.");
      }
      await ClientRedis.set(_id, res);
      return res;
    },
  },
  Mutation: {
    async createBook(_, { input }) {
      const ifItExist = await ClientMongo.find({ title: input.title });
      if (ifItExist.length > 0) {
        //check if the title alreay exist.
        logger.info({ ErrorMessage: 'This book already exist.' });
        throw new Error('This book title alreasy exist.');
      }
      //create the book
      const newBook = await ClientMongo.create(input);
      //save in cache
      ClientRedis.set(newBook._id, newBook);
      return newBook;
    },
    async deleteBook(_, { _id }) {
      const ifItExist = await ClientMongo.findById(_id);
      if (ifItExist === null) {
        //check if the book exist
        logger.info({ ErrorMessage: "This book doesn't exist." });
        throw new Error("This book doesn't exist.");
      }
      //remove of database
      const newDeleteBook = await ClientMongo.delete(_id);
      //remove of cache
      ClientRedis.delete(_id);
      return newDeleteBook;
    },
    async updateBook(_, { _id, input }) {
      // check if title already exist.
      const ifItExist = await ClientMongo.find({ title: input.title });
      if (ifItExist.length > 0 && String(ifItExist[0]._id) !== String(_id)) {
        logger.info({ ErrorMessage: 'This book already exist.' });
        throw new Error('This book title alreasy exist.');
      }
      // update book
      const newUpdateBook = await ClientMongo.update(_id, input);
      // remove of cache
      ClientRedis.delete(_id);
      return newUpdateBook;
    },
  },
};

module.exports = { resolvers };
