const Jwt = require("jsonwebtoken");
const Boom = require("boom");
const universalFunctions = require("../utils/universalFunctions");
const responseMessages = require("../resources/response.json");
const Config = require("config");
const models = require("../models");

const checkAuth = (req, res, next) => {
  const token =
    req.headers["x-access-token"] ||
    req.headers["token"] ||
    req.query["x-access-token"];
  if (token) {
    Jwt.verify(token, Config.get("jwt.secret"), async function (err, decoded) {
      try {
        if (err) {
          throw Boom.unauthorized(responseMessages.INVALID_TOKEN);
        } else {
          await validateSession(decoded);

          let userData = await models.user.findOne({
            where: { id: decoded.payloadData.userId },
          });
          if (!userData) {
            throw Boom.notFound(responseMessages.USER_NOT_FOUND);
          }

          req.user = JSON.parse(JSON.stringify(userData));
          req.user.token = await createToken({
            userId: decoded.payloadData.userId,
            sessionId: decoded.payloadData.sessionId,
          });
          next();
        }
      } catch (err) {
        return universalFunctions.sendError(err, res);
      }
    });
  } else {
    let error = new Boom(responseMessages.INVALID_TOKEN, {
      statusCode: 400,
      data: {},
    });
    return universalFunctions.sendError(error, res);
  }
};

const createToken = async (payloadData) => {
  return new Promise((resolve, reject) => {
    Jwt.sign(
      { payloadData: payloadData },
      Config.get("jwt.secret"),
      {
        expiresIn: Config.get("jwt.tokenExpire"),
      },

      (err, jwt) => {
        if (err) {
          reject(err);
        } else {
          resolve(jwt);
        }
      }
    );
  });
};

const validateSession = async (user) => {
  try {
    const criteria = {
      userId: user.payloadData.userId,
      id: user.payloadData.sessionId,
    };

    const session = await models.session.findOne({ where: criteria });

    if (session) {
      return session;
    } else {
      throw Boom.badRequest(responseMessages.INVALID_TOKEN);
    }
  } catch (error) {
    throw error;
  }
};

const createSession = async (payloadData) => {
  try {
    let session = await models.session.create({ userId: payloadData.userId });
    payloadData.sessionId = session.id;
    let token = await createToken(payloadData);
    return token;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createSession,
  checkAuth,
};
