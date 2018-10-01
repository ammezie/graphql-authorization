'use strict'

const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup (username: String!, email: String!, password: String!): User
    login (email: String!, password: String!): String
  }
`

module.exports = typeDefs
