const universalFunctions = require("../utils/universalFunctions");
const responseMessages = require("../resources/response.json");
const models = require("../models");
const Boom = require("boom");

const createUserAddresses = async (req, res) => {
  try {
    let userData = await models.user.findOne({
      where: { id: req.user.id },
    });
    if (!userData) {
      throw Boom.notFound(responseMessages.USER_NOT_FOUND);
    }

    req.body.addresses = req.body.addresses.map((a) => {
      a.userId = userData.id;
      return a;
    });

    await models.useraddress.bulkCreate(req.body.addresses, {
      individualHooks: true,
    });

    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.ADDRESS_CREATED_SUCCESSFULLY,
        data: { token: req.user.token },
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const getUserData = async (req, res) => {
  try {
    const userData = await models.user.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: models.useraddress,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    if (!userData) {
      throw Boom.notFound(responseMessages.USER_NOT_FOUND);
    }
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.SUCCESS,
        data: {
          userData: JSON.parse(JSON.stringify(userData)),
          token: req.user.token,
        },
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const addressData = await models.useraddress.findOne({
      where: { userId: req.user.id, id: req.body.id },
    });
    if (!addressData) {
      throw Boom.notFound(responseMessages.ADDRESS_NOT_FOUND);
    }
    await models.useraddress.destroy({ where: { id: addressData.id } });
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.SUCCESS,
        data: {
          token: req.user.token,
        },
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

module.exports = {
  createUserAddresses,
  getUserData,
  deleteAddress,
};
