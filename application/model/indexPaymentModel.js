const indexPaymentModel = {
	getPaymentStatus: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT 
                                UPPER(CONCAT(ub_first_name,' ',ub_middle_name,' ',ub_last_name)) as full_name,
                                ub_mobile_number as mobile_name,
                                ub_email_id as email_id,
                                ub.id as log_id,
                                ca.id  as application_id,
                                ca.ca_post_name as post_name,
                                ca.ca_catagory as catagory,
                                DATE_FORMAT(ca.ca_dob,'%d / %m / %Y') as date_of_birth,
                                ca.ca_preview_done as p_done,
                                ca_payment  as post_fee,
                                ca_tax_payment as post_fee_tax,
                                ca_convenience_charge as convenience_charge,
                                ca_payment_done as payment_status,
                                ca_detailsMainPost,
                                ca_challanBranchCode as challanBranchCode
                            FROM 
                                utr_candidate_appications as ca
							INNER JOIN 
                                utr_user_basic as ub ON
                                ub.id = ca.ca_reg_id 
                            WHERE 
                                ca_reg_id = ? AND  ca.id = ? AND ca.ca_preview_done = 1
                                GROUP BY ca.id
							LIMIT 1
                            `;
			pool.query(query, [data.r, data.f], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	getPreviousPayList: (pool, data) => {
		return new Promise((resolve, reject) => {
			let q = `SELECT 
						*,
						DATE_FORMAT(pay_start_date, '%Y-%m-%d') as payStartDate, 
						DATE_FORMAT(pay_done_date, '%Y-%m-%d') as payDoneDate, 
						pay_done_time as payDoneTime
					FROM 
						payment_history
					WHERE 
						r_id = ? 
					AND 
						f_id = ?`;
			pool.query(q, [data.r, data.f], function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	updatePaymentStatus: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE 
							utr_candidate_appications 
						SET 
							ca_payment_done = 1
						WHERE 
							ca_reg_id = ? AND 
							id = ?`;
			pool.query(
				query,
				[Number(data.r), Number(data.f)],
				function (err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				},
			);
		});
	},

	saveOfflinePayment: (pool, data) => {
		return new Promise((resolve, reject) => {
			const q = `insert into payment_history (
							r_id,
							f_id,
							pay_status_code,
							pay_message,
							pay_merch_txn_id,
							pg_txn_id,
							pay_more_details,
							pay_amount,
							pay_type,
							pay_start_date,
							pay_start_time,
							pay_done_date,
							pay_done_time,
							pay_more_details_2
						) VALUES (?);`;
			pool.query(q, [data], function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},
};
module.exports = indexPaymentModel;
