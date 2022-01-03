const mongo = require('./../dataBase/mongoHelper');
const bookModel = require('./../dataBase/model');
const logger = require('@condor-labs/logger');

module.exports = class MongoRepository {
  constructor() {
    this.mongo = mongo;
    this.mongo.connect();
    this.bookModel = bookModel;
  }

  async listAll(page, limit) {
    try {
      const skips = parseInt(limit) * (parseInt(page) - 1);
      return await this.bookModel.find().skip(skips).limit(parseInt(limit));
    } catch (e) {
      logger.error("Data base cant't list all books.");
    }
  }

  async findById(_id) {
    try {
      return await this.bookModel.findById(_id);
    } catch (e) {
      logger.error("Data base cant't find the book.");
    }
  }

  async find(input) {
    try {
      return await this.bookModel.find(input);
    } catch (e) {
      logger.error("Data base cant't find the book.");
    }
  }

  async create(input) {
    try {
      const newBook = new this.bookModel(input);
      await newBook.save();
      return newBook;
    } catch (e) {
      logger.error("Data base cant't create the book.");
    }
  }

  async delete(_id) {
    try {
      return this.bookModel.findByIdAndDelete(_id);
    } catch (e) {
      logger.error("Data base cant't delete the book.");
    }
  }

  async update(_id, input) {
    try {
      return await this.bookModel.findByIdAndUpdate(_id, input, { new: true });
    } catch (e) {
      logger.error("Data base cant't update the book.");
    }
  }
};
