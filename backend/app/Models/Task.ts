import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Project from './Project'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public projectId: number

  @column()
  public status: string

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>
}
