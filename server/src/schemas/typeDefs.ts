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
    wellbeingTip: String!
    date: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String
    savedFeelings: [Feeling]
  }

  type Auth {
    token: ID!
    user: User
  }

  input FeelingInput {
    feelingType: FeelingType!
    description: String!
    date: String!
  }

  input UpdateFeelingInput {
    feelingId: ID!
    feelingType: FeelingType
    description: String
  }

  type Query {
    me: User
    feelings: [Feeling]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveFeeling(feelingData: FeelingInput!): User
    updateFeeling(feelingData: UpdateFeelingInput!): User
    removeFeeling(feelingId: ID!): User
  }
`;

export default typeDefs;
