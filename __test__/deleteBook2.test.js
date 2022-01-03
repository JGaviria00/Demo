import { resolvers } from './../src/graphql/resolvers';

//Arrange
const book = {
  title: 'testMock',
  author: 'testMock',
  pages: 1,
  status: 'AVAILABLE',
};

const bookId = '61c354841740e6134f3f88be';

jest.mock('../src/repository/MongoRepository', () => () => ({
  findById: (data) => null,
}));

jest.mock('../src/repository/RedisRepository', () => () => ({
  delete: (key) => null,
}));

describe('Delete book when the book does not exist.', () => {
  test('Should throw a error.', async () => {
    try {
      //Act
      await resolvers.Mutation.deleteBook(null, { _id: bookId });
    } catch (e) {
      //Assert
      expect(e.message).toEqual("This book doesn't exist.");
    }
  });
});
