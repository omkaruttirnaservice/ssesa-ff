const candidateCountSummaryModel = {
	getRegistrationCount: (pool) => {
		return new Promise((resolve, reject) => {
			const q = `select count(id) as total_registrations from utr_user_basic;`;
			pool.query(q, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	getApplicationStatus: (pool) => {
		return new Promise((resolve, reject) => {
			let q = `SELECT 
                        IFNULL(SUM(ca_payment_done = 1), 0) AS payment_done_count,
                        COUNT(id) AS application_count,
                        IFNULL(SUM(ca_general_details_done = 1), 0) AS general_details_done_count,
                        IFNULL(SUM(ca_education_details_done = 1), 0) AS education_details_done_count,
                        IFNULL(SUM(ca_document_details_done = 1), 0) AS document_details_done_count,
                        IFNULL(SUM(ca_preview_done = 1), 0) AS preview_done_count
                    FROM utr_candidate_appications;`;
			pool.query(q, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
};
module.exports = candidateCountSummaryModel;
