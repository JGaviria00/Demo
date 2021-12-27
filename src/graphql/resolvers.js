const Book = require('../dataBase/model');
const logger = require('@condor-labs/logger');

const resolvers = {
  Query: {
    async Books() {
      const books = await Book.find();
      return books;
    },
    async bookDetails(_, { _id }, { client }) {
      return new Promise((res, rej) => {
        client.get(String(_id), async (error, reply) => {
          if (error) {
            logger.error(`Error in redis, get cache... ${error} `);
            rej(error);
          }
          if (reply) {
            logger.info('Ok, cache works.');
            res(JSON.parse(reply));
          } else {
            const newBookDetails = await Book.findById(_id);
            client.set(String(_id), JSON.stringify(newBookDetails), (error, reply) => {
              if (error) {
                logger.error(`Error in redis set cache... ${error}, ${reply}`);
                rej(error);
              }
              logger.info('Ok, set cache works.');
            });
            res(newBookDetails);
          }
        });
      });
    },
  },
  Mutation: {
    async createBook(_, { input }, { client }) {
      const newBook = new Book(input);
      const ifItExist = await Book.find({ title: input.title });
      if (ifItExist.length > 0) {
        logger.info({ ErrorMessage: 'This book already exist.' });
        return null;
      }

      if (newBook.status !== 'LENT' && newBook.status !== 'AVAILABLE' && newBook.status !== 'UNAVAILABLE') {
        logger.info({ ErrorMessage: 'Invalid status' });
        return null;
      }

      await newBook.save();
      client.set(String(newBook._id), JSON.stringify(newBook));
      return newBook;
    },
    async deleteBook(_, { _id }, { client }) {
      const newDeleteBook = await Book.findByIdAndDelete(_id);
      client.del(_id);
      return newDeleteBook;
    },
    async updateBook(_, { _id, input }, { client }) {
      const ifItExist = await Book.find({ title: input.title });
      if (ifItExist.length > 0 && ifItExist[0].title !== input.title) {
        logger.info({ ErrorMessage: 'This book already exist.' });
        return null;
      }

      if (input.status !== 'LENT' && input.status !== 'AVAILABLE' && input.status !== 'UNAVAILABLE') {
        logger.info({ ErrorMessage: 'Invalid status' });
        return null;
      }

      const newUpdateBook = await Book.findByIdAndUpdate(_id, input, { new: true });
      client.del(input._id);
      client.set(String(input._id), JSON.stringify(newUpdateBook));
      return newUpdateBook;
    },
  },
};

module.exports = { resolvers };
