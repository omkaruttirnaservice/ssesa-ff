const { io } = require("socket.io-client");
const {
	getFromGlobalCache,
	setToGlobalCache,
	compareTime,
	getDateFor,
} = require("../application/config/_responderSet.js");
const IndexModel = require("../application/model/indexModel.js");

const __processDb = process.env.DB_DATABASE;

const middleware = {
	redirectToHome: async function (req, res, next) {
		console.log(process.pid, "-process_id1");
		console.log("Middleware 2");
		// check if session has process data
		// if process data not availble in session get process data and set to session

		if (
			!(await getFromGlobalCache(`p_${__processDb}`)) ||
			!(await getFromGlobalCache(`impDates_${__processDb}`))
		) {
			let _processData = await IndexModel.getProcessData(res.pool);
			await setToGlobalCache(`p_${__processDb}`, _processData[0], 6000);

			let p = _processData[0];

			const impDates = {
				pStartDate: getDateFor(p, "p_start_date"),
				pRegistrationEndDate: getDateFor(p, "p_registration_end_date"),
				pEditEndDate: getDateFor(p, "p_edit_end_date"),
				pPrintEndDate: getDateFor(p, "p_print_end_date"),
				pPaymentEndDate: getDateFor(p, "p_payment_end_date"),
			};
			await setToGlobalCache(`impDates_${__processDb}`, impDates, 600);
		}

		const _impDates = await getFromGlobalCache(`impDates_${__processDb}`);
		console.log(_impDates);
		const originalUrl = req.originalUrl.split("?")[0];
		// if (originalUrl === "/new-registration") {
		// 	if (compareTime(new Date(), _impDates.pRegistrationEndDate)) {
		// 		return res.redirect("/registrations-closed");
		// 	}
		// } else if (originalUrl === "/payment-page") {
		// 	if (compareTime(new Date(), _impDates.pPaymentEndDate)) {
		// 		return res.redirect("/");
		// 	}
		// }
		next();
	},

	setProcessData: async function (req, res, next) {
		console.log(process.pid, "-process_id");
		console.log("Middleware 1");

		// check if session has process data
		// if process data not availble in session get process data and set to session
		if (
			!(await getFromGlobalCache(`p_${__processDb}`)) ||
			!(await getFromGlobalCache(`impDates_${__processDb}`))
		) {
			let _processData = await IndexModel.getProcessData(res.pool);
			await setToGlobalCache(`p_${__processDb}`, _processData[0], 6000);

			let p = _processData[0];

			const impDates = {
				pStartDate: getDateFor(p, "p_start_date"),
				pRegistrationEndDate: getDateFor(p, "p_registration_end_date"),
				pEditEndDate: getDateFor(p, "p_edit_end_date"),
				pPrintEndDate: getDateFor(p, "p_print_end_date"),
				pPaymentEndDate: getDateFor(p, "p_payment_end_date"),
			};
			await setToGlobalCache(`impDates_${__processDb}`, impDates, 600);
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
