import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query getMe {
    me {
      _id
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

export const QUERY_FEELINGS_AND_WELLBEING = gql`
  query getFeelingsAndWellbeing {
    feelingsAndWellbeing {
      feelings {
        feelingId
        feelingType
        description
        date
      }
      wellbeingTip
    }
  }
`;