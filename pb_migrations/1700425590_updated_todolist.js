/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iv8357fhm0yk2gb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oqpgvpmr",
    "name": "dateTodo",
    "type": "date",
    "required": true,
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oqpgvpmr",
    "name": "dateTodo",
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
})
