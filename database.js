// const sqlite3 = require('sqlite3').verbose();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        const dbPath = path.resolve(__dirname, 'database.db');
        console.log(__dirname)
        console.log(dbPath)
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados', err);
            } else {
                console.log('Conectado ao banco de dados SQLite');
            }
        });
    }



}
module.exports = new Database().db;