const { gql } = require('apollo-server-express')

const typeDefs = gql`
  directive @isAdmin on FIELD_DEFINITION

  type User {
    id: Int!
    username: String!
    email: String!
    isAdmin: Boolean!
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    allUsers: [User]! @isAdmin
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
