import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'anime'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name_en', 255).notNullable()
      table.string('name_th', 255).notNullable()
      table.text('review_no_spoiler').notNullable()
      table.text('review_spoiler').notNullable()
      table.decimal('score_admin').notNullable().defaultTo(0)
      table.decimal('score_user').nullable()
      table.string('description', 255).nullable()
      table.string('url_trailer', 255).nullable()
      table.string('picture_path',255).notNullable()
      table.timestamp('publish_date').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}