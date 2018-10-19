const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ hello: [], user: { name: '' } })
  .write();
//

// // Add a post
// db.get('history')
//   .push({ id: 1, title: 'lowdb is awesome' })
//   .write();
//
// // Set a user using Lodash shorthand syntax
// db.set('user.name', 'typicode')
//   .write();
//
// // Increment count
// db.update('currentState', n => n + 1)
//   .write();
//
// const value = db.get('currentState').value();
//

const setName = (name) => {
  db.set('user.name', name)
    .write();
};

module.exports = {
  setName,
};

