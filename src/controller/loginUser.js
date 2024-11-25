const createErrorResponse = require('../utils/create-error-response');
const createSuccessResponse = require('../utils/create-success-response');

module.exports = function () {
  return async (req, res) => {
    try {
      const { email, password } = req.body;

      const db = await req.mongoDb.database('myapp');
      const users = db.collection('users');
      const user = await users.findOne({ email });

      if (!user || user.password !== password) {
        return createErrorResponse({ message: 'Invalid credentials', status: 400 }, res);
      }

      const sessionId = `session:${user._id}`;
      await req.redis.set(sessionId, JSON.stringify(user), 3600);
      res.cookie('session_id', sessionId, { httpOnly: true, secure: true });

      createSuccessResponse(200, 'Login successful', res);
    } catch (error) {
      createErrorResponse(error, res);
    }
  };
};