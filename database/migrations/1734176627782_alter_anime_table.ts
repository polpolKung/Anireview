import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'anime'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('score_user').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('score_user').notNullable().defaultTo(0)
    })
  }
}