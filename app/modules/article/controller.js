const Controllers = require("../controllers");
const model = require('./model');
const modelCategory = require('../articleCategory/model');
const { validationField } = require('./middleware');

class Article extends Controllers {
    constructor() {
        super();
    }

    view = async (req, res) => {
        let data = await model.view(req.query);
        res.send(data);
    }

    create = async (req, res) => {
        try {
            let dataUser = req.decoded;

            let validation = validationField.validate(req.body);
            let checkCategory = await modelCategory.view(req.body.category_id);
            if (validation.error) {
                res.status(422).json(
                    this.response.ErrorValidation(validation.error)
                );
            } else if (!checkCategory) {
                res.status(400).json(
                    this.response.Response(400, 'Article Category Not Found', null)
                )
            } else {

                let data = {
                    ...req.body,
                    created_by: dataUser.id
                }

                if (req.file) {
                    data.image = req.file.filename
                }

                let result = await model.add(data);
                let response = {};
                if (result) {
                    response = this.response.Response(201, 'Created successfully', null)
                } else {
                    response = this.response.Response(400, 'Failed', null)
                }

                res.status(response.status).json(response);
            }

        } catch (e) {
            res.status(500).json(
                this.response.Response(500, 'Internal Server Error', null)
            )
        }
    }
}

module.exports = new Article();