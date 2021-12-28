const { makeExecutableSchema } = require('graphql-tools');
const { resolvers } = require('./resolvers');

// Construct a schema, using GraphQL schema language
const typeDefs = `

    type Query {
        Books: [Book] 
        bookDetails( _id: ID): Book
    }

    type Book {
        _id: ID
        title: String!
        author: String!
        pages: Int!
        status: String!
    }

    type Mutation {
        createBook(input: BookInput): Book
        deleteBook( _id: ID): Book
        updateBook( _id: ID, input: BookInput): Book
    }
    
    input BookInput {
        title: String!
        author: String!
        pages: Int!
        status: String!
    }

`;

const myschema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

module.exports = { myschema };
