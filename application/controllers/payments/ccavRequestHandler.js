var http = require("http"),
	fs = require("fs"),
	ccav = require("./ccavutil.js"),
	crypto = require("crypto"),
	qs = require("querystring");
const axios = require("axios");

exports.postReq = function (request, response, data) {
	let _url_encode = new URLSearchParams(data).toString();
	let buffer = Buffer.from(_url_encode);

	var body = "",
		workingKey = process.env.SOL_WORKING_KEY, //Put in the 32-Bit key shared by CCAvenues.
		accessCode = process.env.SOL_ACCESS_CODE, //Put in the Access Code shared by CCAvenues.
		encRequest = "",
		formbody = "";

	//Generate Md5 hash for the key and then convert in base64 string
	var md5 = crypto.createHash("md5").update(workingKey).digest();
	var keyBase64 = Buffer.from(md5).toString("base64");

	//Initializing Vector and then convert in base64 string
	var ivBase64 = Buffer.from([
		0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
		0x0c, 0x0d, 0x0e, 0x0f,
	]).toString("base64");

	body += buffer;
	encRequest = ccav.encrypt(body, keyBase64, ivBase64);
	formbody =
		'<form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' +
		encRequest +
		'"><input type="hidden" name="access_code" id="access_code" value="' +
		accessCode +
		'"><script language="javascript">document.redirect.submit();</script></form>';

	response.writeHeader(200, { "Content-Type": "text/html" });
	response.write(formbody);
	response.end();

	return;
};

exports.checkPayStatus = function (data, res, callback) {
	let workingKey = process.env.SOL_WORKING_KEY, //Put in the 32-Bit key shared by CCAvenues.
		accessCode = process.env.SOL_ACCESS_CODE, //Put in the Access Code shared by CCAvenues.
		encRequest = "";

	//Generate Md5 hash for the key and then convert in base64 string
	var md5 = crypto.createHash("md5").update(workingKey).digest();
	var keyBase64 = Buffer.from(md5).toString("base64");

	//Initializing Vector and then convert in base64 string
	var ivBase64 = Buffer.from([
		0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
		0x0c, 0x0d, 0x0e, 0x0f,
	]).toString("base64");

	encRequest = ccav.encrypt(JSON.stringify(data), keyBase64, ivBase64);

	const options = {
		method: "POST",
		url: `https://login.ccavenue.com/apis/servlet/DoWebTrans?enc_request=${encRequest}&access_code=${accessCode}&request_type=JSON&response_type=JSON&command=orderStatusTracker&version=1.2`,
		headers: {
			accepts: "application/json",
			"Content-Type": "application/json",
		},
		body: {
			enc_request: encRequest,
			access_code: accessCode,
			request_type: "JSON",
			response_type: "JSON",
			command: "orderStatusTracker",
			version: 1.2,
		},
	};

	axios
		.request(options)
		.then(function (response) {
			callback({ status: true, data: response.data });
		})
		.catch(function (error) {
			callback({ status: false, data: error });
		});
};
