const createErrorResponse = require('../utils/create-error-response');
const createSuccessResponse = require('../utils/create-success-response');

module.exports = function () {
  return async (req, res) => {
    try {
      const { email, ...updates } = req.body;

      const db = await req.mongoDb.database('myapp');
      const users = db.collection('users');
      const user = await users.findOne({ email });

      if (!user) {
        return createErrorResponse({ message: 'User not found', status: 404 }, res);
      }

      await users.updateOne({ email }, { $set: updates });
      createSuccessResponse(200, 'User updated successfully', res);
    } catch (error) {
      createErrorResponse(error, res);
    }
  };
};