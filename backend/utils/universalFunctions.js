const Boom = require("boom");
const responseMessages = require("../resources/response.json");

const asyncForEach = async (array, callback) => {
  await Promise.all(array.map(callback));
};

const validateRequestPayload = async (requestObj, res, schema) => {
  return new Promise((resolve, reject) => {
    const { error } = schema.validate(requestObj);
    if (error) {
      let message = sendBadRequestError(error, res);
      reject(Boom.badRequest(message));
    } else {
      resolve();
    }
  });
};

const sendError = (data, res) => {
  let error;
  console.log(
    "ERROR OCCURRED IN SEND ERROR FUNCTION  ---------------------------",
    data
  );
  let message = null;
  if (typeof data == "object" && !data.isBoom) {
    if (data.name == "ApplicationError") {
      message = responseMessages.APP_ERROR;
    } else if (data.name.toUpperCase().includes("SEQUELIZE")) {
      message = responseMessages.DB_ERROR;
    } else if (data.name == "ValidationError") {
      message = responseMessages.APP_ERROR;
    } else if (data.response) {
      message = data.response.message;
    } else if (data.message) {
      message = data.message;
    } else {
      message = responseMessages.DEFAULT;
    }
    if (message !== null) {
      error = new Boom(message, {
        statusCode: 400,
        data: {},
      });
      return res.json(error.output.payload);
    }
  } else if (typeof data == "object" && data.isBoom) {
    if (data.data && data.data.code) {
      data.output.payload.code = data.data.code;
    }
    data.output.payload.data = {};
    return res.json(data.output.payload);
  } else {
    error = new Boom(data, {
      statusCode: 400,
      data: {},
    });
    return res.json(error.output.payload);
  }
};

/*-------------------------------------------------------------------------------
 * send success
 * -----------------------------------------------------------------------------*/

const sendSuccess = (response, res) => {
  const statusCode =
    response && response.statusCode ? response.statusCode : 200;
  const message = response && response.message ? response.message : "Success";
  const data = response.data ? response.data : {};

  return res.json({
    statusCode,
    message,
    data,
    error: "",
  });
};

/*-------------------------------------------------------------------------------
 * Joi error handle
 * -----------------------------------------------------------------------------*/
const sendBadRequestError = (error, res) => {
  let message = error.details[0].message;
  message = message.replace(/"/g, "");
  message = message.replace("[", "");
  message = message.replace("]", "");

  return message;
};

const secondsToHm = async (d) => {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);

  let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours ") : "";
  let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes") : "";

  return hDisplay + mDisplay;
};

const validatePhoneno = async (phoneno) => {
  //Remove spaces in between phone no
  if (phoneno) {
    phoneno.replace(/\s/g, "");
    let regexPhoneno = new RegExp(
      /^((\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/,
      "gm"
    );
    return regexPhoneno.test(phoneno);
  } else {
    return false;
  }
};

const validateEmail = async (inputText) => {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  validateRequestPayload,
  sendSuccess,
  sendError,
  secondsToHm,
  validatePhoneno,

  validateEmail,

  asyncForEach,
};
