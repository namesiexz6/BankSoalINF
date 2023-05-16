import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'

export default class User extends BaseModel {
 public static table = 'user'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nama: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
    static id: any

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)

    }
    
  }
}
