import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import Anime from './anime.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare animeId: number

  @column()
  declare userId: number

  @column()
  declare comment: string

  @column()
  declare score: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @computed()
  get postedOn(){
    return this.createdAt.toFormat("dd LLL yyyy")
  }

  @belongsTo(() => Anime)
  declare anime: BelongsTo<typeof Anime>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}