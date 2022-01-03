import { resolvers } from './../src/graphql/resolvers';

//Arrange
const book = {
  title: 'testMock',
  author: 'testMock',
  pages: 1,
  status: 'AVAILABLE',
};

jest.mock('../src/repository/MongoRepository', () => () => ({
  create: (data) => book,
  find: (data) => [book],
}));

jest.mock('../src/repository/RedisRepository', () => () => ({
  set: (key, data) => null,
  get: (key) => null,
}));

describe('Create book when the book title exist.', () => {
  test('Should throw a error.', async () => {
    try {
      //Act
      await resolvers.Mutation.createBook(null, { input: book });
    } catch (e) {
      //Assert
      expect(e.message).toEqual('This book title alreasy exist.');
    }
  });
});
