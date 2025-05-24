const {
	getApplicationStatus,
	getRegistrationCount,
} = require("../model/candidateCountSummaryModel.js");
const { getProcessData } = require("../model/indexModel.js");
const emailController = require("./emailController.js");

const candidateCountSummaryController = {
	_getAllSummary: async (req, res, next) => {
		try {
			const applicationStatus = await getApplicationStatus(res.pool);
			const registrationCount = await getRegistrationCount(res.pool);
			const processDetails = await getProcessData(res.pool);
			const summary = {
				application_status: applicationStatus[0],
				total_registrations: registrationCount[0].total_registrations,
				process_code: processDetails[0].name,
			};

			const emailList = [
				"omkaruttirnaservice@gmail.com",
				"kopbankasso@gmail.com",
				"ankushingle7@gmail.com",
			];

			emailList.forEach(email => {
				summary.email = email;
				summary.process_name = "पुणे मर्चंट्स को-ऑप. बँक लि, पुणे";
				emailController.sendSummaryEmail(summary);
			});
			return res.status(200).send("Email sent");
		} catch (error) {
			console.log(error, "==error==");
		}
	},
};

module.exports = candidateCountSummaryController;
