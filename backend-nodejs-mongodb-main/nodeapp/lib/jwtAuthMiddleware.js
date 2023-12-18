const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');
require('dotenv/config');

const jwtAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.get('Authorization') || req.body.jwt || req.query.jwt;

    if (!token) return next(createHttpError(401, 'No token provided'));

    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) next(createHttpError(401, 'Invalid token'));
      req.body.user = { ...payload };
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = jwtAuthMiddleware;
