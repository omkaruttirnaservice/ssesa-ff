const atomPgModel = {
	updateTokenInPayHistory: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO payment_history 
							(r_id, 
							f_id, 
							pay_merch_txn_id, 
							pay_start_date, 
							pay_start_time,
							pay_amount,
							pay_type) 
						VALUES (?, ?, ?, ?, ?, ?, ?)`;

			pool.query(
				query,
				[
					data.r_id,
					data.f_id,
					data.txn_id,
					data.insertDate,
					data.insertTime,
					data.amount,
					data.paymentMode,
				],
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

	updatePayStatus: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `UPDATE payment_history 
							SET
								pay_status_code= ?,
								pay_message = ?,
								pg_txn_id= ?,
								pay_more_details= ?,
								pay_done_date= ?,
								pay_done_time= ?
							WHERE 
								pay_merch_txn_id = ? `;

			// prettier-ignore
			pool.query(
				query,
				[ 
					data.pay_status_code, 
					data.pay_message, 
					data.pg_txn_id,
					data.pay_more_details, 
					data.pay_done_date, 
					data.pay_done_time, 
					data.merch_txn_id,
				],
				function (err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
	},

	updatePayStatus_2: function (pool, data) {
		// after refetching transactions
		return new Promise((resolve, reject) => {
			var query = `UPDATE payment_history 
							SET
								pay_status_code = ?,
								pay_message = ?,
								pg_txn_id = ?,
								pay_more_details_2 = ?,
								pay_done_date = ?,
								pay_done_time = ?
							WHERE 
								pay_merch_txn_id = ? `;

			// prettier-ignore
			pool.query(
				query,
				[ 
					data.pay_status_code, 
					data.pay_message, 
					data.pg_txn_id,
					data.pay_more_details, 
					data.pay_done_date, 
					data.pay_done_time, 
					data.merch_txn_id,
				],
				function (err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		});
	},

	getUserDetailsByTransactionId: function (pool, merchTxnId) {
		return new Promise((resolve, reject) => {
			var query = `SELECT 
							ca.id as f_id,
							ca_reg_id as r_id

						FROM utr_candidate_appications as ca 

						INNER JOIN
							payment_history as ph
						ON
							ca.ca_reg_id = ph.r_id AND
							ca.id = ph.f_id
						
						WHERE ph.pay_merch_txn_id = ?`;
			pool.query(query, merchTxnId, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	updatePaymentDoneStatus: (pool, data) => {
		return new Promise((resolve, reject) => {
			let q = `UPDATE 
						utr_candidate_appications as ca
					INNER JOIN  payment_history as ph 
					ON 
						ca.ca_reg_id = ph.r_id AND
						ca.id = ph.f_id
						SET ca.ca_payment_done = 1
					WHERE
						ph.pay_merch_txn_id = ?
					`;
			pool.query(q, data.merch_txn_id, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},
};

module.exports = atomPgModel;
