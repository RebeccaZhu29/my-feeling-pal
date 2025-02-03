import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query getMe {
    me {
      _id
      username
      email
      savedFeelings {
        feelingId
        feelingType
        description
        date
      }
      wellnessTips
    }
  }
`;


export const QUERY_FEELINGS = gql`
  query getFeelings {
    feelings {
      feelingId
      feelingType
      description
      date
    }
  }
`;
