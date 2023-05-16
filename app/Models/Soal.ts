import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Soal extends BaseModel {
  public static table = 'soal'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nama: String

  @column()
  public id_mk: string

  @column()
  public nama_soal: string

  @column()
  public isi_soal: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
