const model = require("../model");
const bcrypt = require('bcrypt');

class articelCategory extends model {
    constructor() {
        super();
        this.table = 'public.article_categories';
    }

    async add(data) {
        let check = await this.checkTitle(data.title);
        if (check) {
            return {
                code: 0,
                message: 'Title already exists',
            }
        } else {
            let result = await this.database.add(this.table, data);
            return {
                code: 1,
                message: 'Created successfully'
            }
        }
    }

    async view(id = '') {
        let query = `SELECT 
        ac.id,
        ac.title,
        ac.created_on,
        u.name AS created_by
        FROM ${this.table} ac
        LEFT JOIN public.users u ON ac.created_by = u.id
        `;

        if (id !== '') {
            query += ` WHERE ac.id = '${id}'`
            let result = await this.database.row(query);
            return result;
        } else {
            let result = await this.database.query(query);
            return result;
        }

    }

    async checkTitle(title) {
        let check = await this.database.row(`SELECT title FROM ${this.table} WHERE lower(title)=lower('${title}')`);
        return check;
    }
}

module.exports = new articelCategory();