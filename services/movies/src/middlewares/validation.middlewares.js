const joi = require("joi");

const validator = (schema) => (req, res, next) => {
  const validationValue = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
    convert: false,
    skipFunctions: true,
  });
  if (validationValue.error) {
    const errorMessages = validationValue.error.details.map(
      (error) => error.message
    );

    return res.status(422).json({
      IsSuccess: false,
      message: "validation error",
      error: errorMessages,
    });
  }

  return next();
};

const createMoviesValidation = joi.object({
  title: joi
    .string()
    .label("movie title")
    .description("This holds the movie title")
    .required(),
});

module.exports = {
  validator,
  createMoviesValidation,
};
