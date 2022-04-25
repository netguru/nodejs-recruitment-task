// Validation 
const Joi = require("@hapi/joi");
// Register Validation Schema
const registerValidation = (data) => {
    const schema = Joi.object({
        id: Joi.number().min(2).required(),
        role: Joi.string().min(2).required(),
        name: Joi.string().min(3).required(),
        username: Joi.string().min(3).required(),
        password: Joi.string().min(3).required(),
    });
//    return Joi.validate(data, schema);
    return schema.validate(data);

};


// LogIN Validation Schema
const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(3).required(),
    });
      // Let's validate a user 
//   const { error } = schema.validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//    return Joi.validate(data, schema);
    return schema.validate(data);

};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

