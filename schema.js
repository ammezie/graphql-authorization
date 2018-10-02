'use strict'

const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    isAdmin: Boolean!
  }

  type Post {
    id: Int!
    user: User!
    title: String!
    content: String!
  }

  type Query {
    allUsers: [User]!
    post(id: Int!): Post
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
    createPost(title: String!, content: String!): Post
    editPost(id: Int!, title: String, content: String): Post
  }
`

module.exports = typeDefs
