import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
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
`;


export const QUERY_FEELINGS = gql`
  {
    feelings {
      feelingId
      feelingType
      description
      date
    }
  }
`;
