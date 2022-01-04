const Low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('api/src/db/db.json')
const db = new Low(adapter)

const createPetModel = require('./pet')
const createUserModel = require('./user')

module.exports = {
  models: {
    Pet: createPetModel(db),
    User: createUserModel(db),
  },
  db
}
