/**
 * Represents a standardized API response structure.
 *
 * This class provides a consistent format for API responses, including status code,
 * success flag, user message, response data, error message, and response data type.
 *
 * @class ApiResponse
 */
class ApiResponse {
	/**
	 * Creates an instance of ApiResponse.
	 *
	 * @param {number} statusCode - The HTTP status code of the response (e.g., 200, 400, 500).
	 * @param {boolean} success - Indicates whether the request was successful (`true`) or not (`false`).
	 * @param {string} usrMsg - A user-friendly message describing the outcome of the request.
	 * @param {Object|null} [data=null] - Optional data payload to include in the response.
	 * @param {string|null} [errMsg=null] - Optional error message if the request failed.
	 * @param {string} [respDataType="json"] - The format of the response data (default is `json`).
	 */
	constructor(
		statusCode,
		success,
		usrMsg,
		data = null,
		errMsg = null,
		respDataType = "json",
	) {
		this.statusCode = statusCode;
		this.success = success;
		this.usrMsg = usrMsg;
		this.data = data ? JSON.stringify(data) : null;
		this.respDataType = respDataType;
		this.errMsg = errMsg;
	}
}

module.exports = ApiResponse;
