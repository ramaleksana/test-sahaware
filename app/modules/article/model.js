const model = require("../model");
const bcrypt = require('bcrypt');

class articel extends model {
    constructor() {
        super();
        this.table = 'public.article';
    }

    async add(data) {
        let result = await this.database.add(this.table, data);
        return result
    }

    async view(params = {}) {
        let query = `select 
        a.id,
        a.title,
        a.short_description,
        a.description,
        a.is_visible,
        a.image,
        ac.title as category,
        a.created_on,
        u."name" as created_by
        from ${this.table} a 
        join public.article_categories ac on a.category_id = ac.id 
        left join public.users u on a.created_by = u.id 
        `;

        let search = params.search || '';
        let size = params.size || 1;
        let page = params.page || 1;
        let where = `WHERE a.is_visible=true `;

        if (search) {
            where += `
            AND(a.title ILIKE '%${search}%' 
            OR a.short_description ILIKE '%${search}%' 
            OR a.description ILIKE '%${search}%' 
            OR ac.title ILIKE '%${search}%'
            )`;
        }
        query += where

        query += `ORDER BY a.created_on DESC LIMIT ${size} OFFSET ${(page - 1) * size}`;

        let result = await this.database.query(query);
        return result;

    }

}

module.exports = new articel();