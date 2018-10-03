const { User, Post } = require('../models')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

const resolvers = {
  Query: {
    async allUsers (root, args, { user }) {
      return User.all()
    },

    async post (root, { id }, { user }) {
      return Post.findById(id)
    }
  },

  Mutation: {
    async signup (root, { username, email, password }) {
      const user = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
        is_admin: 0
      })

      return jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email,
          is_admin: user.is_admin
        },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      )
    },

    async login (root, { email, password }) {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      return jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email,
          is_admin: user.is_admin
        },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      )
    },

    async createPost (root, { title, content }, { user }) {
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      return Post.create({
        user_id: user.id,
        title,
        content
      })
    },

    async editPost (root, { id, title, content }, { user }) {
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      const post = await Post.findById(id)

      if (!post) {
        throw new Error('No post found')
      }

      if (user.id !== post.user_id) {
        throw new Error('You can only edit the posts you created!')
      }

      await post.update({ title, content })

      return post
    }
  },

  Post: {
    async author (post) {
      return User.findById(post.user_id)
    }
  }
}

module.exports = resolvers
