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
  find: (data) => [],
  update: (id, data) => book,
}));

jest.mock('../src/repository/redisRepository', () => () => ({
  delete: (key) => null,
}));

describe('Update book with valid input.', () => {
  test('Should return the update book and save on database.', async () => {
    //Act
    const res = await resolvers.Mutation.updateBook(null, { _id: bookId, input: book });
    //Assert
    expect(res.title).toEqual(book.title);
    expect(res.author).toEqual(book.author);
    expect(res.pages).toEqual(book.pages);
    expect(res.status).toEqual(book.status);
  });
});
