const Controllers = require("../controllers");
const model = require('./model');
const { validationField } = require('./middleware');

class articleCatrgory extends Controllers {
    constructor() {
        super();
    }

    create = async (req, res) => {
        let dataUser = req.decoded;

        try {
            let validation = validationField.validate(req.body);
            if (validation.error) {
                res.status(422).json(
                    this.response.ErrorValidation(validation.error)
                );
            } else {
                let response = {}
                let result = await model.add({
                    ...req.body,
                    created_by: dataUser.id
                });

                if (result.code === 0) {
                    response = this.response.Response(442, result.message, null);
                } else {
                    response = this.response.Response(201, result.message, null);
                }

                res.status(response.status).json(response);
            }
        } catch (e) {
            res.status(500).json(
                this.response.Response(500, 'Internal Server Error', null)
            )
        }
    }

    view = async (req, res) => {
        try {
            let data = await model.view();
            res.status(200).json(
                this.response.Response(200, 'Get Success', data)
            )
        } catch (e) {
            res.status(500).json(
                this.response.Response(500, 'Internal Server Error', null)
            )
        }
    }

    getById = async (req, res) => {
        try {
            let data = await model.view(req.params.id);
            if (data) {
                res.status(200).json(
                    this.response.Response(200, 'Get Success', data)
                )
            } else {
                res.status(404).json(
                    this.response.Response(404, 'Category not found', null)
                )
            }
        } catch (e) {
            res.status(500).json(
                this.response.Response(500, 'Internal Server Error', null)
            )
        }
    }

}

module.exports = new articleCatrgory();