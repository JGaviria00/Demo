import { resolvers } from './../src/graphql/resolvers';

//Arrange
const book = {
  title: 'testMock',
  status: 'AVAILABLE',
};
const bookId = '61c92870e8d08e0013eb32f4';

const book2 = {
  _id: '61c92870e8d08e0013eb32f4',
  title: 'testMock',
  author: 'check',
  pages: 10,
  status: 'LENT',
};

jest.mock('../src/repository/MongoRepository', () => () => ({
  find: (data) => [book2],
  update: (id, data) => book,
}));

jest.mock('../src/repository/RedisRepository', () => () => ({
  delete: (key) => null,
}));

describe('Update book, when the new book title is the same that before.', () => {
  test('Should return update book.', async () => {
    //Act
    const res = await resolvers.Mutation.updateBook(null, { _id: bookId, input: book });
    //Assert
    expect(res.title).toEqual(book.title);
    expect(res.status !== book2.status).toBe(true);
  });
});
