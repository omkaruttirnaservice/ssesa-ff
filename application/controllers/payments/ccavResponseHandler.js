var http = require("http"),
	fs = require("fs"),
	ccav = require("./ccavutil.js"),
	crypto = require("crypto"),
	qs = require("querystring");

exports.postRes = function (request, response, callback) {
	let dataResponse = request.body;

	var ccavEncResponse = "",
		ccavResponse = "",
		workingKey = process.env.SOL_WORKING_KEY, //Put in the 32-Bit key shared by CCAvenues.
		ccavPOST = "";

	//Generate Md5 hash for the key and then convert in base64 string
	var md5 = crypto.createHash("md5").update(workingKey).digest();
	var keyBase64 = Buffer.from(md5).toString("base64");

	//Initializing Vector and then convert in base64 string
	var ivBase64 = Buffer.from([
		0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
		0x0c, 0x0d, 0x0e, 0x0f,
	]).toString("base64");

	let _url_encode = new URLSearchParams(dataResponse).toString();
	let buffer = Buffer.from(_url_encode);
	ccavEncResponse += buffer;
	ccavPOST = qs.parse(ccavEncResponse);
	var encryption = ccavPOST.encResp;
	ccavResponse = ccav.decrypt(encryption, keyBase64, ivBase64);
	let responseData = JSON.parse(
		'{"' +
			decodeURI(ccavResponse)
				.replace(/"/g, '\\"')
				.replace(/&/g, '","')
				.replace(/=/g, '":"')
				.replace(/\s/g, "") +
			'"}',
	);
	callback(responseData);
};

exports.payStausResponse = function (dataResponse, callback) {
	var ccavEncResponse = "",
		ccavResponse = "",
		workingKey = process.env.SOL_WORKING_KEY, //Put in the 32-Bit key shared by CCAvenues.
		ccavPOST = "";

	//Generate Md5 hash for the key and then convert in base64 string
	var md5 = crypto.createHash("md5").update(workingKey).digest();
	var keyBase64 = Buffer.from(md5).toString("base64");

	//Initializing Vector and then convert in base64 string
	var ivBase64 = Buffer.from([
		0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
		0x0c, 0x0d, 0x0e, 0x0f,
	]).toString("base64");

	let buffer = Buffer.from(dataResponse);
	ccavEncResponse += buffer;
	ccavPOST = qs.parse(ccavEncResponse);
	var encryption = ccavPOST.enc_response;
	ccavResponse = ccav.decrypt(encryption, keyBase64, ivBase64);
	callback(JSON.parse(ccavResponse));
};
