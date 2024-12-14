import { DateTime } from 'luxon'
import { BaseModel, column, computed, hasMany } from '@adonisjs/lucid/orm'
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
  declare scoreUser: number | null

  @column()
  declare picturePath: string

  @column()
  declare description: string

  @column()
  declare urlTrailer: string

  @column.dateTime({ autoCreate: false })
  declare publishDate: DateTime | null

  @computed()
  get publishOn(){
    return this.publishDate?.toFormat("yyyy-MM-dd\'T\'HH:mm")
  }

  @computed()
  get publishOnFormat(){
    return this.publishDate?.toFormat('cccc, dd LLL yyyy HH:mm');

  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
}