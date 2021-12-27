const { makeExecutableSchema } = require('graphql-tools');
const { resolvers } = require('./resolvers');

// Construct a schema, using GraphQL schema language
const typeDefs = `

    type Query {
        hello: String
        greet(name: String!): String
        tasks: [Task]
        Books: [Book] 
        bookDetails( _id: ID): Book
    }

    type Task {
        _id: ID
        title: String!
        description: String!
        number: Int
    }

    type Book {
        _id: ID
        title: String!
        author: String!
        pages: Int!
        status: String!
    }

    type Mutation {
        createTask(input: TaskInput): Task
        createBook(input: BookInput): Book
        deleteBook( _id: ID): Book
        updateBook( _id: ID, input: BookInput): Book
    }

    input TaskInput {
        title: String!
        description: String!
        number: Int
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
