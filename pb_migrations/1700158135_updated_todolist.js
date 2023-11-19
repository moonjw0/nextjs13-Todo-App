/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iv8357fhm0yk2gb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ebazdxcp",
    "name": "completed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iv8357fhm0yk2gb")

  // remove
  collection.schema.removeField("ebazdxcp")

  return dao.saveCollection(collection)
})
