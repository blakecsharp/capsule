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
    AddItem(
      uploadedBy: String
      location: String
      title: String
      mementoType: String
      date: String
      textMemories: [String]
      images: [String]
      audio: [String]
      capsuleId: String
    ): Response
  }

  type User {
    id: String
    firstName: String
    lastName: String
    capsules: [Capsule]
  }

  type Item {
    uploadedBy: String # should be an id
    date: String
    location: String
    title: String
    memories: [Memory]
    photos: [String] # should be URL links to firebase
    capsuleId: String
    mementoType: String
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
    audio: String
    typeOfMemory: String # change to memorytype
  }

  type Response {
    success: String
    error: String
  }
`;

module.exports = typeDefs;
