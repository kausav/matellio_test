const joi = require("joi");
const universalFunctions = require("../utils/universalFunctions");

const createUserAddressesSchema = async (req, res, next) => {
  try {
    const schema = joi.object({
      addresses: joi
        .array()
        .items(
          joi.object().keys({
            streetAddress: joi.string().required(),
            city: joi.string().required(),
            state: joi.string().required(),
            postalCode: joi.string().required(),
            country: joi.string().required(),
          })
        )
        .min(1)
        .required(),
    });

    await universalFunctions.validateRequestPayload(req.body, res, schema);

    next();
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const deleteAddressSchema = async (req, res, next) => {
  try {
    const schema = joi.object({
      id: joi.string().required(),
    });

    await universalFunctions.validateRequestPayload(req.body, res, schema);

    next();
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

module.exports = {
  createUserAddressesSchema,
  deleteAddressSchema,
};
