import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_FEELING = gql`
  mutation addFeeling($feelingType: FeelingType!) {
    addFeeling(feelingType: $feelingType) {
      feelingId
      feelingType
      description
      date
    }
  }
`;

export const UPDATE_FEELING = gql`
  mutation updateFeeling($feelingData: UpdateFeelingInput!) {
    updateFeeling(feelingData: $feelingData) {
      feelingId
      feelingType
      description
      date
    }
  }
`;

export const REMOVE_FEELING = gql`
  mutation removeFeeling($feelingId: ID!) {
    removeFeeling(feelingId: $feelingId) {
      _id
      email
    }
  }
`;

export const GENERATE_TIP = gql`
  mutation generateTip($feelingType: FeelingType!) {
    generateTip(feelingType: $feelingType) {
      tip
    }
  }
`;
