import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Matakuliah extends BaseModel {
  public static table = 'matakuliah'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_semester: number

  @column()
  public kode: string

  @column()
  public nama: string

  @column()
  public sks: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
