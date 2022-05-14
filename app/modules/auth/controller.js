const Controllers = require("../controllers");
const model = require('./model');
const { validationEmail, validationFieldRegister, validationFieldLogin } = require('./middleware');
const { signAuth } = require("../../helpers/auth");

class AuthController extends Controllers {
    constructor() {
        super();
    }

    index = async (req, res) => {
        console.log(this);
        let result = await model.view();
        res.send(this.response(
            200,
            'Success',
            result
        ))
    }

    login = async (req, res) => {

        try {
            let validation = validationFieldLogin.validate(req.body);
            let checkUser = await model.login(req.body);
            let response = {}
            if (validation.error) {
                res.status(422).json(
                    this.response.ErrorValidation(validation.error)
                );
            } else if (checkUser.code === 0) {
                response = this.response.Response(401, checkUser.message, null);
            } else {
                let data = checkUser.data;
                delete data.password;
                delete data.created_on;

                let token = await signAuth(data);
                data.token = token;
                response = this.response.Response(200, checkUser.message, checkUser.data);
            }
            res.status(response.status).json(response);
        } catch (e) {
            res.status(500).json(
                this.response.Response(500, 'Internal Server Error', null)
            )
        }
    }

    register = async (req, res) => {
        try {
            let validation = validationFieldRegister.validate(req.body);
            let checkEmail = await validationEmail(req.body.email);

            if (validation.error) {
                res.status(422).json(
                    this.response.ErrorValidation(validation.error)
                );
            } else if (checkEmail) {
                res.status(422).json(
                    this.response.Response(422, 'Error Validation', 'Email has been used!')
                )
            } else {
                model.register(req.body);
                res.status(201).json(
                    this.response.Response(201, 'Success', null)
                );
            }
        } catch (e) {
            res.status(500).json(
                this.response.Response(500, 'Internal Server Error', null)
            )
        }
    }
}

module.exports = new AuthController()