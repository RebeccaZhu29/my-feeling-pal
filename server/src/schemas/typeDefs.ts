import { gql } from 'graphql-tag';

const typeDefs = gql`
  enum FeelingType {
    happy
    sad
    angry
    tired
    worried
    calm
  }

  type Feeling {
    feelingId: ID!
    feelingType: FeelingType!
    description: String!
    date: String!
  }

  type User {
    _id: ID!
    email: String
    savedFeelings: [Feeling]
    wellbeingTip: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input UpdateFeelingInput {
    feelingId: ID!
    description: String
  }

  type Tip {
    tip: String!
  }

  type FeelingsAndWellbeingResponse {
    feelings: [Feeling]
    wellbeingTip: String
  }

  type Query {
    me: User
    feelings: [Feeling]
    feelingsAndWellbeing: FeelingsAndWellbeingResponse
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!): Auth
    addFeeling(feelingType: FeelingType!): Feeling
    updateFeeling(feelingData: UpdateFeelingInput!): Feeling
    removeFeeling(feelingId: ID!): User
    generateTip(feelingType: FeelingType!): Tip!
  }
`;

export default typeDefs;
