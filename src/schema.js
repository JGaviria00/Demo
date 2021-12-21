const { makeExecutableSchema } = require("graphql-tools")
const { resolvers } = require("./resolvers")
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const typeDefs = `

    type Query {
        hello: String
        greet(name: String!): String
        tasks: [Task]
    }

    type Task {
        _id: ID
        title: String!
        description: String!
        number: Int
    }

`;

const myschema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});

module.exports = { myschema };