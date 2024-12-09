import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'anime'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('name')
      table.string('name_en', 255).notNullable()
      table.string('name_th', 255).notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name', 255).notNullable()
      table.dropColumn('name_en')
      table.dropColumn('name_th')
    })
  }
}