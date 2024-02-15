import isArray  from 'lodash/isArray';

const _serverError = (res) => {
  const ex = (res && res.body) || (res && JSON.stringify(res.text)) || {};
  if (ex.validation) {
    const keys = ex.validation.keys; // failed validations keys
    const errMap = {};

    // error message is contained in "[]" but in order the keys are, so split it up
    ex.message.match(/[^[\]]+(?=])/g).forEach(function (msg, idx) {
      errMap[keys[idx]] = isArray(msg) ? msg.join(". ") : msg;
    });

    ex.message = "Validation Error";
    ex.validation = errMap;
  }
  return ex;
};

export { _serverError as ServerError };
