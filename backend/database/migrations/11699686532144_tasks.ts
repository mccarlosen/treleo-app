import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE')
      table.string('status', 15).defaultTo('Pendiente').comment('Pendiente, En progreso, Completado')
      table.string('title', 150).notNullable()
      table.string('description', 300).nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
