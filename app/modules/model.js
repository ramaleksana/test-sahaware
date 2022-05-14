const database = require("../helpers/database");
const db = require("../config/database");

class model {
    constructor() {
        this.database = new database(db);
    }
}

module.exports = model;