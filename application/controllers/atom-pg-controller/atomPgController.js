const atomPgModel = require("../../model/atom-pg-model/atomPgModel.js");

const axios = require("axios");
var crypto = require("crypto");
var unirest = require("unirest");
const dotenv = require("dotenv");
const {
	momentDates,
	getMerchTxnId,
	myDate,
} = require("../../config/_responderSet.js");
const {
	ONLINE_PAYMENT,
	SUCCESS_PAYMENT_MSG,
	FAILED_PAYMENT_MSG,
	SUCCESS_PAYMENT_CODE,
	FAILED_PAYMENT_CODE,
	PG_SUCCESS_PAYMENT_CODE_1,
	PG_SUCCESS_PAYMENT_CODE_2,
} = require("../../config/constants.js");
const ApiResponseV2 = require("../../config/ApiResponseV2.js");
const ApiError = require("../../config/ApiError.js");
dotenv.config();

// ==================================================================
// production==production==production==production
const req_enc_key = "AF1D326058D954BA55132C2CFE0DC370";
const req_salt = "AF1D326058D954BA55132C2CFE0DC370";
const res_dec_key = "DF6FED24139129E59AC0B0300487189D";
const res_salt = "DF6FED24139129E59AC0B0300487189D";
const resHashKey = "3372ef55ef77df9c20";
const reqHashKey = "12c9852b9cba2a5b62";

const merchId = "672401";
const merchPass = "ad21200a";
const prodId = "COMMITEE";
const Authurl = "https://payment1.atomtech.in/ots/aipay/auth";

const algorithm = "aes-256-cbc";
const password = Buffer.from(req_enc_key, "utf8");
const salt = Buffer.from(req_salt, "utf8");
const respassword = Buffer.from(res_dec_key, "utf8");
const ressalt = Buffer.from(res_salt, "utf8");
const iv = Buffer.from(
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	"utf8",
);

// ==================================================================

// testing==testing==testing==testing
// const req_enc_key = 'A4476C2062FFA58980DC8F79EB6A799E';
// const req_salt = 'A4476C2062FFA58980DC8F79EB6A799E';
// const res_dec_key = '75AEF0FA1B94B3C10D4F5B268F757F11';
// const res_salt = '75AEF0FA1B94B3C10D4F5B268F757F11';
// const resHashKey = 'KEYRESP123657234';

// const merchId = '317159';
// const merchPass = 'Test@123';
// const prodId = 'NSE';
// const Authurl = 'https://caller.atomtech.in/ots/aipay/auth';

// const algorithm = 'aes-256-cbc';
// const password = Buffer.from(req_enc_key, 'utf8');
// const salt = Buffer.from(req_salt, 'utf8');
// const respassword = Buffer.from(res_dec_key, 'utf8');
// const ressalt = Buffer.from(res_salt, 'utf8');
// const iv = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 'utf8');

// ==================================================================

const atomPgController = {
	getPaymentDetails: async (reqe, resp, next) => {
		try {
			const { userDetails } = reqe.body;
			console.log(userDetails, "==userDetails");

			if (!userDetails) {
				return resp
					.status(400)
					.json(new ApiResponseV2(400, "No user details passed"));
			}

			const { transId, r_id, f_id, totalPayment, email, contact } =
				userDetails;

			if (!transId) {
				return resp
					.status(400)
					.json(new ApiResponseV2(400, "Invalid transaction ID"));
			}

			if (!r_id) {
				return resp
					.status(400)
					.json(new ApiResponseV2(400, "Invalid user ID"));
			}

			if (!f_id) {
				return resp
					.status(400)
					.json(new ApiResponseV2(400, "Invalid application ID"));
			}

			if (!totalPayment) {
				return resp
					.status(400)
					.json(new ApiResponseV2(400, "Invalid payment amount"));
			}

			if (!email) {
				return resp
					.status(400)
					.json(new ApiResponseV2(400, "Invalid email"));
			}

			if (!contact) {
				return resp
					.status(400)
					.json(new ApiResponseV2(400, "Invalid contact"));
			}

			const txnId = getMerchTxnId({
				transId,
				r_id,
				f_id,
			});

			const amount = userDetails.totalPayment;
			const jsondata =
				'{"payInstrument":{"headDetails":{"version":"OTSv1.1","api":"AUTH","platform":"FLASH"},"merchDetails":{"merchId":"' +
				merchId +
				'","userId":"","password":"' +
				merchPass +
				'","merchTxnId":"' +
				txnId +
				'","merchTxnDate":"' +
				momentDates.getTimestamp() +
				'"},"payDetails":{"amount":"' +
				amount +
				'","product":"' +
				prodId +
				'","custAccNo":"","txnCurrency":"INR"},"custDetails":{"custEmail":"' +
				email +
				'","custMobile":"' +
				contact +
				'"},  "extras": {"udf1":"udf1","udf2":"udf2","udf3":"udf3","udf4":"udf4","udf5":"udf5"}}}';

			console.log(jsondata, "==jsondata==");

			const JSONString = jsondata.toString();

			console.log(JSONString, "===JSONString====");
			let encDataR = encrypt(JSONString);
			console.log(encDataR, "==encDataR==");

			var req = unirest("POST", Authurl);
			req.headers({
				"cache-control": "no-cache",
				"content-type": "application/x-www-form-urlencoded",
			});

			req.form({
				encData: encDataR,
				merchId: merchId,
			});

			req.end(async function (res) {
				console.log(res.body, "==res==");
				if (!res.body) {
					return resp.status(400).json({
						call: 0,
						message:
							"Unable to generate payment token, try again later.",
					});
				}

				if (res.error) {
					return resp.status(400).json({
						call: 0,
						message:
							JSON.stringify(res.error) ||
							"Unable to generate payment token, try again later.",
					});
				}

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
					insertDate: momentDates.getDateOnly({
						dateFormat: "YYYY-MM-DD",
					}),
					insertTime: momentDates.getTimeOnly(),
					amount: userDetails.totalPayment,
					paymentMode: ONLINE_PAYMENT,
				};

				const payStatusCode =
					jsonData["responseDetails"]["txnStatusCode"];

				if (
					payStatusCode === "OTS0000" ||
					payStatusCode === "OTS0002"
				) {
					await atomPgModel.updateTokenInPayHistory(
						resp.pool,
						insertData,
					);
					return resp.status(200).json(
						new ApiResponseV2(200, "Successfully generated token", {
							token: jsonData["atomTokenId"],
							txnId: txnId,
							merchId: merchId,
						}),
					);
				} else {
					throw new ApiError(
						400,
						"Unable to process payment try again later",
					);
				}
			});
		} catch (err) {
			next(err);
		}
	},

	verifyPayment: (req, res, next) => {
		var decrypted_data = decrypt(req.body.encData);
		let jsonData = JSON.parse(decrypted_data);
		let respArray = Object.keys(jsonData).map(key => jsonData[key]);

		let signature = generateSignature(respArray);

		if (signature === respArray[0]["payDetails"]["signature"]) {
			const merchTxnId = respArray[0].merchDetails.merchTxnId;
			const insertData = {
				pay_status_code:
					respArray[0].responseDetails.statusCode == "OTS0000" ||
					"OTS0002"
						? SUCCESS_PAYMENT_CODE
						: FAILED_PAYMENT_CODE,
				pay_message:
					respArray[0].responseDetails.message == "SUCCESS"
						? SUCCESS_PAYMENT_MSG
						: FAILED_PAYMENT_MSG,
				pg_txn_id: respArray[0].payDetails.atomTxnId,
				pay_more_details: JSON.stringify(respArray[0].payDetails),

				pay_done_date: momentDates.getDateOnly({
					dateFormat: "YYYY-MM-DD",
				}),
				pay_done_time: momentDates.getTimeOnly(),
				merch_txn_id: merchTxnId,
			};

			const payStatusCode = respArray[0]["responseDetails"]["statusCode"];

			atomPgModel
				.updatePayStatus(res.pool, insertData)
				.then(result => {
					if (result.affectedRows != 1) {
						throw new Error("Not able to update payment status");
					}
					if (
						payStatusCode == "OTS0000" ||
						payStatusCode == "OTS0002"
					) {
						return atomPgModel.updatePaymentDoneStatus(
							res.pool,
							insertData,
						);
					} else {
						return true;
					}
				})
				.then(() => {
					return atomPgModel.getUserDetailsByTransactionId(
						res.pool,
						merchTxnId,
					);
				})
				.then(_candidateDetails => {
					let { r_id, f_id } = _candidateDetails[0];
					res.redirect(`/payment-page?r=${r_id}&f=${f_id}`);
				})
				.catch(err => {
					return res.status(500).json({
						call: 0,
						message: err.message,
					});
				});
		} else {
			return res.status(500).json({
				call: 2,
				message: "Payment signature mismatched",
			});
		}
	},

	transactionStatusV1: async (req, res, next) => {
		try {
			const txnVerifycationApi = "TXNVERIFICATION";
			const userTxnDetails = req.query;

			if (!userTxnDetails) {
				return res.redirect("/home");
			}

			// const userTxnDetails = {
			// 	merch_trans_id: 'Invoicelzxwzbz0',
			// 	merchTxnDate: '2024-08-17',
			// 	amount: '1.00',
			// }; // sample

			const dataToSign = `${merchId}${merchPass}${userTxnDetails.merch_trans_id}${userTxnDetails.amount}INR${txnVerifycationApi}`; //production
			// console.log(dataToSign, '-data to sign');
			// const dataToSign = `${merchId}${merchPass}${userTxnDetails.merch_trans_id}1.00INR${txnVerifycationApi}`; //production
			const signature = generateSignature_2(dataToSign);

			const refetchPayloadData = {
				payInstrument: {
					headDetails: {
						api: txnVerifycationApi,
						source: "OTS",
					},
					merchDetails: {
						merchId: merchId,
						password: merchPass,
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

			const encryptedData = encrypt(JSON.stringify(refetchPayloadData)); // for production

			const URL_PROD = `https://payment1.atomtech.in/ots/payment/status?merchId=${merchId}&encData=${encryptedData}`; // prod URL

			axios
				.get(URL_PROD, {
					headers: {
						"cache-control": "no-cache",
						"content-type": "application/x-www-form-urlencoded",
					},
				})
				.then(result => {
					if (!result) {
						res.redirect("/home");
						return res.status(500).json({
							call: 0,
							message: "Unable to refetch transaction details",
						});
					}
					let arr = result.data.split("&")[0].split("=")[1];
					let decryptedRes = decrypt(arr);
					if (!decryptedRes) {
						return res.status(500).json({
							call: 0,
							message: "Unable to refetch transaction details",
						});
					}

					let _response = JSON.parse(decryptedRes);
					console.log(_response.payInstrument, "-_response");
					// return;

					let isSuccessFound = false;
					let currentResponse = [];

					_response.payInstrument.forEach(_payment => {
						if (isSuccessFound) return;
						currentResponse = _payment.responseDetails;

						const payStatusCode = currentResponse.statusCode;

						if (
							payStatusCode == PG_SUCCESS_PAYMENT_CODE_1 ||
							payStatusCode == PG_SUCCESS_PAYMENT_CODE_2
						) {
							isSuccessFound = true;
						}
					});
					isSuccessFound = false;
					console.log(isSuccessFound, "==isSuccess==");
					console.log(currentResponse);

					const payStatusCode = currentResponse.statusCode;
					if (payStatusCode === "OTS0506") {
						return res.status(500).json({
							call: 0,
							message: "Invalid details",
						});
					}

					if (payStatusCode == "OTS0401") {
						return res.status(500).json({
							call: 0,
							message: "No data found",
						});
					}

					const merchTxnId = userTxnDetails.merch_trans_id;
					const insertData = {
						pay_status_code:
							currentResponse.statusCode == "OTS0000" || "OTS0002"
								? SUCCESS_PAYMENT_CODE
								: FAILED_PAYMENT_CODE,
						pay_message:
							currentResponse.message == "SUCCESS"
								? SUCCESS_PAYMENT_MSG
								: FAILED_PAYMENT_MSG,
						pg_txn_id:
							_response.payInstrument[0].payDetails.atomTxnId,

						pay_more_details: JSON.stringify(
							_response.payInstrument,
						),
						pay_done_date: momentDates.getDateOnly({
							dateFormat: "YYYY-MM-DD",
						}),
						pay_done_time: momentDates.getTimeOnly(),
						merch_txn_id: merchTxnId,
					};

					// success payment
					atomPgModel
						.updatePayStatus_2(res.pool, insertData)
						.then(result => {
							if (result.affectedRows != 1) {
								throw new Error(
									"Not able to update payment status",
								);
							}
							if (
								payStatusCode == PG_SUCCESS_PAYMENT_CODE_1 ||
								payStatusCode == PG_SUCCESS_PAYMENT_CODE_2
							) {
								return atomPgModel.updatePaymentDoneStatus(
									res.pool,
									insertData,
								);
							}
							return true;
						})
						.then(() => {
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
							return res.status(500).json({
								call: 0,
								message: err.message,
							});
						});
				})
				.catch(err => {
					return res.status(500).json({
						call: 0,
						message: err.message,
					});
				});
		} catch (error) {
			res.status(500).send({ error: error?.message || "Server error" });
		}
	},

	transactionStatusV2: async (req, res, next) => {
		try {
			const txnVerifycationApi = "TXNVERIFICATION";
			const userTxnDetails = req.query;

			if (!userTxnDetails) {
				return res.redirect("/home");
			}

			// const userTxnDetails = {
			// 	merch_trans_id: 'Invoicelzxwzbz0',
			// 	merchTxnDate: '2024-08-17',
			// 	amount: '1.00',
			// }; // sample

			const dataToSign = `${merchId}${merchPass}${userTxnDetails.merch_trans_id}${userTxnDetails.amount}INR${txnVerifycationApi}`; //production
			// console.log(dataToSign, '-data to sign');
			// const dataToSign = `${merchId}${merchPass}${userTxnDetails.merch_trans_id}1.00INR${txnVerifycationApi}`; //production
			const signature = generateSignature_2(dataToSign);

			const refetchPayloadData = {
				payInstrument: {
					headDetails: {
						api: txnVerifycationApi,
						source: "OTS",
					},
					merchDetails: {
						merchId: merchId,
						password: merchPass,
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

			const encryptedData = encrypt(JSON.stringify(refetchPayloadData)); // for production

			const URL_PROD = `https://payment1.atomtech.in/ots/payment/status?merchId=${merchId}&encData=${encryptedData}`; // prod URL

			const result = await axios.get(URL_PROD, {
				headers: {
					"cache-control": "no-cache",
					"content-type": "application/x-www-form-urlencoded",
				},
			});
			if (!result) {
				res.redirect("/home");
				return res.status(500).json({
					call: 0,
					message: "Unable to refetch transaction details",
				});
			}
			let arr = result.data.split("&")[0].split("=")[1];
			let decryptedRes = decrypt(arr);
			if (!decryptedRes) {
				return res.status(500).json({
					call: 0,
					message: "Unable to refetch transaction details",
				});
			}

			let _response = JSON.parse(decryptedRes);

			let isSuccessFound = false;
			let currentResponse = [];

			_response.payInstrument.forEach(_payment => {
				if (isSuccessFound) return;
				currentResponse = _payment.responseDetails;

				const payStatusCode = currentResponse.statusCode;

				if (
					payStatusCode == PG_SUCCESS_PAYMENT_CODE_1 ||
					payStatusCode == PG_SUCCESS_PAYMENT_CODE_2
				) {
					isSuccessFound = true;
				}
			});
			isSuccessFound = false;

			const payStatusCode = currentResponse.statusCode;

			const merchTxnId = userTxnDetails.merch_trans_id;
			const insertData = {
				pay_status_code:
					currentResponse.statusCode == PG_SUCCESS_PAYMENT_CODE_1 ||
					currentResponse.statusCode === PG_SUCCESS_PAYMENT_CODE_2
						? SUCCESS_PAYMENT_CODE
						: FAILED_PAYMENT_CODE,
				pay_message:
					currentResponse.message == "SUCCESS"
						? SUCCESS_PAYMENT_MSG
						: FAILED_PAYMENT_MSG,
				pg_txn_id:
					_response?.payInstrument[0]?.payDetails?.atomTxnId || "-",

				pay_more_details: JSON.stringify(
					_response?.payInstrument || "-",
				),
				pay_done_date: momentDates.getDateOnly({
					dateFormat: "YYYY-MM-DD",
				}),
				pay_done_time: momentDates.getTimeOnly(),
				merch_txn_id: merchTxnId,
			};

			// success payment
			const paymentStatusUpdateResp = await atomPgModel.updatePayStatus_2(
				res.pool,
				insertData,
			);

			if (paymentStatusUpdateResp.affectedRows != 1) {
				throw new Error("Not able to update payment status");
			}

			if (
				payStatusCode == PG_SUCCESS_PAYMENT_CODE_1 ||
				payStatusCode == PG_SUCCESS_PAYMENT_CODE_2
			) {
				await atomPgModel.updatePaymentDoneStatus(res.pool, insertData);
				return res.status(200).json({
					call: 1,
					message: "Payment Failed",
				});
			} else {
				return res.status(200).json({
					call: 0,
					message: "Payment Failed",
				});
			}
		} catch (error) {
			return res.status(500).json({
				call: 0,
				message: error?.message || "Please try again later",
			});
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
		.createHmac("sha512", reqHashKey)
		.update(data)
		.digest("hex");
	return hash;
};

module.exports = atomPgController;
