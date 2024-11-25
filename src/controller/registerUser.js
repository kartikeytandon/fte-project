const createErrorResponse = require('../utils/create-error-response');
const createSuccessResponse = require('../utils/create-success-response');

module.exports = function () {
  return async (req, res) => {
    try {
      const { name, email, password, board, field, standard, dob, age } = req.body;

      const db = await req.mongoDb.database('myapp');
      const users = db.collection('users');
      const existingUser = await users.findOne({ email });

      if (existingUser) {
        return createErrorResponse({ message: 'Email already exists', status: 400 }, res);
      }

      await users.insertOne({ name, email, password, board, field, standard, dob, age });
      createSuccessResponse(201, 'User registered successfully', res);
    } catch (error) {
      createErrorResponse(error, res);
    }
  };
};