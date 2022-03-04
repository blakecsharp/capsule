const QueryUser = require("./queries/Users.js");
const QueryItem = require("./queries/Items");
const QueryCapsule = require("./queries/Capsule");

const MutationUser = require("./mutations/User.js");
const Capsule = require("./mutations/Capsule.js");
const Item = require("./mutations/Item.js");

module.exports = {
  Query: {
    GetUser: QueryUser.GetUser,
    GetCapsule: QueryCapsule.GetCapsule,
    GetItem: QueryItem.GetItem,
  },
  Mutation: {
    AddUser: MutationUser.AddUser,
    CreateCapsule: Capsule.CreateCapsule,
    AddItem: Item.AddItem,
    DeleteItem: Item.DeleteItem,
    JoinCapsule: Capsule.JoinCapsule,
  },
};
