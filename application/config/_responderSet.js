require("dotenv").config();
const momentTz = require("moment-timezone");
const { redisClient } = require("./redisConnect.js");

exports.sendData = {
	_call: 0,
	_error: "",
	_sys_erorr: "",
	_data: [],
};

exports.momentDates = {
	getDateOnly({ dateFormat = "YYYY-MM-DD" }) {
		return momentTz().tz("Asia/Kolkata").format(dateFormat);
	},
	getTimeOnly() {
		return momentTz().tz("Asia/Kolkata").format("HH:mm:ss");
	},
	getTimestamp() {
		return momentTz().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
	},
};

exports.myDate = {
	formatDate: function (date) {
		let d = date.split("/");
		return `${d[2]}-${d[1]}-${d[0]}`;
	},
	formatDate_2: function (date) {
		let d = date.split("-");
		return `${d[2]}-${d[1]}-${d[0]}`;
	},
	getDate: function () {
		let date_ob = new Date();
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		return year + "-" + month + "-" + date;
	},
	todaysDate: function () {
		let date_ob = new Date();
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		return date + "-" + month + "-" + year;
	},
	getTime: function () {
		let date_ob = new Date();
		let hours = ("0" + date_ob.getHours()).slice(-2);
		let minutes = ("0" + date_ob.getMinutes()).slice(-2);
		let seconds = ("0" + date_ob.getSeconds()).slice(-2);
		return hours + ":" + minutes + ":" + seconds;
	},
	getDateTime: function () {
		let date_ob = new Date();
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		let hours = ("0" + date_ob.getHours()).slice(-2);
		let minutes = ("0" + date_ob.getMinutes()).slice(-2);
		let seconds = ("0" + date_ob.getSeconds()).slice(-2);
		return (
			year +
			"-" +
			month +
			"-" +
			date +
			" " +
			hours +
			":" +
			minutes +
			":" +
			seconds
		);
	},
	getTimeStamp: function () {
		let date_ob = new Date();
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		let hours = ("0" + date_ob.getHours()).slice(-2);
		let minutes = ("0" + date_ob.getMinutes()).slice(-2);
		let seconds = ("0" + date_ob.getSeconds()).slice(-2);
		return (
			year +
			"" +
			month +
			"" +
			date +
			"" +
			hours +
			"" +
			minutes +
			"" +
			seconds
		);
	},

	generateISTTimestamp: () => {
		return Date.now();
	},
};

exports.checkResult = {
	fromBase64: function (data) {
		let buff = new Buffer(data, "base64");
		let text = buff.toString("ascii");
		return text;
	},
	toBase64: function (data) {
		let buff = new Buffer(data);
		let base64data = buff.toString("base64");
		return base64data;
	},
	checkResultForNullData: function (result) {
		return new Promise(function (resolve, reject) {
			if (result.length == 0) {
				reject({ _call: 1, _error: "No Data Found", _data: [] });
			} else {
				resolve({ _call: 1, _error: "", _data: result });
			}
		});
	},
	checkResultInserted: function (data, msg) {
		return new Promise(function (resolve, reject) {
			if (data.affectedRows <= 0) {
				reject({ _call: 0, _error: msg, _sys_erorr: {}, _data: [] });
			} else {
				resolve({ _call: 1, _error: "", _sys_erorr: {}, _data: [] });
			}
		});
	},
	checkResultUpdated: function (data, msg) {
		return new Promise(function (resolve, reject) {
			if (data.affectedRows <= 0) {
				reject({ _call: 0, _error: msg, _sys_erorr: {}, _data: [] });
			} else {
				resolve({ _call: 1, _error: "", _sys_erorr: {}, _data: [] });
			}
		});
	},
};
exports.table_list = [
	"tm_final_student_question_paper",
	"tm_final_student_test_list",
	"tm_publish_test_list",
	"tm_student_question_paper",
	"tm_student_test_list",
	"tm_test_question_sets",
	"tn_main_student_list",
	"tn_student_list",
];

exports.getFileDetails = file => {
	let name = file.name;
	let extension = file.name.split(".").pop();
	return { name, extension };
};

exports.getMerchTxnId = ({ transId, r_id, f_id }) => {
	return `${transId}${r_id}${f_id}${Math.floor(Math.random() * 100) + 1}`;
};

exports.getFromGlobalCache = async key => {
	const cachedData = await redisClient.get(key);
	if (cachedData) {
		return JSON.parse(cachedData);
	}
	return null;
};

exports.setToGlobalCache = async (key, data, expTime = 200) => {
	await redisClient.set(key, JSON.stringify(data), { EX: expTime });
};

exports.isDevEnv = () => (process.env.NODE_ENV === "dev" ? true : false);

/**
 * Compares two time values and checks if the start time is greater than the end time.
 *
 * @param {Date} start - The start time as a Date object.
 * @param {Date | string} end - The end time, which can be a Date object or a string representing a date.
 * @returns {boolean | null} - Returns `true` if the start time is greater than the end time,
 * `false` if the start time is less than or equal to the end time, or `null` if either input is invalid.
 */
exports.compareTime = (start, end) => {
	if (!start || !end) {
		return null;
	}

	return start.getTime() > new Date(end).getTime();
};

exports.getDateFor = (processData, type) => {
	/**
	 * eg. date object array (it will contain multiple dates)
	 * [{
			_column: 'p_payment_end_date',
			title: 'Last date for payment of examination fee',
			secondary_title: 'परीक्षा शुल्क भरण्याची अंतिम दिनांक',
			date: '30-04-2025',
			time: '05:00',
			time_am_pm: 'PM',
			original_date_format: 2025-04-30T11:30:00.000Z,
			id: 4
		}]
		
		We will return the original_date_format for the type sent
	 * */

	if (!type) return null;

	const tempDateDetails = processData.important_dates.filter(
		date => date._column == type,
	);

	if (tempDateDetails.length > 0) {
		return tempDateDetails[0].original_date_format;
	} else return null;
};
