const atomPgModel = require("../../model/atom-pg-model/atomPgModel.js");

const axios = require("axios");
var crypto = require("crypto");
var unirest = require("unirest");
const dotenv = require("dotenv");
const { myDate } = require("../../config/_responderSet.js");
dotenv.config();

const req_enc_key = "DCC537DE3B2F92F3C181DC62C267722C";
const req_salt = "DCC537DE3B2F92F3C181DC62C267722C";
const res_dec_key = "7667C67021F5E2629C931F6043A5FD40";
const res_salt = "7667C67021F5E2629C931F6043A5FD40";
const resHashKey = "70982a7a3840f3b426";

const algorithm = "aes-256-cbc";
const password = Buffer.from(req_enc_key, "utf8");
const salt = Buffer.from(req_salt, "utf8");
const respassword = Buffer.from(res_dec_key, "utf8");
const ressalt = Buffer.from(res_salt, "utf8");
const iv = Buffer.from(
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	"utf8",
);

const atomPgController = {
	getPaymentDetails: (req, resp, next) => {
		try {
			let { userDetails } = req.body;

			if (!userDetails) {
				return resp.status(200).json({
					call: 0,
					message: "No user details passed",
				});
			}

			const merchId = process.env.NDPS_MERCH_ID;
			const merchPass = process.env.NDPS_MERCH_PASS;
			const prodId = "SATARA";
			const Authurl = process.env.NDPS_AUTH_URL;

			let txnId = "Invoice" + new Date().getTime().toString(36);

			let txnDate = myDate.getDateTime();
			let amount = "1"; // for test payment (remove in production)
			// let amount = userDetails.amount; // for production payment (actual exam payment)
			let userEmailId = userDetails.email;
			let userContactNo = userDetails.contact;

			const jsondata =
				'{"payInstrument":{"headDetails":{"version":"OTSv1.1","api":"AUTH","platform":"FLASH"},"merchDetails":{"merchId":"' +
				merchId +
				'","userId":"","password":"' +
				merchPass +
				'","merchTxnId":"' +
				txnId +
				'","merchTxnDate":"' +
				txnDate +
				'"},"payDetails":{"amount":"' +
				amount +
				'","product":"' +
				prodId +
				'","custAccNo":"213232323","txnCurrency":"INR"},"custDetails":{"custEmail":"' +
				userEmailId +
				'","custMobile":"' +
				userContactNo +
				'"},  "extras": {"udf1":"udf1","udf2":"udf2","udf3":"udf3","udf4":"udf4","udf5":"udf5"}}}';

			const JSONString = jsondata.toString();
			let encDataR = encrypt(JSONString);

			var req = unirest("POST", Authurl); // change url in case of production
			req.headers({
				"cache-control": "no-cache",
				"content-type": "application/x-www-form-urlencoded",
			});

			req.form({
				encData: encDataR,
				merchId: merchId,
			});

			req.end(function (res) {
				console.log(res.body, "==res==");
				if (!res)
					throw new Error(
						"Invalid payment token generation response",
					);
				if (res.error) throw new Error(res.error);
				let datas = res.body;

				var arr = datas.split("&").map(function (val) {
					return val;
				});
				var arrTwo = arr[1].split("=").map(function (val) {
					return val;
				});
				var decrypted_data = decrypt(arrTwo[1]);
				let jsonData = JSON.parse(decrypted_data);

				// this is insert data to insert in payment history table
				const insertData = {
					r_id: userDetails.r_id,
					f_id: userDetails.f_id,
					txn_id: txnId,
					insertDate: myDate.getDateTime(),
					insertTime: myDate.getTime(),
					amount: userDetails.totalPayment,
				};

				const payStatusCode =
					jsonData["responseDetails"]["txnStatusCode"];

				if (
					payStatusCode === "OTS0000" ||
					payStatusCode === "OTS0002"
				) {
					atomPgModel
						.updateTokenInPayHistory(resp.pool, insertData)
						.then(_result => {
							return resp.status(200).json({
								call: 1,
								data: {
									token: jsonData["atomTokenId"],
									txnId: txnId,
									merchId: merchId,
								},
							});
						})
						.catch(err => {
							console.log(err, "==err==");
							return resp.status(500).json({
								call: 0,
								message:
									"Unable to process payment try again later",
							});
						});
				} else {
					console.log("==Payment not success block=");
					console.log(jsonData, "==jsonData==");
					return resp.status(500).json({
						call: 0,
						message: "Unable to process payment try again later",
					});
				}
			});
		} catch (err) {
			console.log(err, "==err==");
			return resp.status(500).json({
				call: 0,
				message: "Unable to process payment try again later",
			});
		}
	},

	verifyPayment: (req, res, next) => {
		var decrypted_data = decrypt(req.body.encData);
		let jsonData = JSON.parse(decrypted_data);
		let respArray = Object.keys(jsonData).map(key => jsonData[key]);

		let signature = generateSignature(respArray);

		if (signature === respArray[0]["payDetails"]["signature"]) {
			let merchTxnId = respArray[0].merchDetails.merchTxnId;
			let insertData = {
				status: respArray[0].responseDetails.message,
				code: respArray[0].responseDetails.statusCode,
				message: respArray[0].responseDetails.message,
				moreDetails: JSON.stringify(respArray[0].payDetails),
				atom_txn_id: respArray[0].payDetails.atomTxnId,
				merchTxnId: merchTxnId,
				updateDate: myDate.getDateTime(),
				updateTime: myDate.getTime(),
			};

			const payStatusCode = respArray[0]["responseDetails"]["statusCode"];

			if (payStatusCode == "OTS0000" || payStatusCode == "OTS0002") {
				// success payment
				insertData["doneStatus"] = 1;
				atomPgModel
					.updatePaySuccess(res.pool, insertData)
					.then(result => {
						console.log(result, "==result updatePaySuccess==");
						if (result.affectedRows != 1) {
							throw new Error(
								"Not able to update payment status",
							);
						}
						return atomPgModel.updatePaymentDoneStatus(
							res.pool,
							insertData,
						);
					})
					.then(() => {
						return atomPgModel.getUserDetailsByTransactionId(
							res.pool,
							merchTxnId,
						);
					})
					.then(_candidateDetails => {
						console.log(_candidateDetails, "==_candidateDetails==");
						let { r_id, f_id } = _candidateDetails[0];
						res.redirect(`/payment?r=${r_id}&f=${f_id}`);
					})
					.catch(err => {
						console.log(err, "==err updatePaySuccess==");
						return res.status(500).json({
							call: 0,
							message: err.message,
						});
					});
			} else {
				// failure payment
				insertData["doneStatus"] = 0;
				atomPgModel
					.updatePaySuccess(res.pool, insertData)
					.then(result => {
						if (result.affectedRows != 1) {
							throw new Error(
								"Not able to update payment status",
							);
						}
						return atomPgModel.getUserDetailsByTransactionId(
							res.pool,
							merchTxnId,
						);
					})

					.then(_candidateDetails => {
						let { r_id, f_id } = _candidateDetails[0];
						res.redirect(`/payment?r=${r_id}&f=${f_id}`);
					})
					.catch(err => {
						console.log(err, "==err updatePaySuccess==");
						return res.status(500).json({
							call: 0,
							message: err.message,
						});
					});
			}
		} else {
			return res.status(500).json({
				call: 2,
				message: "Payment signature mismatched",
			});
		}
	},

	transactionStatus: async (req, res, next) => {
		try {
			const api = "TXNVERIFICATION";
			const userTxnDetails = req.body;

			const merchId = process.env.NDPS_MERCH_ID;
			const merchPass = process.env.NDPS_MERCH_PASS;

			// Prepare data for signature
			// const dataToSign = `${merchId}+${merchPass}+${userTxnDetails.merch_trans_id}+${amount}+'INR'+'${api}'`; //production
			const dataToSign = `${merchId}+${merchPass}+${userTxnDetails.merch_trans_id}+'1'+'INR'+'${api}'`; // testing
			const signature = generateSignature_2(dataToSign);

			const refetchPayloadData = {
				payInstrument: {
					headDetails: {
						api: api,
						source: "OTS",
					},
					merchDetails: {
						merchId: process.env.NDPS_MERCH_ID,
						password: process.env.NDPS_MERCH_PASS,
						merchTxnId: userTxnDetails.merch_trans_id,
						merchTxnDate: userTxnDetails.merchTxnDate,
					},
					payDetails: {
						amount: userTxnDetails.amount,
						txnCurrency: "INR",
						signature: signature,
					},
				},
			};

			const DEMO_REQ_DATA = {
				payInstrument: {
					headDetails: {
						api: "TXNVERIFICATION",
						source: "OTS",
					},
					merchDetails: {
						merchId: 481856,
						password: "Test@123",
						merchTxnId: "250420221",
						merchTxnDate: "2022-04-25",
					},
					payDetails: {
						amount: 1.0,
						txnCurrency: "INR",
						signature:
							"abaf4b4011b6813c0a16896302a6fab404035df377d3b25e60b8a6766dffb6383891a7443f603fc99b643e2bf4049d34eccc74e3253 3c742c25580f60e17ab2a",
					},
				},
			};

			// const encryptedData = encrypt(JSON.stringify(refetchPayloadData)); // for production
			const encryptedData = encrypt(JSON.stringify(DEMO_REQ_DATA)); // for testing
			console.log(encryptedData, "==encryptedData==");

			// Make request to NDPS API
			// const URL_PROD = `${process.env.NDPS_STATUS_API_URL}?merchId=${merchId}&encData=${encryptedData}`;
			// const URL_TEST = `https://caller.atomtech.in/ots/payment/status?merchId=${merchId}&encData=${encryptedData}`;

			var req = unirest(
				"POST",
				"https://caller.atomtech.in/ots/payment/status",
			); // change url in case of production
			req.headers({
				"cache-control": "no-cache",
				"content-type": "application/x-www-form-urlencoded",
			});

			req.form({
				encData: encryptedData,
				merchId: "481856",
			});

			req.end(function (res) {
				let datas = res.body;
				console.log(datas.payInstrument, "==datas==");

				var arr = datas.split("&").map(function (val) {
					return val;
				});
				var arrTwo = arr[1].split("=").map(function (val) {
					return val;
				});
				var decrypted_data = decrypt(arrTwo[1]);
				let jsonData = JSON.parse(decrypted_data);

				console.log(jsonData, "==jsonData==");
			});

			// let decrypted_data = decrypt(JSON.stringify(_trackStatusResponse));
			// let jsonData = JSON.parse(decrypted_data);
			// let respArray = Object.keys(jsonData).map((key) => jsonData[key]);

			// let insertData = {
			// 	status: respArray[0].responseDetails.message,
			// 	code: respArray[0].responseDetails.statusCode,
			// 	message: respArray[0].responseDetails.message,
			// 	moreDetails: JSON.stringify(respArray[0].payDetails),
			// 	atom_txn_id: respArray[0].payDetails.atomTxnId,
			// 	merchTxnId: userTxnDetails.merch_trans_id,
			// 	updateDate: myDate.getDateTime(),
			// 	updateTime: myDate.getTime(),
			// };

			// const payStatusCode = respArray[0]['responseDetails']['statusCode'];

			// if (payStatusCode == 'OTS0000' || payStatusCode == 'OTS0002') {
			// 	// success payment
			// 	insertData['doneStatus'] = 1;
			// 	atomPgModel
			// 		.updatePaySuccess(res.pool, insertData)
			// 		.then((result) => {
			// 			console.log(result, '==result updatePaySuccess==');
			// 			if (result.affectedRows != 1) {
			// 				throw new Error('Not able to update payment status');
			// 			}
			// 			return atomPgModel.updatePaymentDoneStatus(res.pool, insertData);
			// 		})
			// 		.then(() => {
			// 			return atomPgModel.getUserDetailsByTransactionId(res.pool, merch_trans_id);
			// 		})
			// 		.then((_candidateDetails) => {
			// 			console.log(_candidateDetails, '==_candidateDetails==');
			// 			let { r_id, f_id } = _candidateDetails[0];
			// 			res.redirect(`/payment?r=${r_id}&f=${f_id}`);
			// 		})
			// 		.catch((err) => {
			// 			console.log(err, '==err updatePaySuccess==');
			// 			return res.status(500).json({
			// 				call: 0,
			// 				message: err.message,
			// 			});
			// 		});
			// } else {
			// 	// failure payment
			// 	insertData['doneStatus'] = 0;
			// 	atomPgModel
			// 		.updatePaySuccess(res.pool, insertData)
			// 		.then((result) => {
			// 			if (result.affectedRows != 1) {
			// 				throw new Error('Not able to update payment status');
			// 			}
			// 			return atomPgModel.getUserDetailsByTransactionId(res.pool, merchTxnId);
			// 		})

			// 		.then((_candidateDetails) => {
			// 			let { r_id, f_id } = _candidateDetails[0];
			// 			res.redirect(`/payment?r=${r_id}&f=${f_id}`);
			// 		})
			// 		.catch((err) => {
			// 			console.log(err, '==err updatePaySuccess==');
			// 			return res.status(500).json({
			// 				call: 0,
			// 				message: err.message,
			// 			});
			// 		});
			// }
		} catch (error) {
			console.error(
				"Error processing transaction status requery:",
				error,
			);
			res.status(500).send({ error: "Internal Server Error" });
		}
	},
};

function encrypt(text) {
	var derivedKey = crypto.pbkdf2Sync(password, salt, 65536, 32, "sha512");
	const cipher = crypto.createCipheriv(algorithm, derivedKey, iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return `${encrypted.toString("hex")}`;
}

function decrypt(text) {
	const encryptedText = Buffer.from(text, "hex");
	var derivedKey = crypto.pbkdf2Sync(
		respassword,
		ressalt,
		65536,
		32,
		"sha512",
	);
	const decipher = crypto.createDecipheriv(algorithm, derivedKey, iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}

function generateSignature(respArray) {
	var signatureString =
		respArray[0]["merchDetails"]["merchId"].toString() +
		respArray[0]["payDetails"]["atomTxnId"] +
		respArray[0]["merchDetails"]["merchTxnId"].toString() +
		respArray[0]["payDetails"]["totalAmount"].toFixed(2).toString() +
		respArray[0]["responseDetails"]["statusCode"].toString() +
		respArray[0]["payModeSpecificData"]["subChannel"][0].toString() +
		respArray[0]["payModeSpecificData"]["bankDetails"][
			"bankTxnId"
		].toString();
	var hmac = crypto.createHmac("sha512", resHashKey);
	data = hmac.update(signatureString);
	gen_hmac = data.digest("hex");
	return gen_hmac;
}

const generateSignature_2 = data => {
	const hash = crypto
		.createHmac("sha256", process.env.NDPS_API_SECRET)
		.update(data)
		.digest("hex");
	return hash;
};

module.exports = atomPgController;
