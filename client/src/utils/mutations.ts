import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FEELING = gql`
  mutation addFeeling($feelingType: FeelingType!) {
    addFeeling(feelingType: $feelingType) {
      _id
      username
    }
  }
`;

export const UPDATE_FEELING = gql`
  mutation updateFeeling($feelingData: UpdateFeelingInput!) {
    updateFeeling(feelingData: $feelingData) {
      _id
      username
    }
  }
`;

export const REMOVE_FEELING = gql`
  mutation removeFeeling($feelingId: ID!) {
    removeFeeling(feelingId: $feelingId) {
      _id
      username
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

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
