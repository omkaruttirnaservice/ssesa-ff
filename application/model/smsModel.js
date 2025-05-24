var request = require("request");
const { sms } = require("../config/smsTemplates.js");
const { REGISTRATION_SMS_TYPE } = require("../config/constants.js");

module.exports = {
	serialize: function (obj) {
		let str =
			"?" +
			Object.keys(obj)
				.reduce(function (a, k) {
					a.push(k + "=" + encodeURIComponent(obj[k]));
					return a;
				}, [])
				.join("&");
		return str;
	},

	sendNewRegistrationSMS: function (data, callback) {
		var url = `https://api.pinnacle.in/index.php/sms/urlsms`;
		var sendData = {
			sender: "UTRLLP",
			numbers: data.mobile,
			messagetype: "TXT",
			message: sms.regSMS(data),
			response: "Y",
			apikey: "19590e-8ae2eb-9172f7-2595a0-db537a",
		};
		var str = this.serialize(sendData);
		url += str;
		request.get(
			{
				url: url,
			},
			function (error, response, body) {
				data = {
					error: error,
					response: response,
					body: body,
				};
				callback(data);
			},
		);
	},

	sendSMS: function ({ smsDetails, smsType }, callback) {
		let TEMPLATE = null;

		switch (smsType) {
			case REGISTRATION_SMS_TYPE:
				TEMPLATE = sms.newRegistrationSMS(smsDetails);
				break;
		}
		if (!TEMPLATE) throw new Error("Invalid template for sms.");

		var url = `https://api.pinnacle.in/index.php/sms/urlsms`;
		var sendData = {
			sender: "UTRLLP",
			numbers: smsDetails.mobile,
			messagetype: "TXT",
			message: TEMPLATE,
			response: "Y",
			apikey: "19590e-8ae2eb-9172f7-2595a0-db537a",
		};

		var str = this.serialize(sendData);
		url += str;
		request.get(
			{
				url: url,
			},
			function (error, response, body) {
				console.log(body, "==body==");
				let smsResponse = {
					error: error,
					response: response,
					body: body,
				};

				callback(smsResponse);
			},
		);
	},
};
