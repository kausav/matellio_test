const { createSession } = require("../services/auth");
const universalFunctions = require("../utils/universalFunctions");
const responseMessages = require("../resources/response.json");
const models = require("../models");
const bcryptFunctions = require("../utils/bcrypt");
const Boom = require("boom");

const signUp = async (req, res) => {
  try {
    let userExist = await models.user.findOne({
      where: { email: req.body.email },
    });
    if(userExist){
      throw Boom.badRequest(responseMessages.USER_EXISTS)
    }
    req.body.password = bcryptFunctions.createHash(req.body.password);
    let userData = await models.user.create(req.body);
    if (!userData) {
      throw Boom.notFound(responseMessages.USER_NOT_FOUND);
    }

    let token = await createSession({ userId: userData.id });
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.USER_CREATED_SUCCESSFULLY,
        data: { userId: userData.id, token: token },
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const signIn = async (req, res) => {
  try {
    let userData = await models.user.findOne({
      where: { email: req.body.email },
    });
    if (!userData) {
      throw Boom.notFound(responseMessages.INVALID_EMAIL);
    }

    let password = bcryptFunctions.compareHash(
      req.body.password,
      userData.password
    );
    if (password === false) {
      throw Boom.notFound(responseMessages.WRONG_LOGIN_PASSWORD);
    }

    let token = await createSession({ userId: userData.id });
    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.SUCCESS,
        data: { userId: userData.id, token: token },
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

module.exports = { signUp, signIn };
