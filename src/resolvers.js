const { tasks } = require("./sample")

const resolvers = {
    Query: {
        hello: () => {
            return "Hello world";
        },
        greet: (roots, { name }) => {
            console.log(2+2)
            return ` hello ${name}`
        },
        tasks: () => {
            return tasks
        }
    }
};

module.exports = { resolvers };