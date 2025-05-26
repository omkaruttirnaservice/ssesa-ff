var responderSet = require("../config/_responderSet");
const runQuery = require("../config/runQuery.js");
var myDates = responderSet.myDate;

module.exports = {
	insertUserBasicFromExcel: async (candidates, pool) => {
		let userBasicQuery = `INSERT INTO utr_user_basic 
		
						(id, 
						ub_password, 
						ub_first_name, 
						ub_mobile_number,
						ub_email_id
						)
					VALUES `;

		let applicationQuery = `INSERT INTO utr_candidate_appications 
					(
						id,
						ca_reg_id,
						ca_post_id,
						ca_post_name,
						ca_detailsMainPost,
						ca_dob,
						ca_gender,
						ca_catagory,
						ca_detailsSubCategory,
						ca_address
					) VALUES `;

		let regIdStart = 1050001;
		let appIdStart = 500001;

		function getPassword() {
			return Math.floor(100000 + Math.random() * 900000);
		}

		let postName = "Clerk";
		let clerkPostId = 1;
		let mainPostName = "SSES";

		candidates.forEach((_c, idx) => {
			regIdStart++;
			appIdStart++;
			let isLast = candidates.length == idx + 1;
			userBasicQuery += `(${regIdStart}, "${getPassword()}", "${_c.name?.toUpperCase()}", "${_c["Mobile No."]}", "${_c["E-mail ID"]}")${!isLast ? "," : ""}`;
			applicationQuery += `(${appIdStart}, ${regIdStart}, ${clerkPostId}, "${postName}", "${mainPostName}", "${_c["Date of Birth"]}", "${_c["Gender"]}", "${_c["Category"]}", "${_c["Cast"]}", "${_c.address}")${!isLast ? "," : ""}`;
		});

		// truncate all old data
		const truncateBasicTableQuery = `TRUNCATE utr_user_basic`;
		const trucnateApplicationTableQuery = `TRUNCATE utr_candidate_appications`;

		console.log("Truncating basic table");
		await runQuery(pool, truncateBasicTableQuery);

		console.log("Truncating application table");
		await runQuery(pool, trucnateApplicationTableQuery);

		console.log("Inserting basic data");
		await runQuery(pool, userBasicQuery);

		console.log("Inserting application data");
		await runQuery(pool, applicationQuery);

		console.log("Inserted candidates successfully");
	},

	getCandidateInformation: async (pool, r, f) => {
		const query = `SELECT 
						ub.id AS r_id,
						ub_first_name,
						ub_email_id,
						ub_mobile_number,

						ca.id AS f_id,
						ca.ca_gender,
						DATE_FORMAT(ca_dob, '%Y-%m-%d') as dob,
						ca_catagory,
						ca_detailsSubCategory,
						ca_address,
						ca_post_name,
						ca_post_id

					FROM utr_user_basic as ub

					INNER JOIN utr_candidate_appications as ca

					ON ub.id = ca.ca_reg_id

					WHERE ub.id = ${Number(r)} AND ca.id = ${Number(f)} LIMIT 1`;

		return await runQuery(pool, query);
	},

	addUpdateDetailsLog: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `INSERT INTO utr_candidate_details_logs
							(
								r_id,
								f_id,
								info,
								timestamp
							)
						VALUES (${data.r_id}, ${data.f_id}, '${JSON.stringify(data)}', NOW())`;

			pool.query(query, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	updateBasicDetails_V2: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE utr_user_basic
						SET 
							ub_first_name = '${data.ub_first_name}',
							ub_mobile_number = '${data["ub_mobile_number"]}',
							ub_alternative_number = '${data["ub_alternative_number"]}',
							ub_email_id = '${data["ub_email_id"]}'

						WHERE id = ${data.r_id} `;

			pool.query(query, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	updateGeneralDetails_V2: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE utr_candidate_appications
						SET 
							ca_dob                                            = '${data.dob}',
							ca_gender                                         = '${data.ca_gender}',
							ca_catagory                                       = '${data.ca_catagory}',
							ca_detailsSubCategory 							  = '${data.ca_detailsSubCategory}',
							ca_address                                        = '${data.ca_address}',
							ca_general_details_done                           = '1'

						WHERE ca_reg_id = ${data.r_id}
						AND id = ${data.f_id} `;

			pool.query(query, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	noticeFiles: pool => {
		return new Promise((resolve, reject) => {
			let query = `SELECT file_name  AS fileName,
                                file_blink AS fileBlink
                         FROM utr_process_important_notices;`;
			pool.query(query, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},
	headerDetails: async pool => {
		return new Promise((resolve, reject) => {
			let query = `SELECT help_mobile_number AS mobNo, help_email_id AS emailId
                         FROM utr_header_details LIMIT 1`;
			pool.query(query, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},
	getRegistrationCount: async pool => {
		return new Promise((resolve, reject) => {
			let query = `select post_name, count(distinct utr_candidate_appications.ca_reg_id) AS registrations
                         From utr_candidate_appications
                                  inner join utr_post
                                             on utr_candidate_appications.ca_post_id = utr_post.id
                         group by utr_post.id;`;

			pool.query(query, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	getSuccessPayCount: async pool => {
		return new Promise((resolve, reject) => {
			let query = `SELECT count(id) AS payments
                         FROM payment_history
                         where code = 'PAYMENT_SUCCESS';`;

			pool.query(query, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},
	getPostCategoryList: function (pool) {
		return new Promise((resolve, reject) => {
			let query = `SELECT pi_post_id     AS postId,
                                pi_category_id AS category_id,
                                cat_name,
                                pi_payment     as payment,
                                pi_tax_per,
                                pi_tax_payment
                         FROM utr_payment_info pi
                                  INNER JOIN utr_category cat
                                             ON pi.pi_category_id = cat.id`;
			pool.query(query, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	getCategoryList: function (pool) {
		return new Promise((resolve, reject) => {
			let query = `SELECT *
                         FROM utr_category`;
			pool.query(query, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	getSammanterList: function (pool) {
		return new Promise((resolve, reject) => {
			let query = `SELECT sm_name,
                                spc_post_id,
                                spc_category_id,
                                spc_sammanter_id,
                                cat_name
                         FROM utr_sammanter_post_category as sammanter
                                  INNER JOIN
                              utr_sammanter_list as s_list ON
                                  s_list.id = sammanter.spc_sammanter_id
                                  INNER JOIN
                              utr_category as category ON
                                  category.id = sammanter.spc_category_id
			`;
			pool.query(query, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	getPostData: function (pool, postId = null) {
		return new Promise((resolve, reject) => {
			let query = `SELECT id                                      as id,
                                post_name                               as name,
                                main_post_name                          as main_post_name,
                                post_com_citification,
                                post_graduation,
                                post_tenth,
                                DATE_FORMAT(post_date_from, '%Y-%m-%d') as post_date_from,
                                DATE_FORMAT(post_date_from, '%d-%M-%Y') as post_date_from_1,
                                post_age_limit,
                                post_age_from,
                                post_allowed_category,
                                post_eligibility_checkboxes,
								post_languages_list as languageDetails
						FROM utr_post
						${postId ? " WHERE id=" + postId : ""}`;
			pool.query(query, function (err, result) {
				if (err) {
					console.log(err);
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					console.log(result, "==result postData==");
					resolve(result);
				}
			});
		});
	},

	getPostDataById: function (pool, id) {
		return new Promise((resolve, reject) => {
			let query = `SELECT id             as id,
                                post_name      as name,
                                main_post_name as main_post_name,
                                post_com_citification,
                                post_graduation,
                                post_tenth
                         FROM utr_post
                         WHERE id = ?`;
			pool.query(query, [id], function (err, result) {
				if (err) {
					console.log(err);
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},

	getDistrictsList: function (pool) {
		return new Promise((resolve, reject) => {
			const q = `SELECT id, d_state_id, d_name, d_is_visible
                       FROM utr_districts
                       WHERE d_is_visible = 1
                       ORDER BY d_name;`;
			pool.query(q, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	getStatesList: function (pool) {
		return new Promise((resolve, reject) => {
			const q = `SELECT id, s_name, s_is_visible
                       FROM utr_states
                       WHERE s_is_visible = 1
                       ORDER BY s_name;`;
			pool.query(q, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	getHtRulesList: function (pool) {
		const q = `SELECT * FROM utr_hallticket_rules`;
		return new Promise((resolve, reject) => {
			pool.query(q, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	getHtRulesFilesList: function (pool) {
		const q = `SELECT * FROM utr_hallticket_rules_files`;
		return new Promise((resolve, reject) => {
			pool.query(q, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	getProcessData: function (pool) {
		return new Promise((resolve, reject) => {
			let query = `
                SELECT 
						p.id                                        AS processId,
						p_name                                      AS name,

						p_payment_mode                              AS payment_mode,
						p_process_mode 							   AS process_mode,

						p_image                                     AS image,
						p_print_hall_ticket                         AS print_hall_ticket,
						hd.help_mobile_number                       AS help_mobile_number,
						hd.help_email_id                            AS help_email_id,
						p_trans_id,
						p_bank_account_name,
						p_bank_name,
						p_saving_account_number,
						p_ifsc_code,
						p_form_filling_site,
						scroll_notice.name  						   AS scrolling_notice_name,
						scroll_notice.blink_status                  AS is_show_scrolling_notice,
						p_is_ht_aadhaar_required,

						p_is_live,
						p_under_construction,
						p_anwser_key,
						p_result_decleared,
						p_interview_schedule_decleared

                FROM utr_process AS p

				LEFT JOIN utr_header_details AS hd 
				ON p.id = hd.process_id
				
				LEFT JOIN utr_process_important_scroll_notice AS scroll_notice
				ON scroll_notice.process_id = p.id
				;`;

			pool.query(query, function (err, result) {
				if (err) {
					reject(err);
				} else {
					let q = `SELECT * FROM utr_process_important_notices ORDER BY file_order`;

					pool.query(q, function (err, result_1) {
						result[0] = {
							...result[0],
							notices: [...(result_1 || [])],
						};
						let q = `SELECT * FROM utr_process_important_scroll_notice;`;
						pool.query(q, function (err, result_2) {
							result[0] = {
								...result[0],
								scrollNotices: [...result_2],
							};
							if (err) {
								reject(err);
							} else {
								let q = `SELECT 
											imp_dates.imp_date_column_name as _column,
											imp_dates.imp_date_title as title,
											imp_dates.imp_date_secondary_title as secondary_title ,
											DATE_FORMAT(imp_dates.imp_date,"%d-%m-%Y") as date ,
											DATE_FORMAT(imp_dates.imp_date,"%h:%i") as time ,
											DATE_FORMAT(imp_dates.imp_date,"%p") as time_am_pm ,
											imp_dates.imp_date as original_date_format ,
											imp_dates.id as id 
										FROM utr_important_dates as imp_dates

										ORDER BY id;`;
								pool.query(q, function (err, result_3) {
									result[0] = {
										...result[0],
										important_dates: [...result_3],
									};

									err ? reject(err) : resolve(result);
								});
							}
						});
					});
				}
			});
		});
	},

	getPartialProcessData: function (pool, fields) {
		return new Promise((resolve, reject) => {
			let query = `
                SELECT 
						p.id                                        AS processId,
						p_name                                      AS name,

						p_payment_mode                              AS payment_mode,
						p_process_mode 							    AS process_mode,

						p_image                                     AS image,
						p_print_hall_ticket                         AS print_hall_ticket,
						hd.help_mobile_number                       AS help_mobile_number,
						hd.help_email_id                            AS help_email_id,
						p_trans_id,
						p_bank_account_name,
						p_bank_name,
						p_saving_account_number,
						p_ifsc_code,
						p_form_filling_site,
						scroll_notice.name  						   AS scrolling_notice_name,
						scroll_notice.blink_status                  AS is_show_scrolling_notice,
						p_is_ht_aadhaar_required,

						p_is_live,
						p_under_construction,
						p_anwser_key,
						p_result_decleared,
						p_interview_schedule_decleared

                FROM utr_process AS p

				LEFT JOIN utr_header_details AS hd 
				ON p.id = hd.process_id
				
				LEFT JOIN utr_process_important_scroll_notice AS scroll_notice
				ON scroll_notice.process_id = p.id;`;

			pool.query(query, function (err, result) {
				if (err) {
					reject(err);
				} else {
					let q = `SELECT * FROM utr_process_important_notices ORDER BY file_order`;

					pool.query(q, function (err, result_1) {
						result[0] = {
							...result[0],
							notices: [...(result_1 || [])],
						};
						let q = `SELECT * FROM utr_process_important_scroll_notice;`;
						pool.query(q, function (err, result_2) {
							result[0] = {
								...result[0],
								scrollNotices: [...result_2],
							};
							if (err) {
								reject(err);
							} else {
								let q = `SELECT 
											imp_dates.imp_date_column_name as _column,
											imp_dates.imp_date_title as title,
											imp_dates.imp_date_secondary_title as secondary_title ,
											DATE_FORMAT(imp_dates.imp_date,"%d-%m-%Y") as date ,
											DATE_FORMAT(imp_dates.imp_date,"%h:%i") as time ,
											DATE_FORMAT(imp_dates.imp_date,"%p") as time_am_pm ,
											imp_dates.imp_date as original_date_format ,
											imp_dates.id as id 
										FROM utr_important_dates as imp_dates

										ORDER BY id;`;
								pool.query(q, function (err, result_3) {
									result[0] = {
										...result[0],
										important_dates: [...result_3],
									};

									err ? reject(err) : resolve(result);
								});
							}
						});
					});
				}
			});
		});
	},

	saveNewCandidate: function (pool, insert_data, randomstring) {
		return new Promise((resolve, reject) => {
			var insert_array = [];
			let query = `INSERT INTO utr_user_basic(ub_password, ub_first_name,
                                                    ub_middle_name, ub_last_name, ub_mobile_number,
                                                    ub_alternative_number, ub_email_id, ub_aadhar_number, ub_pan_card)
                         VALUES ?`;
			insert_data.forEach(function (value, index, main_array) {
				var $data = [
					randomstring,
					value.newFname,
					value.newMname,
					value.newLname,
					value.newMobileNumber,
					value.newAlternativeMobileNumber,
					value.newMailPartOne,
					value.newAadharNumber,
					value.newPanCard,
				];
				insert_array.push($data);
			});
			pool.query(query, [insert_array], function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	getPaymantDetails: function (pool, data) {
		console.log(data.detailsCategoryId, "-details detailsCategoryId");
		console.log(data.detailsPostId, "-details postid");
		return new Promise((resolve, reject) => {
			let query = `SELECT *
                         FROM utr_payment_info
                         WHERE pi_category_id = ?
                           AND pi_post_id = ? LIMIT 1`;
			pool.query(
				query,
				[Number(data.detailsCategoryId), Number(data.detailsPostId)],
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
	createNewAppication: function (pool, insert_data) {
		return new Promise((resolve, reject) => {
			var insert_array = [];
			let query = `INSERT INTO utr_candidate_appications(
															ca_reg_id,
															ca_post_id,
															ca_post_name,
															ca_dob,
															ca_catagory,
															ca_payment,
															ca_tax_per,
															ca_tax_payment,
															ca_detailsMainPost,
															compareDateFrom,
															compareDateTo,
															compareDateAgeString
															)
														VALUES ?`;

			insert_data.forEach(function (value, index, main_array) {
				// prettier-ignore
				var $data = [
					value.cri,
					value.detailsPostId,
					value.detailsPostName,
					value.detailsYear + "-" + value.detailsmonth + "-" + value.detailsbday,
					value.detailsCategory,
					value.payment,
					value.tax_per,
					value.tax_payment,
					value.detailsMainPost,
					value.compareDateFrom,
					value.compareDateTo,
					value.compareDateAgeString,
				];
				insert_array.push($data);
			});

			pool.query(query, [insert_array], function (err, result) {
				if (err) {
					// console.log(err)
					// ;(responderSet.sendData._call = -1),
					// 	(responderSet.sendData._error = 'Op Error, Contact To Admin'),
					// 	(responderSet.sendData._sys_erorr = err),
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	updateGeneralDetails: function (pool, insert_data) {
		return new Promise((resolve, reject) => {
			var insert_array = [];
			let query = `UPDATE utr_candidate_appications
						SET 
							ca_gender                                         = ?,
							ca_catagory                                       = ?,
							ca_marital_status                                 = ?,
							ca_fathers_name                                   = ?,
							ca_mothers_name                                   = ?,
							ca_spouse_name                                    = ?,
							ca_address                                        = ?,
							ca_line_two_address                               = ?,
							ca_line_three_address                             = ?,
							ca_state                                          = ?,
							ca_district                                       = ?,
							ca_pin_number                                     = ?,
							ca_general_details_done                           = ?,
							ca_detailsReligion                                = ?,
							ca_detailsNationality                             = ?,
							ca_detailsDomicile                                = ?,
							ca_detailsNonCreamyLayer 						  = ?,
							ca_detailsSubCategory 							  = ?,
							ca_convenience_charge                             = ?,
							ca_detailsTaluka                                  = ?,
							ca_language_details 							  = ?

						WHERE ca_reg_id = ?
						AND id = ? `;
			var $data = [];
			insert_data.forEach(function (value, index, main_array) {
				$data = [
					value.detailsGender,
					value.detailsCategory,
					value.detailsMarital,
					value.detailsFather,
					value.detailsMother,
					value.detailsSpouse,
					value.detailsAddress,
					value.detailsLineTwo,
					value.detailsLineThree,
					value.detailsState,
					value.detailsDistrict,
					value.detailsPin,
					1,
					value.detailsReligion,
					value.detailsNationality,
					value.detailsDomicile,
					value.detailsNonCreamyLayer,
					value.detailsSubCategory,
					value.ca_convenience_charge,
					value.detailsTaluka,
					JSON.stringify(value.detailsLanguages),
					Number(value.cri),
					Number(value.cfi),
				];
				insert_array.push($data);
			});

			pool.query(query, $data, function (err, result) {
				if (err) {
					console.log(err);
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},

	updateEducationDetails: function (pool, update_data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE
								utr_candidate_appications
							SET ca_education_details      = ?,
								ca_education_details_done = ?
							WHERE ca_reg_id = ?
							AND id = ?`;
			var $data = [
				update_data.edu_data,
				1,
				update_data.cri,
				update_data.cfi,
			];
			pool.query(query, $data, function (err, result) {
				if (err) {
					console.log(err);
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	updateExperienceDetails: function (pool, update_data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE
                             utr_candidate_appications
                         SET ca_experienceList         = ?,
                             ca_education_details_done = ?
                         WHERE ca_reg_id = ?
                           AND id = ?`;
			var $data = [
				update_data.exp_data,
				1,
				update_data.cri,
				update_data.cfi,
			];
			pool.query(query, $data, function (err, result) {
				if (err) {
					console.log(err);
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	updateAchievementDetails: function (pool, update_data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE
                             utr_candidate_appications
                         SET ca_achievements           = ?,
                             ca_education_details_done = ?
                         WHERE ca_reg_id = ?
                           AND id = ?`;
			var $data = [
				update_data.exp_data,
				1,
				update_data.cri,
				update_data.cfi,
			];
			pool.query(query, $data, function (err, result) {
				if (err) {
					console.log(err);
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	saveApplicationPreview: function (pool, update_data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE
                             utr_candidate_appications
                         SET ca_preview_done = 1
                         WHERE ca_reg_id = ?
                           AND id = ?;`;

			pool.query(
				query,
				[update_data.cri, update_data.cfi],
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
	updateDocumentInfo: function (pool, update_data) {
		return new Promise((resolve, reject) => {
			let query = "";
			var $data = [];

			query =
				"UPDATE utr_candidate_appications SET ca_document_details_done = 1";

			// Check which fields are available and build the query accordingly
			if (update_data.sign_name !== "") {
				query += ", ca_sign = ?";
				$data.push(update_data.sign_name);
			}
			if (update_data.aadhar_card_name !== "") {
				query += ", ca_aadhar_card = ?";
				$data.push(update_data.aadhar_card_name);
			}
			if (update_data.photo_name !== "") {
				query += ", ca_photo = ?";
				$data.push(update_data.photo_name);
			}

			if ($data.length > 0) {
				query += " WHERE ca_reg_id = ? AND id = ?";
				$data.push(update_data.cri, update_data.cfi);
			}

			pool.query(query, $data, function (err, result) {
				if (err) {
					console.log(err);
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},

	savesS3DoumentName: (pool, data) => {
		return new Promise((resolve, reject) => {
			// prettier-ignore
			const type =
				data.img_type == "aadharCard" ? "ca_aadhar_card"
				: data.img_type == "photo" ? "ca_photo" 
				: "ca_sign";

			const q = `UPDATE utr_candidate_appications SET ${type} = ? WHERE id = ? AND ca_reg_id = ?;`;
			pool.query(
				q,
				[data.fileName, data.f_id, data.r_id],
				function (err, result) {
					err ? reject(err) : resolve(result);
				},
			);
		});
	},

	deleteS3DoumentName: (pool, data) => {
		return new Promise((resolve, reject) => {
			// prettier-ignore
			const type =
				data.img_type == "aadharCard" ? "ca_aadhar_card"
				: data.img_type == "photo" ? "ca_photo" 
				: "ca_sign";

			const q = `UPDATE utr_candidate_appications SET ${type} = '' WHERE id = ? AND ca_reg_id = ?;`;
			pool.query(q, [data.f_id, data.r_id], function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	updateDocumentDetailsDone: (pool, data) => {
		return new Promise((resolve, reject) => {
			const q = `UPDATE utr_candidate_appications SET ca_document_details_done = 1 
						WHERE id =? AND ca_reg_id = ?`;
			pool.query(q, [data.f_id, data.r_id], function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	updateExtraDocumentInfo: function (pool, update_data, set = 0) {
		return new Promise((resolve, reject) => {
			var $data = [];

			query =
				"UPDATE utr_candidate_appications SET ca_extra_documents = ?, ca_document_details_done = ? WHERE ca_reg_id = ?  AND id = ?";
			$data = [
				update_data.documents,
				set,
				update_data.cri,
				update_data.cfi,
			];
			pool.query(query, $data, function (err, result) {
				if (err) {
					console.log(err);
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	selectGenerelDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT     ca_post_id as post_id, 
									ca_post_name as post_name, 
									ca_gender as gender, 
									ca_catagory as catagory, 
									DATE_FORMAT(ca_dob,'%d-%m-%Y') as dob,
									compareDateAgeString as age,
									ca_marital_status as detailsMarital, 
									ca_fathers_name as fathers_name, 
									ca_mothers_name as mother_name, 
									ca_spouse_name as spouse_name, 
									ca_address as address,
									ca_line_two_address as line_two_address, 
									ca_line_three_address as line_three_address,
									ca_state as state, 
									ca_district as district, 
									ca_pin_number as pin_number, 
									ca_general_details_done as g_done, 
									ca_education_details_done as e_done, 
									ca_document_details_done as d_done, 
									ca_preview_done as p_done, 
									ca_detailsReligion as detailsReligion, 
									ca_detailsNationality as detailsNationality, 
									ca_detailsDomicile as detailsDomicile, 
									ca_detailsNonCreamyLayer as detailsNonCreamyLayer, 
									ca_detailsSubCategory as detailsSubCategory, 
									ca_is_existing_emp as detailsExistingEmployee, 
									ca_detailsMainPost as detailsMainPost, 
									ca_detailsMainPost, 
									ca_detailsTaluka as detailsTaluka,
									main_post_name,
									post_name,
									DATE_FORMAT(post_date_from,'%d-%m-%Y') as ageAsOn,
									ca_language_details as languageDetails

							FROM utr_candidate_appications ca

							INNER JOIN utr_post post
							ON ca.ca_post_id = post.id
							WHERE ca.ca_reg_id = ?  
								AND ca.id = ?
			`;
			pool.query(query, [data.cri, data.cfi], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},

	selectEduUni: pool => {
		return new Promise((resolve, reject) => {
			let query = `SELECT *
                         FROM edu_university
                         WHERE is_visible = 1
			`;
			pool.query(query, (err, result) => {
				if (err) {
					reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},

	selectEduCourses: pool => {
		return new Promise((resolve, reject) => {
			let query = `SELECT *
                         FROM edu_courses

                         WHERE is_visible = 1
			`;
			pool.query(query, (err, result) => {
				if (err) {
					reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},

	selectEduTypes: pool => {
		return new Promise((resolve, reject) => {
			let query = `SELECT *
                         FROM edu_type
			`;
			pool.query(query, (err, result) => {
				if (err) {
					reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},

	selecEducationDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT ca_education_details 			 as education_details,
                                ca_general_details_done          as g_done,
                                ca_education_details_done        as e_done,
                                ca_document_details_done         as d_done,
                                ca_post_name                     as post_name,
                                ca_post_id                       as post_id,
                                ca_detailsMainPost               as main_post,
                                ca_preview_done                  as p_done
                        FROM utr_candidate_appications
                        WHERE ca_reg_id = ?
                        AND id = ?
			`;
			pool.query(query, [data.cri, data.cfi], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	checkPostExperienceRequiredStatus: function (pool, postId) {
		return new Promise((resolve, reject) => {
			const query = `select post_is_experience_required, post_experience_years
								from utr_post
							where id = ?`;
			pool.query(query, postId, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},
	getExperienceDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT ca_experienceList   		    as experienceList,
                                ca_general_details_done         as g_done,
                                ca_education_details_done       as e_done,
                                ca_document_details_done        as d_done,
                                ca_post_name                    as post_name,
                                ca_post_id                      as post_id,
                                ca_detailsMainPost,
                                ca_preview_done                 as p_done
						FROM utr_candidate_appications
						WHERE ca_reg_id = ?
						AND id = ?
			`;
			pool.query(query, [data.cri, data.cfi], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	selectAchievementDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT ca_achievements               as achievementList,
                                ca_general_details_done       as g_done,
                                ca_education_details_done     as e_done,
                                ca_document_details_done      as d_done,
                                ca_post_name                  as post_name,
                                ca_post_id                    as post_id,
                                ca_detailsMainPost,
                                ca_preview_done               as p_done
                         FROM utr_candidate_appications
                         WHERE ca_reg_id = ?
                           AND id = ?
			`;
			pool.query(query, [data.cri, data.cfi], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	selectDocumentDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT IFNULL(ca_sign, '')        as sign,
                                IFNULL(ca_photo, '')       as photo,
                                IFNULL(ca_aadhar_card, '') as aadharCard,
                                ca_post_name               as post_name,
                                ca_detailsMainPost,
                                ca_general_details_done    as g_done,
                                ca_education_details_done  as e_done,
                                ca_document_details_done   as d_done,
                                ca_preview_done            as p_done,
								post_is_aadhaar_required   as isAadharRequired
							FROM utr_candidate_appications ca

							INNER JOIN utr_post post
							ON ca.ca_post_id = post.id
							WHERE ca_reg_id = ?
							AND ca.id = ?
			`;
			pool.query(
				query,
				[Number(data.cri), Number(data.cfi)],
				(err, result) => {
					if (err) {
						(responderSet.sendData._call = -1),
							(responderSet.sendData._error =
								"Op Error, Contact To Admin"),
							(responderSet.sendData._sys_erorr = err),
							reject(responderSet.sendData);
					} else {
						resolve(result);
					}
				},
			);
		});
	},
	selectExtraDocumentDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT IFNULL(ca_extra_documents, '[]') as documents,
                                ca_post_name                     as post_name,
                                ca_detailsMainPost,
                                ca_general_details_done          as g_done,
                                ca_education_details_done        as e_done,
                                ca_document_details_done         as d_done,
                                ca_preview_done                  as p_done
                         FROM utr_candidate_appications
                         WHERE ca_reg_id = ?
                           AND id = ?
			`;
			pool.query(query, [data.cri, data.cfi], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	profileDetais: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT CONCAT(ub_first_name, ' ', ub_middle_name, ' ', ub_last_name) as full_name,
                                ub_mobile_number                                              as mobile_number,
                                ub_email_id                                                   as email,
                                id                                                            as req_id
                         FROM utr_user_basic
                         WHERE id = ?
			`;
			pool.query(query, [data.cri], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	profileExamList: function (
		pool,
		data,
		t_type = "utr_candidate_appications",
	) {
		return new Promise((resolve, reject) => {
			let query = `SELECT app.id,
                                ca_post_name                                 as applied_post,
                                ca_detailsMainPost,
                                id                                           as appication_number,
                                ca_payment_done                              as payment_is_done,
                                ca_general_details_done                      as g_done,
                                ca_education_details_done                    as e_done,
                                ca_document_details_done                     as d_done,
                                ca_preview_done                              as p_done,
                                SUM(ca_payment + ca_tax_payment)             as post_fee,
                                ca_payment                                   as only_post_fee,
                                DATE_FORMAT(app.createdAt, '%d-%m-%Y')       as created_date,
                                ca_inserted_on_time                          as created_time,
                                ca_sign,
                                ca_photo,
                                ca_batch_time

                         FROM ${t_type} as app

                         WHERE ca_reg_id = ?
                         GROUP BY id`;
			pool.query(query, [data.cri], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	selectPreviewData: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT 
								ca.id                                                                as application_id,
								ub.id as registration_id,
                                ub_email_id                                                          as email_id,
                                ub_mobile_number                                                     as mobile_name,
                                ub_aadhar_number                                                     as aadhaar,
								UPPER(CONCAT(ub_first_name, ' ', ub_middle_name, ' ', ub_last_name)) as full_name,
                                ub_alternative_number                                                as alternative_number,
                                DATE_FORMAT(ca.ca_dob, '%d / %m / %Y')                               as date_of_birth,
                                UPPER(ca.ca_gender)                                                  as gender,
                                UPPER(ca.ca_catagory)                                                as catagory,
                                UPPER(ca.ca_marital_status)                                          as marital,
                                UPPER(ca.ca_fathers_name)                                            as father_name,
                                UPPER(ca.ca_mothers_name)                                            as mother_name,
                                UPPER(ca.ca_spouse_name)                                             as spouse_name,
                                UPPER(ca.ca_address)                                                 as address,
                                UPPER(ca.ca_line_two_address)                                        as line_two,
                                UPPER(ca.ca_line_three_address)                                      as line_three,
                                UPPER(ca.ca_state)                                                   as state,
                                UPPER(ca.ca_district)                                                as dist,
                                ca.ca_pin_number                                                     as pin_number,
                                ca.ca_sign                                                           as sign,
                                ca.ca_photo                                                          as photo,
                                ca.ca_education_details                                              as educational_details,
                                ca_general_details_done                                              as g_done,
                                ca_education_details_done                                            as e_done,
                                ca_document_details_done                                             as d_done,
                                ca_preview_done                                                      as p_done,
                                ca_payment                                                           as post_fee,
                                ca_tax_payment                                                       as post_fee_tax,
                                ca_payment_done                                                      as payment_status,
                                ca_detailsReligion                                                   as detailsReligion,
                                ca_detailsNationality                                                as detailsNationality,
                                ca_detailsDomicile                                                   as detailsDomicile,
                                ub_pan_card                                                          as pan_number,
                                ca_payment_type                                                      as payment_type,
                                ca_detailsExistingEmployeeDept,
                                ca_detailsExistingEmployeeDeptPost,
                                ca_detailsExistingEmployeeYear,
                                ca_detailsExistingEmployeeMonth,
                                ca_detailsMainPost,
                                ca_mt,
                                ca_et,
                                ca_ht,
                                ca_mf,
                                ca_ef,
                                ca_hf,
                                ca_experienceList                                                    as experienceList,
                                ca_detailsNonCreamyLayer                                             as detailsNonCreamyLayer,
                                ca_detailsSubCategory                                                as detailsSubCategory,
                                ca_challanBranchCode                                                 as challanBranchCode,
                                ca_achievements                                                      as achievements,
                                compareDateFrom,
                                compareDateTo,
                                compareDateAgeString,
                                ca_detailsTaluka                                                     as taluka,
                                ca_mscit_done_check                                                  as mscit_done,
                                ca_graduation_done_check                                             as graduation_done,
								DATE_FORMAT(post_date_from,'%d-%m-%Y')  as age_as_on,
								post.post_name as post_name,
								ca_language_details as languageDetails

							FROM utr_candidate_appications as ca

							INNER JOIN utr_user_basic as ub 
							ON ub.id = ca.ca_reg_id

							INNER JOIN utr_post post
							ON ca.ca_post_id = post.id

							WHERE ca_reg_id = ?
							AND ca.id = ?
							
							GROUP BY ca.id LIMIT 1;
			`;

			pool.query(
				query,
				[data.cri, data.cfi, data.payment],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				},
			);
		});
	},

	selectPreviewDataFinal: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT 
								ca.id                                                                as application_id,
								ub.id as registration_id,
                                ub_email_id                                                          as email_id,
                                ub_mobile_number                                                     as mobile_name,
								UPPER(CONCAT(ub_first_name))  										 as full_name,
                                ub_alternative_number                                                as alternative_number,
                                DATE_FORMAT(ca.ca_dob, '%d / %m / %Y')                               as date_of_birth,
                                UPPER(ca.ca_gender)                                                  as gender,
                                UPPER(ca.ca_catagory)                                                as catagory,
                                UPPER(ca.ca_address)                                                 as address,
                                ca.ca_sign                                                           as sign,
                                ca.ca_photo                                                          as photo,
                                ca_general_details_done                                              as g_done,
                                ca_document_details_done                                             as d_done,
								ca_post_name as post_name

						FROM utr_candidate_appications as ca

						INNER JOIN utr_user_basic as ub
						ON ub.id = ca.ca_reg_id

						INNER JOIN utr_post post
						ON ca.ca_post_id = post.id

						WHERE ca_reg_id = ?
                           AND ca.id = ?
                          
						GROUP BY ca.id LIMIT 1;`;

			pool.query(
				query,
				[Number(data.r_id), Number(data.f_id)],
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				},
			);
		});
	},

	checkForLogin: async function (pool, data) {
		let query = `SELECT id, ub_first_name, ub_middle_name, ub_last_name
                         FROM utr_user_basic
                         WHERE id = ?
                           AND ub_password = ? LIMIT 1`;
		return await runQuery(pool, query, [
			data.utrUserName,
			data.utrPassword,
		]);
	},

	addLoginTimeStamp: async function (pool, r_id) {
		let query = `INSERT INTO 
						utr_login_logs
						(
							r_id, 
							timestamp
						)
					VALUES (${r_id}, NOW())`;

		return await runQuery(pool, query);
	},

	checkForPayDone: function (pool, data, type) {
		return new Promise((resolve, reject) => {
			// resolve(data);
			let query = `SELECT *
                         FROM utr_candidate_appications
                         WHERE ca_reg_id = ?
                           AND ca_payment_done = 1
                           AND ca_valid_user = ? LIMIT 1`;
			pool.query(query, [data.id, type], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	getSoloCandidateDetails: function (pool, r_id) {
		return new Promise((resolve, reject) => {
			let query = `SELECT *
							FROM utr_user_basic
							WHERE id = ? 
							LIMIT 1`;
			pool.query(query, [r_id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	getSoloSlotDetails: function (pool, slot) {
		return new Promise((resolve, reject) => {
			let query = `SELECT *
                         FROM utr_process_slots
                         WHERE slot = ?`;
			pool.query(query, [slot], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	getSoloQuestionPaper: function (pool, f_id) {
		const q = `SELECT tqs.* FROM
		
					utr_candidate_appications_final AS caf 

					INNER JOIN tm_publish_test_list AS ptl
					ON caf.ca_batch_slot = ptl.tm_allow_to

					INNER JOIN tm_test_question_sets AS tqs
					ON ptl.ptl_test_id = tqs.tqs_test_id

					WHERE caf.id = ?;`;

		return new Promise((resolve, reject) => {
			pool.query(q, f_id, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	getResultDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT ca.*,
                                DATE_FORMAT(ca_dob, '%d-%m-%Y')       as birth_date,
                                DATE_FORMAT(ca_dob, '%d%m%Y')         as birth_pass,
                                DATE_FORMAT(ca_exam_date, '%d/%m/%Y') as exam_date,
                                result.roll_no,
                                app_id,
                                result.name,
                                post,
                                sub_post,
                                correct,
                                n_date,
                                result,
                                IFNULL(im.total_marks, 0)             as final_marks
                         FROM utr_candidate_appications_final as ca
                                  INNER JOIN utr_result as result ON
                             (result.app_id = ca.id AND result.roll_no = ca.ca_roll_number)
                                  LEFT JOIN interview_marks as im ON
                             (ca.id = im.form_no AND ca.ca_roll_number = im.roll_no)
                         WHERE ca.id = ?
                           AND ca_reg_id = ?
                           AND ca_payment_done = 1
                           AND ca_is_alloted = 1 LIMIT 1`;
			pool.query(
				query,
				[Number(data.f), Number(data.r)],
				(err, result) => {
					if (err) {
						(responderSet.sendData._call = -1),
							(responderSet.sendData._error =
								"Op Error, Contact To Admin"),
							(responderSet.sendData._sys_erorr = err),
							reject(responderSet.sendData);
					} else {
						console.log(result);
						resolve(result);
					}
				},
			);
		});
	},
	getResultDetails_2: function (pool, data) {
		// this is getting result details after result is been generated
		return new Promise((resolve, reject) => {
			let query = `SELECT 
								ub.id AS r_id,
								caf.id AS f_id,
								caf.ca_post_name,
                                roll_no as roll_number,
                                marks as marks_gain,
								caf.ca_batch_time,
								DATE_FORMAT(ca_exam_date,'%d-%m-%Y') AS ca_exam_date,
								ca_photo,
								ca_sign
                         FROM utr_result AS res
						 INNER JOIN utr_candidate_appications_final AS caf
						 ON caf.ca_roll_number = res.roll_no

						 INNER JOIN utr_user_basic AS ub
						 ON ub.id = caf.ca_reg_id
                         WHERE caf.id = ?`;

			pool.query(query, [Number(data)], (err, result) => {
				if (err) {
					reject(err);
				} else {
					console.log(result);
					resolve(result);
				}
			});
		});
	},

	checkInterviewDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT *
                         FROM utr_interview_list
                         WHERE f_id = ?`;
			pool.query(query, [Number(data)], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					console.log(result);
					resolve(result);
				}
			});
		});
	},

	getInterviewCallLetterDetails: function (pool, fid) {
		return new Promise((resolve, reject) => {
			let q = `SELECT *
                    FROM utr_interview_list il

					INNER JOIN utr_candidate_appications_final AS caf
					ON il.f_id = caf.id

					INNER JOIN utr_user_basic AS ub
					ON ub.id = caf.ca_reg_id

                    WHERE f_id = ?`;

			pool.query(q, [Number(fid)], function (err, result) {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					console.log(result);
					resolve(result);
				}
			});
		});
	},

	getInterviewLetterConfig: function (pool) {
		return new Promise((resolve, reject) => {
			const q = `SELECT config FROM utr_interview_letter_config LIMIT 1;`;
			pool.query(q, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	updateHTDownload: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE utr_candidate_appications_final
                         SET ca_ht_download = 1
                         WHERE id = ?
                           AND ca_reg_id = ?`;
			pool.query(query, [data.f_id, data.r_id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	getInterViewSlotDetails: function (pool, slot) {
		return new Promise((resolve, reject) => {
			let query = `SELECT *, DATE_FORMAT(date, '%d/%m/%Y') as i_date
                         FROM utr_interview_slot
                         WHERE main_post = ?
                           AND sub_post = ? LIMIT 1`;
			pool.query(query, [slot.post, slot.sub_post], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	getSoloCandidateHTDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT 
								caf.id,
								ca_reg_id,
								ca_post_id,
								ca_post_name,
								ca_detailsMainPost,
								ca_dob,
								ca_gender,
								ca_catagory,
								ca_marital_status,
								ca_fathers_name,
								ca_mothers_name,
								ca_spouse_name,
								ca_address,
								ca_line_two_address,
								ca_line_three_address,
								ca_state,
								ca_district,
								ca_detailsTaluka,
								ca_pin_number,
								ca_sign,
								ca_photo,
								ca_aadhar_card,
								ca_experienceList,
								ca_general_details_done,
								ca_document_details_done,
								ca_preview_done,
								ca_payment_done,
								ca_inserted_on_date,
								ca_inserted_on_time,
								ca_update_on_time,
								ca_detailsReligion,
								ca_detailsNationality,
								ca_detailsDomicile,
								ca_detailsNonCreamyLayer,
								ca_detailsSubCategory,
								ca_payment,
								ca_tax_per,
								ca_tax_payment,
								ca_payment_type,
								ca_convenience_charge,
								ca_is_existing_emp,
								ca_detailsExistingEmployeeDept,
								ca_detailsExistingEmployeeDeptPost,
								ca_detailsExistingEmployeeYear,
								ca_detailsExistingEmployeeMonth,
								ca_mt,
								ca_et,
								ca_ht,
								ca_mf,
								ca_ef,
								ca_hf,
								ca_challanBranchCode,
								ca_valid_user,
								ca_post_order,
								ca_roll_number,
								ca_center_name,
								ca_center_code,
								ca_batch_time,
								ca_batch_slot,
								ca_center_address,
								ca_ht_download,
								ca_exam_date,
								ca_is_alloted,
								ca_achievements,
								ca_aproved,
								compareDateFrom,
								compareDateTo,
								compareDateAgeString,
								division,
								ca_aproved_by,
								ca_is_employed,
								ca_mscit_done_check,
								ca_graduation_done_check,
								ca_exam_present_status,
								ca_alloted_lab_id,
								ca_alloted_server_id,
                                DATE_FORMAT(ca_dob, '%d-%m-%Y')       as birth_date,
                                DATE_FORMAT(ca_dob, '%d%m%Y')         as birth_pass,
                                DATE_FORMAT(ca_exam_date, '%d/%m/%Y') as exam_date

                         FROM utr_candidate_appications_final caf
                         WHERE id = ?
                           AND ca_reg_id = ?
                           AND ca_payment_done = 1
                           AND ca_is_alloted = 1 LIMIT 1`;
			console.log(query, "==query==");
			pool.query(query, [data.f_id, data.r_id], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	getSoloCandidateHTDetailsByRollNumber: function (pool, roll_no) {
		console.log(roll_no, "==roll_no==");
		return new Promise((resolve, reject) => {
			let query = `SELECT 
								caf.id,
								ca_reg_id,
								ca_post_id,
								ca_post_name,
								ca_detailsMainPost,
								ca_dob,
								ca_gender,
								ca_catagory,
								ca_marital_status,
								ca_fathers_name,
								ca_mothers_name,
								ca_spouse_name,
								ca_address,
								ca_line_two_address,
								ca_line_three_address,
								ca_state,
								ca_district,
								ca_detailsTaluka,
								ca_pin_number,
								ca_sign,
								ca_photo,
								ca_aadhar_card,
								ca_experienceList,
								ca_general_details_done,
								ca_document_details_done,
								ca_preview_done,
								ca_payment_done,
								ca_inserted_on_date,
								ca_inserted_on_time,
								ca_update_on_time,
								ca_detailsReligion,
								ca_detailsNationality,
								ca_detailsDomicile,
								ca_detailsNonCreamyLayer,
								ca_detailsSubCategory,
								ca_payment,
								ca_tax_per,
								ca_tax_payment,
								ca_payment_type,
								ca_convenience_charge,
								ca_is_existing_emp,
								ca_detailsExistingEmployeeDept,
								ca_detailsExistingEmployeeDeptPost,
								ca_detailsExistingEmployeeYear,
								ca_detailsExistingEmployeeMonth,
								ca_mt,
								ca_et,
								ca_ht,
								ca_mf,
								ca_ef,
								ca_hf,
								ca_challanBranchCode,
								ca_valid_user,
								ca_post_order,
								ca_roll_number,
								ca_center_name,
								ca_center_code,
								ca_batch_time,
								ca_batch_slot,
								ca_center_address,
								ca_ht_download,
								ca_exam_date,
								ca_is_alloted,
								ca_achievements,
								ca_aproved,
								compareDateFrom,
								compareDateTo,
								compareDateAgeString,
								division,
								ca_aproved_by,
								ca_is_employed,
								ca_mscit_done_check,
								ca_graduation_done_check,
								ca_exam_present_status,
								ca_alloted_lab_id,
								ca_alloted_server_id,
                                DATE_FORMAT(ca_dob, '%d-%m-%Y')       as birth_date,
                                DATE_FORMAT(ca_dob, '%d%m%Y')         as birth_pass,
                                DATE_FORMAT(ca_exam_date, '%d/%m/%Y') as exam_date,
								lab.lab_name,
								lab.department,
								lab.floor,
								ca_is_approved,
								ca_approved_photo

                         FROM utr_candidate_appications_final caf

						 LEFT JOIN utr_lab_wise_allotment_details lab
						 ON caf.ca_alloted_lab_id = lab.id

                         WHERE 
                           ca_roll_number = ?
                           AND ca_payment_done = 1
                           AND ca_is_alloted = 1 LIMIT 1`;
			console.log(query, "==query==");
			pool.query(query, roll_no, (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	preAddharChecking: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT id
                         FROM utr_user_basic
                         WHERE ub_aadhar_number = ? LIMIT 1`;
			pool.query(query, [data.newAadharNumber], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	checkDuplicatePost: function (pool, data, cri) {
		console.log(data, "-data");
		return new Promise((resolve, reject) => {
			let query = `SELECT id
                         FROM utr_candidate_appications
                         WHERE ca_reg_id = ?
                           AND ca_post_id = ? LIMIT 1`;
			pool.query(query, [cri, data._postId], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	getPasswordRecovery: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT ub_password as password
                         FROM utr_user_basic
                         WHERE ub_aadhar_number = ?
                           AND id = ?
                           AND ub_otp = ? LIMIT 1`;
			pool.query(
				query,
				[
					data.aadharNumber,
					Number(data.userId),
					Number(data.otpNumber),
				],
				(err, result) => {
					if (err) {
						(responderSet.sendData._call = -1),
							(responderSet.sendData._error =
								"Op Error, Contact To Admin"),
							(responderSet.sendData._sys_erorr = err),
							reject(responderSet.sendData);
					} else {
						resolve(result);
					}
				},
			);
		});
	},
	getVerifyRecoveryDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT ub_password as password, ub_email_id as email, ub_mobile_number as mobile, ub_otp as otp
                         FROM utr_user_basic
                         WHERE ub_aadhar_number = ?
                           AND id = ? LIMIT 1`;
			pool.query(
				query,
				[data.aadharNumber, Number(data.userId)],
				(err, result) => {
					if (err) {
						(responderSet.sendData._call = -1),
							(responderSet.sendData._error =
								"Op Error, Contact To Admin"),
							(responderSet.sendData._sys_erorr = err),
							reject(responderSet.sendData);
					} else {
						resolve(result);
					}
				},
			);
		});
	},
	saveOTP: function (pool, data, otp) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE utr_user_basic
                         SET ub_otp = ?
                         WHERE ub_aadhar_number = ?
                           AND id = ? LIMIT 1`;
			pool.query(
				query,
				[Number(otp), data.aadharNumber, Number(data.userId)],
				(err, result) => {
					if (err) {
						(responderSet.sendData._call = -1),
							(responderSet.sendData._error =
								"Op Error, Contact To Admin"),
							(responderSet.sendData._sys_erorr = err),
							reject(responderSet.sendData);
					} else {
						resolve(result);
					}
				},
			);
		});
	},

	getUserNameRecovery: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT id as username
                         FROM utr_user_basic
                         WHERE ub_aadhar_number = ?
                           AND ub_mobile_number = ? LIMIT 1`;
			pool.query(
				query,
				[data.aadharNumber, data.mobileNumber],
				(err, result) => {
					if (err) {
						(responderSet.sendData._call = -1),
							(responderSet.sendData._error =
								"Op Error, Contact To Admin"),
							(responderSet.sendData._sys_erorr = err),
							reject(responderSet.sendData);
					} else {
						resolve(result);
					}
				},
			);
		});
	},

	getOnlyPaymentStatus: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT SUM(ca_payment + ca_tax_payment) as post_fee
                         FROM utr_candidate_appications
                         WHERE ca_reg_id = ?
                           AND id = ?
                         GROUP BY id LIMIT 1`;
			pool.query(
				query,
				[Number(data.cri), Number(data.cfi)],
				(err, result) => {
					if (err) {
						(responderSet.sendData._call = -1),
							(responderSet.sendData._error =
								"Op Error, Contact To Admin"),
							(responderSet.sendData._sys_erorr = err),
							reject(responderSet.sendData);
					} else {
						resolve(result);
					}
				},
			);
		});
	},
	getQuickPayment: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT SUM(ca_payment + ca_tax_payment) as post_fee
                         FROM utr_candidate_appications as ca
                         WHERE ca_reg_id = ?
                           AND ca.id = ?
                         GROUP BY ca.id
			`;
			pool.query(
				query,
				[Number(data.r), Number(data.f)],
				(err, result) => {
					if (err) {
						(responderSet.sendData._call = -1),
							(responderSet.sendData._error =
								"Op Error, Contact To Admin"),
							(responderSet.sendData._sys_erorr = err),
							reject(responderSet.sendData);
					} else {
						resolve(result);
					}
				},
			);
		});
	},
	getOnlinePaymentToken: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT ca_payment_online_token_id as token
                         FROM utr_candidate_appications as ca
                         WHERE ca_reg_id = ?
                           AND ca.id = ?
                         GROUP BY ca.id
			`;
			pool.query(
				query,
				[Number(data.r), Number(data.f)],
				(err, result) => {
					if (err) {
						(responderSet.sendData._call = -1),
							(responderSet.sendData._error =
								"Op Error, Contact To Admin"),
							(responderSet.sendData._sys_erorr = err),
							reject(responderSet.sendData);
					} else {
						resolve(result);
					}
				},
			);
		});
	},
	updateOnlinePaymentStatus: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE utr_candidate_appications
                         SET ca_payment_done                  = ?,
                             ca_pament_ammount                = ?,
                             ca_payment_type=?,
                             ca_payment_online_status_message = ?
                         WHERE ca_payment_online_token_id = ? LIMIT 1`;
			var $data = [
				data.isPayDone,
				Number(data.amount) / 100,
				1,
				data.code,
				data.t_id,
			];
			pool.query(query, $data, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	updateToken: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE utr_candidate_appications
                         SET ca_payment_online_token_id = ?
                         WHERE ca_reg_id = ?
                           AND id = ? LIMIT 1`;
			var $data = [data.token, data.r, data.f];
			pool.query(query, $data, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	getUserDetailsByUserId: function (pool, r, f) {
		return new Promise((resolve, reject) => {
			let query = `SELECT ca_payment_done,
                                ca.id                                                         as form_id,
                                ca_reg_id                                                     as reg_id,
                                ca_post_name,
                                CONCAT(ub_first_name, ' ', ub_middle_name, ' ', ub_last_name) as full_name,
                                ub_email_id                                                   as email,
                                ca_post_name                                                  as post,
                                ub_password                                                   as password,
                                ub_mobile_number                                                 mobile,
                                ca_payment_online_token_id                                    as token,
                                DATE_FORMAT(ca_dob, '%d/%m/%Y')                               as birth_date,
                                IFNULL(ca_payment_online_status_message, '-')                 as ca_payment_online_status_message
                         FROM utr_candidate_appications as ca
                                  INNER JOIN
                              utr_user_basic as ub ON ca.ca_reg_id = ub.id
                         WHERE ca_reg_id = ?
                           AND ca.id = ? LIMIT 1`;
			pool.query(query, [r, f], function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	updatePaymentStatus: function (pool, data, _date) {
		return new Promise((resolve, reject) => {
			var insert_array = [];
			let query = `UPDATE utr_candidate_appications
                         SET ca_payment_done           = ?,
                             ca_payment_order_id       = ?,
                             ca_pament_order_signature = ?,
                             ca_pament_payment_id      = ?,
                             ca_pament_ammount         = ?,
                             ca_payment_time=?,
                             ca_payment_date=?,
                             ca_payment_type=?,
                             ca_payment_receipt=?,
                             ca_transection_no=?
                         WHERE ca_reg_id = ?
                           AND id = ?`;
			var $data = [
				1,
				data.razorpay_order_id,
				data.razorpay_signature,
				data.razorpay_payment_id,
				data.amount,
				_date.time,
				_date.date,
				2,
				data.doc,
				data.transection_no,
				Number(data.r),
				Number(data.f),
			];
			pool.query(query, $data, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	updatePaymentChallanStatus: function (pool, data, _date) {
		return new Promise((resolve, reject) => {
			var insert_array = [];
			let query = `UPDATE utr_candidate_appications
                         SET ca_payment_done           = ?,
                             ca_payment_order_id       = ?,
                             ca_pament_order_signature = ?,
                             ca_pament_payment_id      = ?,
                             ca_pament_ammount         = ?,
                             ca_payment_time           = ?,
                             ca_payment_date           = ?,
                             ca_payment_type           = ?,
                             ca_challanBranchCode=?
                         WHERE ca_reg_id = ?
                           AND id = ?`;
			var $data = [
				1,
				"-",
				"-",
				data.challanTID,
				data.amount,
				_date.time,
				_date.date,
				2,
				data.date,
				data.challanBranchCode,
				Number(data.r),
				Number(data.f),
			];
			pool.query(query, $data, function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	getPreVerificationDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT *
                         FROM payment_history
                         WHERE r_id = ?
                           AND f_id = ?
                           AND trans_id = ? LIMIT 1`;
			pool.query(
				query,
				[Number(data.r), Number(data.f), data.t],
				(err, result) => {
					if (err) {
						(responderSet.sendData._call = -1),
							(responderSet.sendData._error =
								"Op Error, Contact To Admin"),
							(responderSet.sendData._sys_erorr = err),
							reject(responderSet.sendData);
					} else {
						resolve(result);
					}
				},
			);
		});
	},
	getSuccessPayHiatoryDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT *, DATE_FORMAT(pay_start_date, '%d-%m-%Y') as iDate
                         FROM payment_history
                         WHERE r_id = ?
                           AND f_id = ?
                           AND code = ? LIMIT 1`;
			pool.query(
				query,
				[Number(data.r), Number(data.f), "OTS0000"],
				(err, result) => {
					if (err) {
						(responderSet.sendData._call = -1),
							(responderSet.sendData._error =
								"Op Error, Contact To Admin"),
							(responderSet.sendData._sys_erorr = err),
							reject(responderSet.sendData);
					} else {
						resolve(result);
					}
				},
			);
		});
	},

	getUserPaymentHistoryDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT id,
                                r_id,
                                f_id,
                                status,
                                code,
                                message,
                                moreDetails,
                                doneStatus,
                                trans_id,
                                DATE_FORMAT(insertDate, '%d-%m-%Y') as date,
                    CONCAT(insertTime, ' (IST)') as insertTime
                         FROM payment_history
                         WHERE r_id = ? AND f_id = ?
                         ORDER BY id DESC`;
			pool.query(
				query,
				[Number(data.r), Number(data.f)],
				(err, result) => {
					if (err) {
						(responderSet.sendData._call = -1),
							(responderSet.sendData._error =
								"Op Error, Contact To Admin"),
							(responderSet.sendData._sys_erorr = err),
							reject(responderSet.sendData);
					} else {
						resolve(result);
					}
				},
			);
		});
	},
	saveVerificationDetails: function (pool, data) {
		console.log(data);
		return new Promise((resolve, reject) => {
			let query = `INSERT INTO payment_history
                         (r_id,
                          f_id,
                          status,
                          code,
                          message,
                          moreDetails,
                          doneStatus,
                          trans_id,
                          insertDate,
                          insertTime,
                          updateDate,
                          updateTime)
                         VALUES (?)
			`;
			let insertData = [
				data.r,
				data.f,
				data.success,
				data.code,
				data.message,
				JSON.stringify(data.data),
				data.success,
				data.data.merchantTransactionId,
				data.date,
				data.time,
				data.date,
				data.time,
			];

			pool.query(query, [insertData], (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},
	updateVerificationDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE payment_history
                         SET status      = ?,
                             code        = ?,
                             message     = ?,
                             moreDetails = ?,
                             doneStatus  = ?,
                             updateDate  = ?,
                             updateTime  = ?
                         WHERE r_id = ?
                           AND f_id = ?
                           AND trans_id = ?
			`;
			let updateData = [
				data.success,
				data.code,
				data.message,
				JSON.stringify(data.data),
				data.success,
				data.date,
				data.time,
				data.r,
				data.f,
				data.data.merchantTransactionId,
			];

			pool.query(query, updateData, (err, result) => {
				if (err) {
					(responderSet.sendData._call = -1),
						(responderSet.sendData._error =
							"Op Error, Contact To Admin"),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData);
				} else {
					resolve(result);
				}
			});
		});
	},

	getAllRegisteredStudentsList: pool => {
		return new Promise((resolve, reject) => {
			let q = `SELECT ub_first_name,
                            ub_middle_name,
                            ub_last_name,
                            id          AS r_id,
                            ub_password,
                            ub_email_id as email
                     FROM utr_user_basic LIMIT 1, 30
			`;
			pool.query(q, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},

	// mark attendance present
	markPresent: async (pool, studentsList) => {
		console.log(studentsList, "==studentsList==");
		let q = `UPDATE utr_candidate_appications_final SET ca_exam_present_status = 1
				WHERE id IN (?)`;

		return new Promise((resolve, reject) => {
			pool.query(q, [studentsList], function (err, result) {
				err ? reject(err) : resolve(result);
			});
		});
	},
};
