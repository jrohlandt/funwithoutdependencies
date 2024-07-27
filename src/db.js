'use strict';
import {DatabaseSync} from 'node:sqlite';

class DB {
    constructor() {
        this.db = new DatabaseSync(':memory:');
    }

    migrate() {
        this.db.exec(`
            CREATE TABLE users(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              firstName TEXT,
              lastName TEXT,
              birthday INTEGER
            ) STRICT
        `);
    }

    seed() {
        this.createUser({
            firstName: 'Jane', 
            lastName: 'Doe', 
            birthday: new Date('1920-05-21 00:00:00').getTime()
        });
        this.createUser({
            firstName: 'Joe', 
            lastName: 'Doe', 
            birthday: new Date('1931-02-12 00:00:00').getTime()
        });
        this.createUser({
            firstName: 'Bob', 
            lastName: 'Doe', 
            birthday: 0
        });
    }

    createUser(user) {
        const createUser = this.db.prepare(`
            INSERT INTO users 
            (firstName, lastName, birthday) 
            VALUES (?, ?, ?)
        `);
        createUser.run(user.firstName, user.lastName, user.birthday);
        // TODO return user 
    }

    updateUser(user) {
        const query = this.db.prepare(`
            UPDATE users 
            SET firstName = ?, lastName = ?, birthday = ? 
            WHERE id = ?
        `);
        query.run(user.firstName, user.lastName, user.birthday, user.id)
        console.log('UPDATE USER: ', query.expandedSQL());
        
    }

    findUserById(id) {
        const query = this.db.prepare('SELECT * FROM users WHERE id = ?');
        const result = query.get(id);
        if (!result.id) return null;
        return result;
    }

    findAllUsers() {
        const query = this.db.prepare('SELECT * FROM users ORDER BY id');
        return query.all();
    }
}

export default new DB();