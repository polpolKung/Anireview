import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'anime'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('description', 255).nullable()
      table.string('url_trailer', 255).nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('description')
      table.dropColumn('url_trailer')
    })
  }
}