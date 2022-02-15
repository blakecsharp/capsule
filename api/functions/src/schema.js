const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    GetUser(id: String): User
    GetItem(id: String): Item
  }

  type Mutation {
    AddUser(
      id: String
      firstName: String
      lastName: String
      email: String
    ): Response
  }

  type User {
    id: String
    firstName: String
    lastName: String
  }

  type Item {
    uploadedBy: String # should be an id
    dateUploaded: String
    location: String
    title: String
    memories: [Memory]
    photos: [String] # should be URL links to firebase
  }

  type Memory {
    addedBy: String # should be id
    text: String
    media: [String]
    typeOfMemory: String # change to memorytype
  }

  type Response {
    success: String
    error: String
  }
`;

module.exports = typeDefs;
