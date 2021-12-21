const { tasks } = require('./sample');

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello world';
    },
    greet: (roots, { name }) => {
      return ` hello ${name}`;
    },
    tasks: () => {
      return tasks;
    },
  },
};

module.exports = { resolvers };
