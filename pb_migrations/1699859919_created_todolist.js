/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "iv8357fhm0yk2gb",
    "created": "2023-11-13 07:18:39.047Z",
    "updated": "2023-11-13 07:18:39.047Z",
    "name": "todolist",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8l2uaviv",
        "name": "content",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iv8357fhm0yk2gb");

  return dao.deleteCollection(collection);
})
