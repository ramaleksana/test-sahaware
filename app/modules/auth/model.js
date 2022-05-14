const model = require("../model");
const bcrypt = require('bcrypt');
const salt_round = 10;

class AuthModel extends model {
    constructor() {
        super();
        this.table = 'public.users';
    }

    async view() {
        let result = await this.database.query("select * from users");
        return result;
    }

    async checkEmail(email) {
        let result = await this.database.row(`SELECT * FROM ${this.table} WHERE email='${email}'`)
        return result;
    }

    async register(data) {
        data.password = await bcrypt.hash(data.password, salt_round);
        let result = await this.database.add(this.table, data);
        return result;
    }

    async login(data) {
        let result = await this.checkEmail(data.email);
        if (result) {
            let checkPassword = await bcrypt.compare(data.password, result.password);
            if (checkPassword) {
                return {
                    code: 1,
                    message: 'Login Success',
                    data: result
                }
            } else {
                return {
                    code: 0,
                    message: 'Wrong password',
                    data: null
                }
            }
        } else {
            return {
                code: 0,
                message: 'user not registered',
                data: null
            }
        }
    }

}

module.exports = new AuthModel();