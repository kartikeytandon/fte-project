const createSuccessResponse = require('../utils/create-success-response');
const makeHealthCheck = require('./makeHealthCheck');
const makeRegisterUser = require('./registerUser');
const makeLoginUser = require('./loginUser');
const makeUpdateUser = require('./updateUser');

const healthCheck = makeHealthCheck({ createSuccessResponse });
const registerUser = makeRegisterUser();
const loginUser = makeLoginUser();
const updateUser = makeUpdateUser();

module.exports = {
  healthCheck,
  registerUser,
  loginUser,
  updateUser,
};