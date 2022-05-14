const Joi = require('joi');

exports.validationField = Joi.object({
    title: Joi.string().max(20).required(),
});