const { SchemaDirectiveVisitor } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

class IsAdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async function (...args) {
      // extract user from context
      const { user } = args[2]

      if (!user) {
        throw new Error('You are not authenticated!')
      }

      if (!user.is_admin) {
        throw new Error('This is above your pay grade!')
      }

      return resolve.apply(this, args)
    }
  }
}

module.exports = IsAdminDirective
