const { healthCheck, registerUser, loginUser, updateUser } = require("../controller");

module.exports = function ({ router }) {
  router.get(`/health-check`, healthCheck);
  router.post(`/register`, registerUser);
  router.post(`/login`, loginUser);
  router.put(`/update`, updateUser);
};