const joi = require("joi");
const universalFunctions = require("../utils/universalFunctions");

const signUpSchema = async (req, res, next) => {
  try {
    const schema = joi.object({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi.string().email().required(),
      dob: joi.date().required(),
      gender: joi.string().required(),
      phoneNumber: joi
        .string()
        .regex(/^[0-9]{10}$/)
        .messages({
          "string.pattern.base": `Phone Number Must Have 10 Digits.`,
        })
        .required(),
      password: joi.string().required(),
    });

    await universalFunctions.validateRequestPayload(req.body, res, schema);

    next();
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const signInSchema = async (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });

    await universalFunctions.validateRequestPayload(req.body, res, schema);

    next();
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

module.exports = { signUpSchema, signInSchema };
