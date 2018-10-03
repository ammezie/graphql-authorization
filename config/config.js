'use strict'

require('dotenv').config()

const dbDetails = {
  dialect: 'sqlite',
  storage: './database.sqlite3'
}

module.exports = {
  development: dbDetails,
  production: dbDetails
}
