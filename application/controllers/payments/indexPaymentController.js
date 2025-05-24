const {
	myDate,
	getMerchTxnId,
	momentDates,
	getFromGlobalCache,
} = require("../../config/_responderSet.js");
const ApiResponse = require("../../config/ApiResponse.js");
const {
	SUCCESS_PAYMENT_CODE,
	SUCCESS_PAYMENT_MSG,
} = require("../../config/constants.js");
const indexPaymentModel = require("../../model/indexPaymentModel.js");

const __processDb = process.env.DB_DATABASE;

const indexPaymentController = {
	makePaymentView: async (req, res, next) => {
		console.log("Controller");
		var data = req.query;
		if (typeof data.r == "undefined") {
			res.status(200).json({ _call: 0, message: "resource not found" });
			return false;
		}
		data.r = Number(data.r);

		if (isNaN(data.r)) {
			res.status(200).json({ _call: 0, message: "resource not found" });
			return false;
		}
		if (typeof data.f == "undefined") {
			res.status(200).json({ _call: 0, message: "resource not found" });
			return false;
		}
		data.f = Number(data.f);
		if (isNaN(data.f)) {
			res.status(200).json({ _call: 0, message: "resource not found" });
			return false;
		}
		let pay = null;
		const _process = await getFromGlobalCache(`p_${__processDb}`);

		indexPaymentModel
			.getPaymentStatus(res.pool, data)
			.then(function (result) {
				pay = result;
				if (result.length == 1) {
					// if (result[0].payment_status == 1) {
					// 	res.redirect(`/application?r=${data.r}&f=${data.f}`);
					// 	return false;
					// }
					return indexPaymentModel.getPreviousPayList(res.pool, data);
				} else {
					res.redirect("/home");
					return false;
				}
			})
			.then(result => {
				if (_process.payment_mode == 1) {
					return res.render("new/payment-page-online", {
						title: "User Online Payment (Online)",
						payment_data: pay[0],
						previous_pay_list: result.length >= 1 ? result : [],
						r: data.r,
						f: data.f,
						p: _process,
						regIDInt: data.r,
						form_id: data.f,
						userName: pay[0].full_name,
						regPostName: pay[0].post_name,
					});
				}

				if (_process.payment_mode == 2) {
					return res.render("new/payment-page-offline", {
						title: "User Online Payment (Offline)",
						payment_data: pay[0],
						previous_pay_list: result.length >= 1 ? result : [],
						r: data.r,
						f: data.f,
						p: _process,
						regIDInt: data.r,
						form_id: data.f,
						userName: pay[0].full_name,
						regPostName: pay[0].post_name,
					});
				}
			})
			.catch(function (error, status) {
				console.log(error, "==error==");
				res.status(500).json(error);
			});
	},

	makeOfflinePayment: async (req, res, next) => {
		let _reqData = req.body;

		const process = await getFromGlobalCache(`p_${__processDb}`);

		try {
			let insertData = [
				_reqData.r,
				_reqData.f,
				SUCCESS_PAYMENT_CODE,
				SUCCESS_PAYMENT_MSG,
				getMerchTxnId({
					transId: process.p_trans_id,
					r_id: _reqData.r,
					f_id: _reqData.f,
				}),
				_reqData.utrNumber != "" ? _reqData.utrNumber : _reqData.txnId,
				JSON.stringify({ ..._reqData }),
				_reqData.totalPaymentAmount,
				_reqData.paymentMode,
				momentDates.getDateOnly({ dateFormat: "YYYY-MM-DD" }),
				momentDates.getTimeOnly(),
				momentDates.getDateOnly({ dateFormat: "YYYY-MM-DD" }),
				momentDates.getTimeOnly(),
				JSON.stringify({
					paymentData: _reqData,
				}),
			];
			console.log(insertData, "==insertData==");

			await indexPaymentModel.saveOfflinePayment(res.pool, insertData);
			await indexPaymentModel.updatePaymentStatus(res.pool, _reqData);

			return res
				.status(201)
				.json(new ApiResponse(201, true, "Payment done successful."));
		} catch (error) {
			next(error);
		}
	},
};

module.exports = indexPaymentController;
