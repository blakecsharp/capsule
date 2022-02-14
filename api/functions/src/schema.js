const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    GetUser(id: String): User
  }

  type User {
    id: String
    firstName: String
    lastName: String
  }
`;

module.exports = typeDefs;
