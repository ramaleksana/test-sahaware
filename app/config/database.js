const pgp = require("pg-promise")({});
let connectionString = "postgres://postgres:aku@localhost:5432/db_article";
let db = pgp(connectionString);

if (!db) {
    console.log({ message: 'Failed Connect, cek your connection' });
} else {
    console.log({ message: 'database Connected' });
}

module.exports = db;