const { createLogger, format, transports } = require("winston");
const { isDevEnv } = require("./_responderSet.js");
const { _getLogData } = require("../utils/loggerUtils.js");
const { combine, timestamp, json, colorize, prettyPrint } = format;

const levelFilter = level => {
	return format(info => {
		return info.level === level ? info : false;
	})();
};

// Create a Winston logger
let __logger = createLogger({
	level: "info",
	format: combine(timestamp({
		timezone: "IST"
	}), json(), prettyPrint()),
	transports: [
		new transports.File({
			filename: "logs/error.log",
			level: "error",
			format: combine(levelFilter("error")),
		}),
		new transports.File({
			filename: "logs/debug.log",
			level: "debug",
			format: combine(levelFilter("debug")),
		}),
		new transports.File({ filename: "logs/app.log" }),
	],
});
const consoleLogFormat = format.combine(
	format.colorize(),
	format.printf(({ level, message, timestamp }) => {
		return `${level}: ${message}`;
	}),
);

if (isDevEnv()) {
	__logger.add(
		new transports.Console({
			format: consoleLogFormat,
		}),
	);
}

function infoLog(data) {
	__logger.log("info", _getLogData(data));
}

function debugLog(data) {
	__logger.log("debug", _getLogData(data));
}

function errorLog(data) {
	__logger.log("error", _getLogData(data));
}

module.exports = { infoLog, debugLog, errorLog };

// error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
// logger levels
// logger.error('This is an error message');
// logger.warn('This is a warning message');
// logger.info('This is an informational message');
// logger.verbose('This is a verbose message');
// logger.debug('This is a debug message');
// logger.silly('This is a silly message');
