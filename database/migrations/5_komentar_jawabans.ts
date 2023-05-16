import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'komentar_jawaban'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_jawaban').unsigned().references('id').inTable('jawaban')
      table.string('nama_komentar', 255).notNullable()
      table.string('isi_komentar', 255).notNullable()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
