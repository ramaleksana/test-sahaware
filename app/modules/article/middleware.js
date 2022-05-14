const Joi = require('joi');

exports.validationField = Joi.object({
    title: Joi.string().max(100).required(),
    short_description: Joi.string().max(255).required(),
    description: Joi.string().required(),
    category_id: Joi.string().required(),
    is_visible: Joi.bool(),
});