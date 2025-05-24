const dotenv = require("dotenv");
const { AxiosError } = require("axios");
const ApiError = require("../application/config/ApiError.js");
dotenv.config();

const errorHandler = (err, req, res, next) => {
	let error = err;
	let response = null;
	console.log(error, "==error global handler==");

	if (error instanceof AxiosError) {
		response = new ApiError(
			502,
			"Unable to connect to server",
			error.code || [],
		);
		error.statusCode = 502;
	} else if (error.code) {
		switch (error.code) {
			case "ER_DUP_ENTRY":
				error = new ApiError(
					409,
					"Duplicate entry. Already exists.",
					error.errors || [],
					error.stack,
				);
				error.statusCode = 409;
				break;
			case "ER_BAD_NULL_ERROR":
				error = new ApiError(
					400,
					"A required field is missing.",
					error.errors || [],
					error.stack,
				);
				error.statusCode = 400;
				break;
			case "ERR_BAD_REQUEST":
				error = new ApiError(
					400,
					error?.response?.data?.message || "Server error.",
					error.errors || [],
					error.stack,
				);
				error.statusCode = 400;
				break;
			default:
				error = new ApiError(
					500,
					"Database error occurred.",
					error.errors || [],
					error.stack,
				);
				error.statusCode = 400;
		}
	} else if (!(error instanceof ApiError)) {
		const statusCode = error.statusCode || 500;
		const message = error.message || "Something went wrong";
		console.log(message, "==message==");
		error = new ApiError(
			statusCode,
			message,
			error?.errors || [],
			err.stack,
		);
	} else if (error instanceof ApiError) {
		response = { ...error };
	}

	console.log(response, "-response");

	return res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
