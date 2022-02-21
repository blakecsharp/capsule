import gql from "graphql-tag";

export const GET_COLLECTION = gql`
  query GetCollection($userId: String) {
    resposne: GetCollection(userId: $userId) {
      item {
        uploadedBy
        dateUploaded
        location
        title
        memories
        photos
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: String) {
    response: GetUser(userId: $userId) {
      id
      firstName
      lastName
      capsules {
        title
        items {
          photos
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser(
    $id: String
    $firstName: String
    $lastName: String
    $email: String
  ) {
    AddUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      success
      error
    }
  }
`;

export const CREATE_CAPSULE = gql`
  mutation CreateCapsule($createdById: String, $title: String) {
    CreateCapsule(createdById: $createdById, title: $title) {
      success
      error
    }
  }
`;
