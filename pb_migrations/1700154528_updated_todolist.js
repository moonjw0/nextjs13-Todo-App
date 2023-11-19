/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iv8357fhm0yk2gb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qlka6pec",
    "name": "DateTodo",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iv8357fhm0yk2gb")

  // remove
  collection.schema.removeField("qlka6pec")

  return dao.saveCollection(collection)
})
