import { resolvers } from './../src/graphql/resolvers';

//Arrange
const book = {
  title: 'testMock',
  author: 'testMock',
};
const bookId = '61c354841740e6134f3f88be';

const book2 = {
  _id: '61c92870e8d08e0013eb32f4',
  title: 'testMock',
  author: 'check',
  pages: 10,
  status: 'LENT',
};

jest.mock('../src/repository/mongoRepository', () => () => ({
  find: (data) => [book2],
  update: (id, data) => book,
}));

jest.mock('../src/repository/redisRepository', () => () => ({
  delete: (key) => null,
}));

describe('Update book, when the new book title is already exist.', () => {
  test('Should throw error.', async () => {
    try {
      //Act
      const res = await resolvers.Mutation.updateBook(null, { _id: bookId, input: book });
    } catch (e) {
      //Assert
      expect(e.message).toEqual('This book title alreasy exist.');
    }
  });
});
