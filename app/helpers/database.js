class database {
    constructor(database) {
        this.db = database
    }

    async query(sql = "") {
        try {
            let result = await this.db.any(sql);
            return result
        } catch (e) {
            // console.log(e);
            return false;
        }
    }

    async row(sql = "") {
        try {
            let result = await this.db.oneOrNone(sql);
            return result
        } catch (e) {
            // console.log(e);
            return false;
        }
    }

    async add(table = "", data = {}) {
        try {
            let query = `INSERT INTO ${table} (`;
            query += Object.keys(data).reduce((result, item, index) => {
                result += `${index !== 0 ? ', ' : ''}${item}`
                return result;
            }, '') + ') VALUES (';

            query += Object.keys(data).reduce((result, item, index) => {
                result += `${index !== 0 ? ', ' : ''}${typeof data[item] === 'number' ? `${data[item]}` : `'${data[item]}'`}`;
                return result;
            }, '') + ') RETURNING *';

            let result = await this.db.one(query);

            return result;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = database