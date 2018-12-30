'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  async up () {
    const exists = await this.hasTable('users')
    if(!exists) {
      this.create('users', (table) => {
        table.increments()
        table.string('first_name', 30).notNullable()
        table.string('last_name', 30).notNullable()
        table.string('email', 190).notNullable().unique()
        table.string('password', 60).notNullable()
        table.string('sex', 20).notNullable()
        table.string('confirmation_token')
        table.boolean('is_active').default(0)
        table.timestamps()
      })
    }
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
