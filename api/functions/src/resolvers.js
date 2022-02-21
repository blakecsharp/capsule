const admin = require("firebase-admin");

const QueryUser = require("./queries/Users.js");
const GetItem = require("./queries/Items");

const MutationUser = require("./mutations/User.js");

const Capsule = require("./mutations/Capsule.js");

module.exports = {
  Query: {
    GetUser: QueryUser.GetUser,
    GetItem,
  },
  Mutation: {
    AddUser: MutationUser.AddUser,
    CreateCapsule: Capsule.CreateCapsule,
  },
};
