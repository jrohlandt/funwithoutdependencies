'use strict';
import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync(':memory:');

database.exec(`
    CREATE TABLE users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      birthday INTEGER
    ) STRICT
  `);

  
const createUser = database.prepare('INSERT INTO users (firstName, lastName, birthday) VALUES (?, ?, ?)');
createUser.run('John', 'Doe');
createUser.run('Bob', 'Doe', new Date('1931-02-12 00:00:00').getTime());
createUser.run('Jan', 'Doe');
createUser.run('Cat', 'Doe');

const getUsers = database.prepare('SELECT * FROM users ORDER BY id');
const users = getUsers.all();

console.log(users);

const newUsers = users.map(u => {
  const user = {...u};
  if (u.birthday) {
    user.birthday = new Date(u.birthday);
  }
  return user;
});

console.log(newUsers);
