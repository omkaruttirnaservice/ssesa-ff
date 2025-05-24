/**
 * Custom error class for handling API errors.
 * Extends the built-in `Error` class to include additional details like status code, errors, and stack trace.
 *
 * @class ApiError
 * @extends Error
 */
class ApiError extends Error {
	/**
	 * Creates an instance of ApiError.
	 *
	 * @param {number} statusCode - The HTTP status code for the error (e.g., 400, 404, 500).
	 * @param {string} [message="Something went wrong"] - The error message describing what went wrong.
	 * @param {Array} [errors=[]] - Optional array of detailed error messages or validation errors.
	 * @param {Object} [stack={}] - Optional stack trace for debugging purposes.
	 * @param {string} errMsg - Additional error message to provide more context. Useful for debugging purposes.
	 */
	constructor(statusCode, message = "Something went wrong", errors = []) {
		super(message);
		this.statusCode = statusCode;
		this.success = false;
		this.errMsg = message;
		this.errors = errors;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = ApiError;
