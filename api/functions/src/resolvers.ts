// queries
const { getUser } = require("./queries/Users");

module.exports = {
  Query: {
    getUser: getUser,
  },
  Mutation: {},
};
