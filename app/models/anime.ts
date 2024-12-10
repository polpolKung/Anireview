import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'

export default class Anime extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nameEN: string

  @column()
  declare nameTH: string

  @column()
  declare reviewNoSpoiler: string

  @column()
  declare reviewSpoiler: string

  @column()
  declare scoreAdmin: number

  @column()
  declare scoreUser: number

  @column()
  declare picturePath: string

  @column()
  declare description: string

  @column()
  declare urlTrailer: string

  @column.dateTime({ autoCreate: false })
  declare publishDate: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
}