'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PasswordResetSchema extends Schema {
  async up () {
    const exists = await this.hasTable('password_resets')
    if(!exists) {
      this.create('password_resets', (table) => {
        table.increments()
        table.string('email')
        table.string('token')
        table.timestamps()
      })
    }
  }

  down () {
    this.drop('password_resets')
  }
}

module.exports = PasswordResetSchema
