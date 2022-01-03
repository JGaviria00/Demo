import { resolvers } from './../src/graphql/resolvers';

//Arrange
const book = {
  title: 'testMock',
  author: 'testMock',
  pages: 1,
  status: 'AVAILABLE',
};

jest.mock('../src/repository/mongoRepository', () => () => ({
  create: (data) => book,
  find: (data) => [],
  constructor: () => [],
}));

jest.mock('../src/repository/redisRepository', () => () => ({
  set: (key, data) => null,
  get: (key) => null,
}));

describe('Create book with valid input.', () => {
  test('Should return the new book and save on database.', async () => {
    //Act
    const res = await resolvers.Mutation.createBook(null, { input: book });
    //Assert
    expect(res.title).toEqual(book.title);
    expect(res.author).toEqual(book.author);
    expect(res.pages).toEqual(book.pages);
    expect(res.status).toEqual(book.status);
  });
});
