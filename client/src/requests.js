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
        id
        title
        items {
          photos
        }
      }
    }
  }
`;

export const GET_CAPSULE = gql`
  query GetCapsule($capsuleId: String) {
    response: GetCapsule(capsuleId: $capsuleId) {
      id
      uploadedBy
      date
      location
      title
      memories {
        addedBy
        text
        audio
        typeOfMemory
      }
      photos
      capsuleId
      mementoType
    }
  }
`;

export const GET_ITEM = gql`
  query GetItem($itemId: String) {
    response: GetItem(itemId: $itemId) {
      id
      uploadedBy
      date
      location
      title
      memories {
        addedBy
        text
        audio
        typeOfMemory
      }
      photos
      capsuleId
      mementoType
    }
  }
`;

export const ADD_ITEM = gql`
  mutation AddItem(
    $uploadedBy: String
    $location: String
    $title: String
    $mementoType: String
    $date: String
    $textMemories: [String]
    $images: [String]
    $audio: [String]
    $capsuleId: String
  ) {
    AddItem(
      uploadedBy: $uploadedBy
      location: $location
      title: $title
      mementoType: $mementoType
      date: $date
      textMemories: $textMemories
      images: $images
      audio: $audio
      capsuleId: $capsuleId
    ) {
      success
      error
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($itemId: String) {
    DeleteItem(itemId: $itemId) {
      success
      error
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

export const JOIN_CAPSULE = gql`
  mutation JoinCapsule($userId: String, $capsuleId: String) {
    JoinCapsule(userId: $userId, capsuleId: $capsuleId) {
      success
      error
    }
  }
`;
