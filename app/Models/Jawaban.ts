import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Soal from 'App/Models/Soal'

export default class Jawaban extends BaseModel {
  public static table = 'jawaban'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_soal: number

  @column()
  public nama_jawaban: string

  @column()
  public isi_jawaban: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Soal, {
    foreignKey: 'id_soal', // set nama kolom sebagai foreign key
  })
  public soal: BelongsTo<typeof Soal> // deklarasi relationship
}
