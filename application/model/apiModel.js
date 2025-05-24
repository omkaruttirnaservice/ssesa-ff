const runQuery = require("../config/runQuery.js");

const studentsDataModel = {
	getStudentsPhotoList: (pool, data) => {
		console.log(data, "==req.body==");
		return new Promise((resolve, reject) => {
			// NOTE : Using || for seperator
			let query = `SELECT 
							ca_photo, ca_sign 
						FROM 
							utr_candidate_appications_final AS ca `;
			if (data?.exam_date && data?.batch_list) {
				query += `WHERE 
								DATE_FORMAT(ca.ca_exam_date,'%d-%m-%Y') = '${data.exam_date}'
							AND 
								ca_batch_slot = '${data.batch_list}'`;

				pool.query(
					query,
					[data.exam_date, data.batch_list],
					function (err, result) {
						err ? reject(err) : resolve(result);
					},
				);
			} else {
				pool.query(query, function (err, result) {
					err ? reject(err) : resolve(result);
				});
			}
		});
	},

	getStudentsData: (pool, exam_date, batch_list, post_ids, server_number) => {
		return new Promise((resolve, reject) => {
			let query = `SELECT 
				ca.ca_roll_number AS id,
				ub.ub_first_name AS sl_f_name,
				ub.ub_middle_name AS sl_m_name,
				ub.ub_last_name AS sl_l_name,
				ca.ca_photo AS sl_image,
				ca.ca_sign AS sl_sign,
				ub.ub_email_id AS sl_email,
				ca.ca_fathers_name AS sl_father_name,
				ca.ca_mothers_name AS sl_mother_name,
				concat(ca.ca_address, " ", ca.ca_line_two_address) AS sl_address,
				IFNULL(NULL, '-') AS sl_mobile_number_parents,
				IFNULL(NULL, '0') AS sl_tenth_marks,
				ub.ub_mobile_number AS sl_contact_number,
				IFNULL(NULL, '-') AS sl_class,
				ca.ca_roll_number AS sl_roll_number,
				IFNULL(NULL, '-') AS sl_subject,
				IFNULL(NULL, '-') AS sl_stream,
				IFNULL(NULL, '-') AS sl_addmit_type,
				date_format(ca.ca_exam_date ,'%Y-%m-%d') AS sl_date,
				TIME_FORMAT(NOW(), '%h:%i:%s') AS sl_time,

				IFNULL(NOW(), '-') AS sl_time_stamp,
				IFNULL(NULL, '1') AS sl_added_by_login_id,
				IFNULL(NULL, '1') AS sl_is_live,
				date_format(ca.ca_dob, '%Y-%m-%d') AS sl_date_of_birth,
				IFNULL(NULL, '-') AS sl_school_name,
				ca.ca_catagory AS sl_catagory,
				ca.id AS sl_application_number,
				IFNULL(NULL, '0') AS sl_is_physical_handicap,
				IFNULL(NULL, '0') AS sl_is_physical_handicap_desc,
				ca.ca_post_id AS sl_post_id,
				ca.ca_post_name AS sl_post,
				ca.ca_center_code AS sl_center_code,
				ca.ca_batch_slot AS sl_batch_no,
				date_format(ca.ca_exam_date, '%Y-%m-%d') as sl_exam_date,
				date_format(ca.ca_dob, '%d%m%Y') AS sl_password,
                lab_details.center_id,
				lab_details.floor,
				lab_details.department,
				lab_details.lab_no,
				lab_details.lab_name,
				lab_details.count,
				ca.pc_no AS pc_no

			FROM
				utr_candidate_appications_final AS ca

            INNER JOIN utr_user_basic AS ub 
            ON ca.ca_reg_id = ub.id 

            INNER JOIN utr_lab_wise_allotment_details AS lab_details
            ON ca.ca_alloted_lab_id = lab_details.id
            `;

			if (exam_date && batch_list) {
				query += `WHERE DATE_FORMAT(ca.ca_exam_date,'%d-%m-%Y') = '${exam_date}'
			AND ca_batch_slot = '${batch_list}' 
			AND ca_post_id IN (${post_ids})
			AND ca_alloted_server_id = ${Number(server_number)} `;
			}
			query += ` ORDER BY ca.ca_roll_number;`;

			console.log(query, "==query==");

			pool.query(query, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	// centers list download
	downloadCentersList: pool => {
		return new Promise((resolve, reject) => {
			let query = `SELECT * FROM utr_collage`;
			pool.query(query, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	// save published test details
	savePublishedTestDetails: (pool, data) => {
		const q = `INSERT INTO tm_publish_test_list (
						id,
						ptl_active_date,
						ptl_time,
						ptl_link,
						ptl_test_id,
						ptl_added_date,
						ptl_added_time,
						ptl_time_tramp,
						ptl_test_description,
						ptl_is_live,
						ptl_aouth_id,
						ptl_is_test_done,
						ptl_test_info,
						mt_name,
						mt_added_date,
						mt_descp,
						mt_is_live,
						mt_time_stamp,
						mt_type,
						tm_aouth_id,
						mt_test_time,
						mt_total_test_takan,
						mt_is_negative,
						mt_negativ_mark,
						mt_mark_per_question,
						mt_passing_out_of,
						mt_total_marks,
						mt_pattern_type,
						mt_total_test_question,
						mt_added_time,
						ptl_link_1,
						tm_allow_to,
						ptl_test_mode,
						is_test_loaded,
						is_student_added,
						ptl_master_exam_id,
						ptl_master_exam_name,
						is_test_generated,
						is_push_done,
						createdAt,
						updatedAt)
					VALUES (?)
					
					ON DUPLICATE KEY UPDATE
						ptl_active_date= VALUES(ptl_active_date),
						ptl_time= VALUES(ptl_time),
						ptl_link= VALUES(ptl_link),
						ptl_test_id= VALUES(ptl_test_id),
						ptl_added_date= VALUES(ptl_added_date),
						ptl_added_time= VALUES(ptl_added_time),
						ptl_time_tramp= VALUES(ptl_time_tramp),
						ptl_test_description= VALUES(ptl_test_description),
						ptl_is_live= VALUES(ptl_is_live),
						ptl_aouth_id= VALUES(ptl_aouth_id),
						ptl_is_test_done= VALUES(ptl_is_test_done),
						ptl_test_info= VALUES(ptl_test_info),
						mt_name= VALUES(mt_name),
						mt_added_date= VALUES(mt_added_date),
						mt_descp= VALUES(mt_descp),
						mt_is_live= VALUES(mt_is_live),
						mt_time_stamp= VALUES(mt_time_stamp),
						mt_type= VALUES(mt_type),
						tm_aouth_id= VALUES(tm_aouth_id),
						mt_test_time= VALUES(mt_test_time),
						mt_total_test_takan= VALUES(mt_total_test_takan),
						mt_is_negative= VALUES(mt_is_negative),
						mt_negativ_mark= VALUES(mt_negativ_mark),
						mt_mark_per_question= VALUES(mt_mark_per_question),
						mt_passing_out_of= VALUES(mt_passing_out_of),
						mt_total_marks= VALUES(mt_total_marks),
						mt_pattern_type= VALUES(mt_pattern_type),
						mt_total_test_question= VALUES(mt_total_test_question),
						mt_added_time= VALUES(mt_added_time),
						ptl_link_1= VALUES(ptl_link_1),
						tm_allow_to= VALUES(tm_allow_to),
						ptl_test_mode= VALUES(ptl_test_mode),
						is_test_loaded= VALUES(is_test_loaded),
						is_student_added= VALUES(is_student_added),
						ptl_master_exam_id= VALUES(ptl_master_exam_id),
						ptl_master_exam_name= VALUES(ptl_master_exam_name),
						is_test_generated= VALUES(is_test_generated),
						is_push_done= VALUES(is_push_done)
					`;
		const insertData = [
			data.id,
			data.ptl_active_date,
			data.ptl_time,
			data.ptl_link,
			data.ptl_test_id,
			data.ptl_added_date,
			data.ptl_added_time,
			data.ptl_time_tramp,
			data.ptl_test_description,
			data.ptl_is_live,
			data.ptl_aouth_id,
			data.ptl_is_test_done,
			data.ptl_test_info,
			data.mt_name,
			data.mt_added_date,
			data.mt_descp,
			data.mt_is_live,
			data.mt_time_stamp,
			data.mt_type,
			data.tm_aouth_id,
			data.mt_test_time,
			data.mt_total_test_takan,
			data.mt_is_negative,
			data.mt_negativ_mark,
			data.mt_mark_per_question,
			data.mt_passing_out_of,
			data.mt_total_marks,
			data.mt_pattern_type,
			data.mt_total_test_question,
			data.mt_added_time,
			data.ptl_link_1,
			data.tm_allow_to,
			data.ptl_test_mode,
			data.is_test_loaded,
			data.is_student_added,
			data.ptl_master_exam_id,
			data.ptl_master_exam_name,
			data.is_test_generated,
			data.is_push_done,
			data.createdAt,
			data.updatedAt,
		];
		return new Promise((resolve, reject) => {
			pool.query(q, [insertData], function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	// remove old question paper if uploaded before
	removeOldQuestionPaper: (pool, data) => {
		let q = `DELETE FROM tm_test_question_sets WHERE (q_id, tqs_test_id) IN `;

		q += ` ( `;
		const WHERE = [];
		data.q_id.forEach(_q_id => {
			WHERE.push(`(${_q_id}, ${data.ptl_test_id})`);
		});
		q += WHERE.toString();
		q += ` ) `;

		console.log(q, "==q==");

		return new Promise((resolve, reject) => {
			pool.query(q, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	// save question paper as per published test list
	saveQuestionPaper: (pool, data) => {
		let q = `INSERT INTO tm_test_question_sets (
						q_id,
						tqs_test_id,
						section_id,
						section_name,
						sub_topic_id,
						sub_topic_section,
						main_topic_id,
						main_topic_name,
						q,
						q_a,
						q_b,
						q_c,
						q_d,
						q_e,
						q_display_type,
						q_ask_in,
						q_data_type,
						q_mat_data,
						q_col_a,
						q_col_b,
						q_mat_id,
						q_i_a,
						q_i_b,
						q_i_c,
						q_i_d,
						q_i_e,
						q_i_q,
						q_i_sol,
						stl_topic_number,
						sl_section_no,
						q_sol,
						q_ans,
						q_mat_ans,
						q_mat_ans_row,
						q_col_display_type,
						question_no,
						mark_per_question,
						tqs_question_id,
						tqs_chapter_id,
						tqs_section_id,
						pub_name,
						book_name,
						page_name,
						mqs_ask_in_month,
						mqs_ask_in_year,
						mqs_leval
					)
					VALUES ?`;

		let insertData = [];

		data.forEach(_question => {
			insertData.push([
				`${_question.q_id}`,
				`${_question.tqs_test_id}`,
				`${_question.section_id}`,
				`${_question.section_name}`,
				`${_question.sub_topic_id}`,
				`${_question.sub_topic_section}`,
				`${_question.main_topic_id}`,
				`${_question.main_topic_name}`,
				`${_question.q}`,
				`${_question.q_a}`,
				`${_question.q_b}`,
				`${_question.q_c}`,
				`${_question.q_d}`,
				`${_question.q_e}`,
				`${_question.q_display_type}`,
				`${_question.q_ask_in}`,
				`${_question.q_data_type}`,
				`${_question.q_mat_data}`,
				`${_question.q_col_a}`,
				`${_question.q_col_b}`,
				`${_question.q_mat_id}`,
				`${_question.q_i_a}`,
				`${_question.q_i_b}`,
				`${_question.q_i_c}`,
				`${_question.q_i_d}`,
				`${_question.q_i_e}`,
				`${_question.q_i_q}`,
				`${_question.q_i_sol}`,
				`${_question.stl_topic_number}`,
				`${_question.sl_section_no}`,
				`${_question.q_sol}`,
				`${_question.q_ans}`,
				`${_question.q_mat_ans}`,
				`${_question.q_mat_ans_row}`,
				`${_question.q_col_display_type}`,
				`${_question.question_no}`,
				`${_question.mark_per_question}`,
				`${_question.tqs_question_id}`,
				`${_question.tqs_chapter_id}`,
				`${_question.tqs_section_id}`,
				`${_question.pub_name}`,
				`${_question.book_name}`,
				`${_question.page_name}`,
				`${_question.mqs_ask_in_month}`,
				`${_question.mqs_ask_in_year}`,
				`${_question.mqs_leval}`,
			]);
		});
		return new Promise((resolve, reject) => {
			pool.query(q, [insertData], function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	// update captured photo when qr code is scanned
	updateCandidateDetailsWhenPhotoIsCaptured: (pool, data) => {
		const q = `UPDATE utr_candidate_appications_final 
			SET 
				ca_is_approved = 'YES',
				ca_approved_photo = ?,
				ca_aproved_by = ?	
			WHERE ca_roll_number = ?`;
		return new Promise((resolve, reject) => {
			pool.query(
				q,
				[
					data.awsFilePath,
					Number(data.approved_by_user_id),
					Number(data.rollNo),
				],
				function (err, result) {
					err ? reject(err) : resolve(result);
				},
			);
		});
	},

	// authentication for qr-code scan application
	login: (pool, data) => {
		const q = `SELECT * 
					FROM utr_master_auth 
					WHERE user_name = ? 
						AND password = ?
					LIMIT 1`;
		return new Promise((resolve, reject) => {
			pool.query(
				q,
				[data.username, data.password],
				function (err, result) {
					err ? reject(err) : resolve(result);
				},
			);
		});
	},

	// getting post list for question-paper-generation panel
	getPostList: pool => {
		const q = `SELECT 
					 ca_post_name,
					 ca_post_id
				FROM utr_candidate_appications_final 
				GROUP BY ca_post_name`;

		return new Promise((resolve, reject) => {
			pool.query(q, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	// GET exam server and centers list for exam-panel (in request for login button on exam panel /admin login)
	getExamServerAndCentersList: pool => {
		const q = `SELECT 
						(SELECT JSON_ARRAYAGG(
								JSON_OBJECT("c_collageName",c_collageName,
											"c_collageCode",c_collageCode)) AS utr_collage FROM utr_collage) AS center_details,
											
						(SELECT JSON_ARRAYAGG(
									JSON_OBJECT(
										"server_id", id,
										"server_name",server_name,
										"server_student_count", server_student_count,
										"server_number",server_number
									)
								) as server_list FROM utr_server_list) AS server_details`;
		return new Promise((resolve, reject) => {
			pool.query(q, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	getServerLoginDetails: (pool, serverId) => {
		const q = `SELECT * FROM utr_server_list WHERE id = ?`;
		return new Promise((resolve, reject) => {
			pool.query(q, Number(serverId), function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},
};

const nodeDetailsModel = {
	saveEstimationNodeDetails: (pool, data) => {
		let values = [];

		data.forEach((nodeDetail, idx) => {
			let isLast = data.length == idx;
			values.push([
				`( ${nodeDetail.id}, '${nodeDetail.department}', '${nodeDetail.floor}', '${nodeDetail.lab}', '${nodeDetail.pc_no}', ${nodeDetail?.mac_id ? `"${nodeDetail?.mac_id}"` : "NULL"}, ${nodeDetail?.ip_add ? `"${nodeDetail?.ip_add}"` : "NULL"}, '${nodeDetail.node_type}', '${nodeDetail.center_code}', '${nodeDetail.center_name}', '${nodeDetail.estimation_status}', '${nodeDetail.estimation_min}', '${nodeDetail.estimation_sec}')`,
			]);
		});

		const q = `
		INSERT INTO node_details (
									id,
									department,
									floor,
									lab,
									pc_no,
									mac_id,
									ip_add,
									node_type,
									center_code,
									center_name,
									estimation_status,
									estimation_min,
									estimation_sec
								)
		VALUES ${values.join(",")}
		
		ON DUPLICATE KEY UPDATE
		id = VALUES(id),
		department = VALUES(department),
		floor = VALUES(floor),
		lab = VALUES(lab),
		pc_no = VALUES(pc_no),
		mac_id = VALUES(mac_id),
		ip_add = VALUES(ip_add),
		node_type = VALUES(node_type),
		center_code = VALUES(center_code),
		center_name = VALUES(center_name),
		estimation_status = VALUES(estimation_status),
		estimation_min = VALUES(estimation_min),
		estimation_sec = VALUES(estimation_sec)
		`;

		return new Promise((resolve, reject) => {
			pool.query(q, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	saveCenterDetails: (pool, data) => {
		const q = `INSERT INTO centers_list 
					(
						id, 
						center_name, 
						department_details
					)
					VALUES (
								 ${data.id}, 
								'${data.center_name}', 
								'${data.department_details}'
							)
					ON DUPLICATE KEY UPDATE
					id = VALUES(id),
					center_name = VALUES(center_name),
					department_details = VALUES(department_details)
					`;
		return new Promise((resolve, reject) => {
			pool.query(q, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	getNodeDetailsByServerId: (pool, serverId) => {
		const q = `SELECT * FROM node_details WHERE server_id =?`;
		return new Promise((resolve, reject) => {
			pool.query(q, [Number(serverId)], function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},
};

const QRAppModel = {
	getAllotmentInfo: async pool => {
		const q = `SELECT * FROM utr_allotment_info GROUP BY ai_slot_number`;
		return await runQuery(pool, q);
	},

	getAttendanceCount: async (pool, slot) => {
		const q = `
		SELECT 
			(count(id)) AS total_student_count,
			COUNT(IF (ca_is_approved = 'YES',1,null)) AS total_present_count
		FROM 
			ff_dev_db.utr_candidate_appications_final
		WHERE
			ca_batch_slot = ?
		GROUP BY 
			ca_batch_slot;
		`;
		return await runQuery(pool, q, slot);
	},
};

module.exports = { studentsDataModel, nodeDetailsModel, QRAppModel };
