const IndexModel = require("../application/model/indexModel.js");

const middleware = {
	compareTime(start, end) {
		if (!start || !end) {
			return null;
		}

		return start.getTime() > new Date(end).getTime();
	},

	getDateFor(processData, type) {
		if (!type) return null;

		const tempDateDetails = processData.important_dates.filter(
			date => date._column == type,
		);

		if (tempDateDetails.length > 0) {
			return tempDateDetails[0].original_date_format;
		} else return null;
	},

	redirectToHome: async function (req, res, next) {
		console.log(process.pid, "-process_id");
		// check if session has process data
		// if process data not availble in session get process data and set to session
		// console.log(req.session.process, "==req.session.process==");
		// prettier-ignore
		if (req.session?.process == undefined) {
			const _processData = await IndexModel.getProcessData(res.pool);
			req.session.process = _processData[0];
			req.session.process.impDates = {}
			req.session.process.impDates.pStartDate = middleware.getDateFor(_processData[0], "p_start_date");
			req.session.process.impDates.pRegistrationEndDate = middleware.getDateFor(_processData[0], "p_registration_end_date");
			req.session.process.impDates.pEditEndDate = middleware.getDateFor(_processData[0], "p_edit_end_date");
			req.session.process.impDates.pPrintEndDate = middleware.getDateFor(_processData[0], "p_print_end_date");
			req.session.process.impDates.pPaymentEndDate = middleware.getDateFor(_processData[0], "p_payment_end_date");
		}

		const sessionImpDates = req.session.process.impDates;
		// prettier-ignore
		switch (req.originalUrl) {
			case "/new-registration":
				if (middleware.compareTime(new Date(), sessionImpDates.pRegistrationEndDate)) {
					return res.redirect("/registrations-closed");
				} 
				break;
			case "/payment-page":
				if (middleware.compareTime(new Date(), sessionImpDates.pPaymentEndDate)) {
					return res.redirect("/");
				} 
				break;
		}
		next();
	},

	setProcessData: async function (req, res, next) {
		console.log(process.pid, "-process_id");
		// check if session has process data
		// if process data not availble in session get process data and set to session
		if (req.session?.process == undefined) {
			const _processData = await IndexModel.getProcessData(res.pool);
			req.session.process = _processData[0];
			req.session.process.impDates = {};
			req.session.process.impDates.pStartDate = middleware.getDateFor(
				_processData[0],
				"p_start_date",
			);
			req.session.process.impDates.pRegistrationEndDate =
				middleware.getDateFor(
					_processData[0],
					"p_registration_end_date",
				);
			req.session.process.impDates.pEditEndDate = middleware.getDateFor(
				_processData[0],
				"p_edit_end_date",
			);
			req.session.process.impDates.pPrintEndDate = middleware.getDateFor(
				_processData[0],
				"p_print_end_date",
			);
			req.session.process.impDates.pPaymentEndDate =
				middleware.getDateFor(_processData[0], "p_payment_end_date");
		}

		next();
	},

	checkForPoolConnection: function (req, res, next) {
		console.log(process.pid, "-process_id");
		// middleware.setSessionData(req);

		req.getConnection(function (err, connection) {
			if (err) {
				next(err);
			} else {
				res.pool = connection;
				next();
			}
		});
	},

	checkForPoolConnectionWithSession: function (req, res, next) {
		console.log(process.pid, "-process_id");
		middleware.setSessionData(req);
		console.log(req.session, "in middleware");
		if (typeof req.session.User == "undefined") return res.redirect("/");

		req.getConnection(function (err, connection) {
			if (err) {
				next(err);
			} else {
				res.pool = connection;
				next();
			}
		});
	},
	setSessionData: req => {
		// req.session.cri = 101201;
		// req.session.criString = 'MTAxMjAx';
		// req.session.cfi = 0;
		// req.session.currentPassword = 'lw8yyh28';
		// req.session.cri = 17;
		// req.session.criString = 'MTc=';
		// req.session.fullName = 'O O O';
		// req.session.fatherName = 'O';
	},
};

module.exports = {
	middleware,
};
