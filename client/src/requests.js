import gql from "graphql-tag";

export const GET_USER = gql`
  query getUser($userId: String!) {
    response: getUser(userId: $String) {
      id
      firstName
      lastName
    }
  }
`;
