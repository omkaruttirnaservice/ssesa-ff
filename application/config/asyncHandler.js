/**
 * A higher-order function to wrap asynchronous route handlers.
 * It ensures that any errors thrown inside the controller function
 * are passed to the next middleware for centralized error handling.
 *
 * @param {Function} controllerFun - The asynchronous controller function to be wrapped.
 * @returns {Function} - A middleware function that handles errors and passes them to the `next` function.
 *
 * @example
 * // Example usage in an Express route
 * const express = require('express');
 * const router = express.Router();
 * const asyncHandler = require('./asyncHandler');
 *
 * router.get('/example', asyncHandler(async (req, res) => {
 *   const data = await someAsyncOperation();
 *   res.json(data);
 * }));
 */

const asyncHandler = controllerFun => {
	return async (req, res, next) => {
		try {
			await controllerFun(req, res, next);
		} catch (err) {
			next(err); // This passes the error to the next middleware (which should be your error handler)
		}
	};
};

module.exports = asyncHandler;
