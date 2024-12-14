import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('score').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('score').notNullable().defaultTo(0)
    })
  }
}