import { resolvers } from './../src/graphql/resolvers';

//Arrange
const book = {
  title: 'testMock',
  author: 'testMock',
  pages: 1,
  status: 'AVAILABLE',
};

const bookId = '61c354841740e6134f3f88be';

jest.mock('../src/repository/mongoRepository', () => () => ({
  findById: (data) => book,
  delete: (data) => book,
}));

jest.mock('../src/repository/redisRepository', () => () => ({
  set: (key, data) => null,
  get: (key) => null,
  delete: (key) => null,
}));

describe('Delete book with valid input', () => {
  test('Should throw a error.', async () => {
    //Act
    const res = await resolvers.Mutation.deleteBook(null, { _id: bookId });

    //Assert
    expect(res.title).toEqual(book.title);
    expect(res.author).toEqual(book.author);
    expect(res.pages).toEqual(book.pages);
    expect(res.status).toEqual(book.status);
  });
});
