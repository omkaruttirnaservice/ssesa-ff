/**
 * Represents a standardized API response structure.
 *
 * This class provides a consistent format for API responses, including status code,
 * success flag, user message, response data, error message, and response data type.
 *
 * @class ApiResponseV2
 */
class ApiResponseV2 {
	/**
	 * Creates an instance of ApiResponse.
	 *
	 * @param {number} statusCode - The HTTP status code of the response (e.g., 200, 400, 500).
	 * @param {string} usrMsg - A user-friendly message describing the outcome of the request.
	 * @param {Object|null} [data=null] - Optional data payload to include in the response.
	 */
	constructor(
		statusCode,
		usrMsg,
		data = null,
	) {
		this.statusCode = statusCode;
		this.success = statusCode < 400 ? true : false;
		this.usrMsg = usrMsg;
		this.data = data ?? "";
	}
}

module.exports = ApiResponseV2;
