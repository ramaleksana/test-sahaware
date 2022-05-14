const Joi = require('joi');
const model = require('./model');


exports.validationFieldRegister = Joi.object({
    name: Joi.string().min(8).max(50).required(),
    password: Joi.string().max(10).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string().min(10).max(15)
})

exports.validationFieldLogin = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().max(10).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

exports.validationEmail = async (email) => {
    let result = await model.checkEmail(email);
    return result;
}