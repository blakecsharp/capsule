// queries

const GetUser = require("./queries/Users");
const GetItem = require("./queries/Items");

const AddUser = require("./mutations/User");

module.exports = {
  Query: {
    GetUser,
    GetItem,
  },
  Mutation: {
    AddUser,
  },
};
