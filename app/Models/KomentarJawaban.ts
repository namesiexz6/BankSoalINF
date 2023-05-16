import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Jawaban from 'App/Models/Jawaban'

export default class KomentarJawaban extends BaseModel {
  public static table = 'komentar_jawaban'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_jawaban: number

  @column()
  public nama_komentar: string

  @column()
  public isi_komentar: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Jawaban, {
    foreignKey: 'id_jawaban', // set nama kolom sebagai foreign key
  })
  public jawaban: BelongsTo<typeof Jawaban> // deklarasi relationship
}
