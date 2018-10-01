'use strict'

const { User } = require('./models')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

const resolvers = {
  Query: {
    async me (root, args, { user }) {
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      return await User.findById(user.id)
    },

    async allUsers (root, args, { user }) {
      return await User.all()
    }
  },

  Mutation: {
    async signup (root, { username, email, password }) {
      const user = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10)
      })

      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
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
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      )
    }
  }
}

module.exports = resolvers
