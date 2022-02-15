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

export const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;
