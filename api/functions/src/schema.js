const { gql } = require("apollo-server-cloud-functions");

const typeDefs = gql`
  type Query {
    GetUser(userId: String): User
    GetItem(id: String): Item
    GetCollection(userId: String): [Item]
  }

  type Mutation {
    AddUser(
      id: String
      firstName: String
      lastName: String
      email: String
    ): Response
    CreateCapsule(createdById: String, title: String): Response
  }

  type User {
    id: String
    firstName: String
    lastName: String
    capsules: [Capsule]
  }

  type Item {
    uploadedBy: String # should be an id
    dateUploaded: String
    location: String
    title: String
    memories: [Memory]
    photos: [String] # should be URL links to firebase
    capsuleId: String
  }

  type Capsule {
    createdBy: String
    id: String
    title: String
    items: [Item]
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
