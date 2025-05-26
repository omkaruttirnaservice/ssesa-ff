require("dotenv").config();
var IndexModel = require("../model/indexModel");
const FormData = require("form-data");
const fs = require("fs");

let { createHash } = require("crypto");
var smsModel = require("../model/smsModel");
var emailModel = require("../model/emailModel");
var responderSet = require("../config/_responderSet");
const { AgeCalculator } = require("../age-calculator");
var resultStatus = responderSet.checkResult;
var myDates = responderSet.myDate;

const axios = require("axios");

const indexModel = require("../model/indexModel");
const path = require("path");
const ApiResponse = require("../config/ApiResponse.js");
const awsController = require("./awsController.js");
const { REGISTRATION_SMS_TYPE } = require("../config/constants.js");
const { redisClient } = require("../config/redisConnect.js");
const { infoLog } = require("../config/logger.js");
const ApiResponseV2 = require("../config/ApiResponseV2.js");
const ApiError = require("../config/ApiError.js");

const xlsx = require("xlsx");

const __processDb = process.env.DB_DATABASE;

var indexController = {
	insertDataFromExcel: async (req, res, next) => {
		try {
			console.log(1);
			const clerkFilePath = path.join(
				"public",
				"files",
				"All Clerk  File (2).xlsx",
			);
			const labAssistantFilePath = path.join(
				"public",
				"files",
				"All Lab Assistant File (2).xlsx",
			);

			const workbook = xlsx.readFile(clerkFilePath);

			const sheet1 = workbook.Sheets[workbook.SheetNames[0]];

			const jsonData = xlsx.utils.sheet_to_json(sheet1, {
				header: 0,
				blankrows: false,
			});

			jsonData.forEach(_candidate => {
				// const tempData = [];
				for (let [key, value] of Object.entries(_candidate)) {
					if (key == "Candidate Name & Address") {
						const stringValue = String(value);
						const [name, address] = stringValue.split("\r\n");
						// const [first, middle, last] = name.split(" ");
						_candidate.name = name;
						// _candidate.first = first;
						// _candidate.middle = middle;
						// _candidate.last = last;
						_candidate.address =
							address?.replace(/["']/g, "") || "";
					}
				}
			});

			// make user basic
			await IndexModel.insertUserBasicFromExcel(jsonData, res.pool);

			// make candidate application

			// console.log(jsonData, "-");
		} catch (error) {
			console.log(error);
			// jsonData.forEach(_candidate => {
			// 	const tempData = [];
			// 	for (let [key, value] of Object.entries(_candidate)) {
			// 		if (key == "Candidate Name & Address") {
			// 			const stringValue = String(value);
			// 			const [name, address] = stringValue.split("\r\n");
			// 			tempData.push(name); // This is name part
			// 			tempData.push(address); // This is address part
			// 		} else {
			// 			tempData.push(value); // value
			// 		}
			// 	}
			// 	insertData.push(tempData);
			// });
		}
	},

	headerDetails: pool => {
		return new Promise((resolve, reject) => {
			IndexModel.headerDetails(pool)
				.then(result => {
					resolve(result);
				})
				.catch(error => {
					reject(error);
				});
		});
	},
	sampleMail: (req, res, next) => {
		var data1 = {
			to: "confinfotech@gmail.com",
			subject: "Hi",
			message: "sample",
		};
		emailModel.sendEmailGmailCallback(data1, function (data) {
			res.send(data);
		});
	},
	getAboutUs: (req, res, next) => {
		res.render("html/about-us");
	},
	getServices: (req, res, next) => {
		res.render("html/services");
	},
	getContactUs: (req, res, next) => {
		res.render("html/contact-us");
	},
	getServicePolicy: (req, res, next) => {
		res.render("html/service-policy");
	},
	getRefundPolicy: (req, res, next) => {
		res.render("html/refund-policy");
	},

	checkProcessDates: async (req, res, next) => {
		try {
			/**
			 * This is for checking process dates if it is exceed than current date
			 * We can check for following dates
			 * @query ?check_for=< p_start_date | p_registration_end_date | p_payment_end_date | p_print_end_date | p_edit_end_date >
			 * */

			const pStartDate = "p_start_date";
			const pRegistrationEndDate = "p_registration_end_date";
			const pEditEndDate = "p_edit_end_date";
			const pPrintEndDate = "p_print_end_date";
			const pPaymentEndDate = "p_payment_end_date";

			const query = req.query?.check_for;
			if (!query) {
				throw new ApiError(400, "Invalid search key");
			}
			console.log(query, "-query");
			const _processData = await IndexModel.getProcessData(res.pool);
			// const impDates = _processData[0].important_dates;
			const p = _processData[0];
			const impDates = {
				pStartDate: responderSet.getDateFor(p, "p_start_date"),
				pRegistrationEndDate: responderSet.getDateFor(
					p,
					"p_registration_end_date",
				),
				pEditEndDate: responderSet.getDateFor(p, "p_edit_end_date"),
				pPrintEndDate: responderSet.getDateFor(p, "p_print_end_date"),
				pPaymentEndDate: responderSet.getDateFor(
					p,
					"p_payment_end_date",
				),
			};

			console.log(impDates, "-datesimp");

			function handleDateComparison(date, message, res) {
				if (responderSet.compareTime(new Date(), date)) {
					return res
						.status(400)
						.json(new ApiResponseV2(400, message));
				} else {
					return res.status(200).json(new ApiResponseV2(200));
				}
			}

			// prettier-ignore
			switch (query) {
				case pStartDate:
					return handleDateComparison(impDates.pStartDate, "Registrations not started", res)
				case pRegistrationEndDate:
					return handleDateComparison(impDates.pRegistrationEndDate, "Registrations Closed", res)
				case pEditEndDate:
					return handleDateComparison(impDates.pEditEndDate, "Application form edit date closed", res)
				case pPrintEndDate:
					return handleDateComparison(impDates.pPrintEndDate, "Application form print date closed", res)
				case pPaymentEndDate:
					return handleDateComparison(impDates.pPaymentEndDate, "Application form payment date closed", res)
			}
		} catch (error) {
			console.log(error, "-err");
			next(error);
		}
	},

	getHomeView: async (req, res, next) => {
		try {
			if (req.session.cri !== undefined) {
				return res.redirect("/home");
			}
			let ErrorMessage =
				req.session.ErrorMessage !== undefined
					? req.session.ErrorMessage
					: "";
			delete req.session.ErrorMessage;

			let p = {};
			let _processData = null;
			if (!(await responderSet.getFromGlobalCache(`p_${__processDb}`))) {
				_processData = await IndexModel.getProcessData(res.pool);
				await responderSet.setToGlobalCache(
					`p_${__processDb}`,
					_processData[0],
					6000,
				);
				p = _processData[0];
				console.log(`cache miss`);
			} else {
				p = await responderSet.getFromGlobalCache(`p_${__processDb}`);
				console.log("Cache hit");
			}

			console.log(`p_${__processDb}`);
			console.log(process.pid, "--proces id");

			return res.render("new/index-exam-kop", {
				message: ErrorMessage,
				p,
				s3BucketUrl: process.env.S3_BUCKET_URL,
			});
		} catch (error) {
			next(error);
		}
	},

	getHowToApply: async (req, res, next) => {
		try {
			res.render("how-to-apply", {
				p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
				title: "How to apply",
			});
		} catch (error) {
			next(error);
		}
	},
	getHowToApplyTwo: async (req, res, next) => {
		try {
			res.render("challan_info", {
				p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
				title: "If error in Challan / चालान मध्ये त्रुटी असल्यास",
			});
		} catch (error) {
			next(error);
		}
	},

	getVerifyDetailsPage: async (req, res, next) => {
		try {
			const { r, f } = req.query;

			if (!r || !f) return res.redirect("/home");

			const _process = await responderSet.getFromGlobalCache(
				`p_${__processDb}`,
			);
			const impDates = await responderSet.getFromGlobalCache(
				`impDates_${__processDb}`,
			);

			//  get candidate information
			const candidateInfo = await IndexModel.getCandidateInformation(
				res.pool,
				r,
				f,
			);

			if (candidateInfo.length === 0) {
				return res.redirect("/logout");
			}

			console.log(candidateInfo, "-info");

			res.render("new/verify-details.pug", {
				title: "Verify Your Details",
				p: _process,
				impDates,
				candidateInfo: candidateInfo[0],
			});
		} catch (error) {
			next(error);
		}
	},

	getCandidateHome: async (req, res, next) => {
		try {
			// responderSet.getFromCache();
			if (req.session.cri === undefined) {
				return res.redirect("/");
			}

			delete req.session.cfi;
			var data = {
				cri: req.session.cri,
			};
			let profile_details = {};

			let applicationList = [];
			let resultDetails = [];
			let interviewDetails = [];

			const _process = await responderSet.getFromGlobalCache(
				`p_${__processDb}`,
			);
			const impDates = await responderSet.getFromGlobalCache(
				`impDates_${__processDb}`,
			);

			const IS_RESULT_GENGERATED = _process.p_result_decleared;
			const IS_INTERVIEW_LETTER_GENERATED =
				_process.p_interview_schedule_decleared;
			const IS_HT_GENERATED = _process.print_hall_ticket;

			const profileDetails = await IndexModel.profileDetais(
				res.pool,
				data,
			);

			if (profileDetails.length === 0) {
				delete req.session.cri;
				delete req.session.cfi;
				res.render("error-page.pug", {
					errorTitle: "Woops!",
					errorMessage: "Candidate Profile Details Not Found.",
				});
			}

			profile_details = profileDetails[0];

			if (IS_HT_GENERATED == 0) {
				var table = "utr_candidate_appications";
			} else {
				var table = "utr_candidate_appications_final";
			}
			const _applicationsList = await IndexModel.profileExamList(
				res.pool,
				data,
				table,
			);

			applicationList = _applicationsList;

			if (IS_RESULT_GENGERATED == 1) {
				resultDetails = await IndexModel.getResultDetails_2(
					res.pool,
					applicationList[0].appication_number,
				);
			}

			if (IS_INTERVIEW_LETTER_GENERATED === 1) {
				interviewDetails = await IndexModel.checkInterviewDetails(
					res.pool,
					applicationList[0].appication_number,
				);
			}

			console.log(applicationList, "applist");

			const r = req.session.cri;
			const f = applicationList[0].id;

			const isGengeralDetailsDone = applicationList[0].g_done == 1;
			const isDocumentUploadDone = applicationList[0].d_done == 1;

			const queryParams = `?r=${r}&f=${f}`;

			// if (isGengeralDetailsDone && !isDocumentUploadDone) {
			if (!isGengeralDetailsDone && !isDocumentUploadDone) {
				res.redirect(`/v2/document-upload${queryParams}`);
			} else if (isDocumentUploadDone) {
				res.redirect(`/v2/application${queryParams}`);
			} else {
				res.redirect(`/verify-info${queryParams}`);
			}

			// res.render("new/user-home.pug", {
			// 	title: "User Home",
			// 	profile: profile_details,
			// 	regIDInt: req.session.cri,
			// 	regIDString: req.session.criString,
			// 	userName: req.session.fullName,
			// 	applicationList: applicationList,
			// 	p: _process,
			// 	impDates,
			// 	payment_mode: process.payment_mode,
			// 	hall_ticket: process.print_hall_ticket,
			// 	resultDetails: resultDetails,
			// 	interviewDetails: interviewDetails,
			// 	isHtGenerated: IS_HT_GENERATED,
			// 	isInterviewLetterGenerated: IS_INTERVIEW_LETTER_GENERATED,
			// 	isResultGenerated: IS_RESULT_GENGERATED,
			// 	s3BucketUrl: process.env.S3_BUCKET_URL,
			// });
		} catch (error) {
			next(error);
		}
	},

	getInterviewCallLetter: async (req, res, next) => {
		try {
			let { fid } = req.query;

			console.log(fid, "-fid");

			if (!fid) {
				return res.redirect("/logout");
			}

			let _interviewCallLetterDetails =
				await IndexModel.getInterviewCallLetterDetails(res.pool, fid);

			const _interviewLetterConfig =
				await IndexModel.getInterviewLetterConfig(res.pool);

			console.log(_interviewLetterConfig, "==_interviewLetterConfig==");

			if (_interviewCallLetterDetails.length == 0) {
				return res.redirect("/logout");
			}

			res.render("new/interview-call-letter.pug", {
				details: _interviewCallLetterDetails[0],
				config: _interviewLetterConfig[0]?.config || [],
				s3BucketUrl: process.env.S3_BUCKET_URL,
			});
		} catch (error) {
			next(error);
		}
	},
	getInstructionsView: async (req, res, next) => {
		res.render("instruction-page", {
			title: "Instruction Page",
			p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
		});
	},

	getNewRegistrationView: async (req, res, next) => {
		try {
			// if (req.session.cri !== undefined) {
			// 	return res.redirect("/");
			// }
			res.render("new/new-registration.pug", {
				p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
				title: "New User Registration",
			});
		} catch (error) {
			next(error);
		}
	},

	getRegistrationCount: async (req, res) => {
		let _regCount = await IndexModel.getRegistrationCount(res.pool);
		let _payCount = await IndexModel.getSuccessPayCount(res.pool);
		return res.status(200).json({
			registrations: _regCount,
			payments: _payCount,
		});
	},

	userEligibility: (req, res, next) => {
		if (req.session.cri === undefined) {
			res.redirect("/");
			return false;
		}
		if (req.session.cfi === undefined) {
			req.session.cfi = 0;
		}

		if (req.session.cfi !== 0) {
			res.redirect("/home");
			return false;
		}

		var data = {
			cri: req.session.cri,
			cfi: req.session.cfi,
		};
		var currentPassword = req.session.currentPassword;
		delete req.session.currentPassword;
		var postList = [];
		var sammanterList = [];
		var categoryList = [];

		let postCategoryList = [];
		IndexModel.getPostCategoryList(res.pool)
			.then(_postCategoryList => {
				postCategoryList = [..._postCategoryList] || [];
				return IndexModel.getCategoryList(res.pool);
			})
			.then(result => {
				categoryList = result;
				return IndexModel.getSammanterList(res.pool);
			})
			.then(result => {
				sammanterList = JSON.stringify(result);
				return IndexModel.getPostData(res.pool);
			})
			.then(result => {
				postList = JSON.stringify(result);
				return IndexModel.selectGenerelDetails(res.pool, data);
			})
			.then(async function (result) {
				if (result.length > 0) {
					if (result[0].p_done == 1) {
						res.redirect("/home");
						return false;
					}
				}
				res.render("new/user-eligibility", {
					title: "User Eligibility",
					regIDInt: req.session.cri,
					regIDString: req.session.criString,
					form_id: req.session.cfi,
					userName: req.session.fullName,
					regPostName:
						result[0] !== undefined ? result[0].post_name : "-",
					updateResult: JSON.stringify(result),
					currentPassword:
						currentPassword !== undefined ? currentPassword : "",
					postList: postList,
					fatherName: req.session.fatherName,
					p: await responderSet.getFromGlobalCache(
						`p_${__processDb}`,
					),
					sammanter: sammanterList,
					categoryList: categoryList,
					postCategoryList,
				});
			})
			.catch(function (error) {
				next(error);
			});
	},

	userDetails: async (req, res, next) => {
		if (req.session.cri === undefined) {
			res.redirect("/");
			return false;
		}
		if (req.session.cfi === undefined) {
			req.session.cfi = 0;
		}
		if (req.session.cfi === 0) {
			res.redirect("/home");
			return false;
		}

		var data = {
			cri: req.session.cri,
			cfi: req.session.cfi,
		};

		var currentPassword = req.session.currentPassword;
		delete req.session.currentPassword;

		try {
			// Fetch general details
			const generalDetails = await IndexModel.selectGenerelDetails(
				res.pool,
				data,
			);

			if (generalDetails.length === 0) {
				return res.redirect("/home");
			}

			if (generalDetails.length > 0 && generalDetails[0].p_done == 1)
				return res.redirect("/home");

			// Fetch category list
			const categoryList = await IndexModel.getCategoryList(res.pool);

			// Fetch sammanter list
			const sammanterList = JSON.stringify(
				await IndexModel.getSammanterList(res.pool),
			);

			// Fetch post data
			const postList = JSON.stringify(
				await IndexModel.getPostData(
					res.pool,
					generalDetails[0].post_id,
				),
			);

			// fetch state and districts
			const _statesList = await IndexModel.getStatesList(res.pool);
			const _districtsList = await IndexModel.getDistrictsList(res.pool);

			// Render user details page
			res.render("new/user-details.pug", {
				title: "User Details",
				regIDInt: req.session.cri,
				regIDString: req.session.criString,
				form_id: req.session.cfi,
				userName: req.session.fullName,
				regPostName:
					generalDetails[0] !== undefined
						? generalDetails[0].post_name
						: "-",
				updateResult: JSON.stringify(generalDetails),
				data: generalDetails[0],
				currentPassword:
					currentPassword !== undefined ? currentPassword : "",
				postList: postList,
				p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
				sammanter: sammanterList,
				categoryList: categoryList,
				statesList: _statesList,
				districtsList: _districtsList,
			});
		} catch (error) {
			next(error);
		}
	},
	educationDetailsView: async (req, res, next) => {
		if (req.session.cfi === undefined) {
			res.redirect("/");
			return false;
		}
		var data = {
			cri: req.session.cri,
			cfi: req.session.cfi,
		};

		let _eduTypes = [];
		let _eduCourses = [];
		let _eduUni = [];

		try {
			// Fetch education details
			const educationDetails = await IndexModel.selecEducationDetails(
				res.pool,
				data,
			);

			if (educationDetails.length == 0) return res.redirect("/");
			if (educationDetails[0].p_done == 1) return res.redirect("/home");

			// Fetch educational universities
			const _eduUni = await IndexModel.selectEduUni(res.pool);

			// Fetch educational courses
			const _eduCourses = await IndexModel.selectEduCourses(res.pool);

			// Fetch educational types
			const _eduTypes = await IndexModel.selectEduTypes(res.pool);

			if (
				educationDetails[0]["education_details"] === "" ||
				!educationDetails[0]["education_details"]
			) {
				educationDetails[0]["education_details"] = [];
			}

			console.log(educationDetails, "==educationDetails==");

			// Fetch post details
			const postDetails = await IndexModel.getPostDataById(
				res.pool,
				educationDetails[0].post_id,
			);

			res.render("new/education-details.pug", {
				title: "Eduction Details",
				regIDInt: req.session.cri,
				regIDString: req.session.criString,
				form_id: req.session.cfi,
				userName: req.session.fullName,
				regPostName:
					educationDetails[0] !== undefined
						? educationDetails[0].post_name
						: "-",
				educationDetails: JSON.stringify(
					educationDetails[0]["education_details"],
				),
				postDetails: JSON.stringify(postDetails),
				p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
				_eduTypes,
				_eduCourses,
				_eduUni,
			});
		} catch (error) {
			console.log(error.message, "==error==");
			res.status(500).send({
				_call: 0,
				result: error,
				msg: "Server error, try Again",
			});
		}
	},

	userExperienceView: async (req, res, next) => {
		if (req.session.cfi === undefined) return res.redirect("/");

		const data = {
			cri: req.session.cri,
			cfi: req.session.cfi,
		};

		let _candidateExpDetails = await IndexModel.getExperienceDetails(
			res.pool,
			data,
		);

		if (
			_candidateExpDetails.length === 0 ||
			_candidateExpDetails[0].p_done == 1
		) {
			return res.redirect("/home");
		}

		let experienceList = _candidateExpDetails[0]?.experienceList
			? _candidateExpDetails[0].experienceList
			: [];

		let postExpDetails = await IndexModel.checkPostExperienceRequiredStatus(
			res.pool,
			_candidateExpDetails[0].post_id,
		);

		res.render("new/experience-details.pug", {
			title: "Experience Details",
			regIDInt: req.session.cri,
			regIDString: req.session.criString,
			form_id: req.session.cfi,
			userName: req.session.fullName,
			regPostName: _candidateExpDetails[0].post_name,
			experienceList: experienceList,
			p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
			isExpReq:
				postExpDetails[0].post_is_experience_required === 1
					? true
					: false,
			totalExpRequiredInYears:
				postExpDetails[0].post_is_experience_required === 1
					? postExpDetails[0].post_experience_years
					: 0,
			postExpDetails,
			_candidateExpDetails,
		});
	},

	userAchievementView: async (req, res, next) => {
		if (req.session.cfi === undefined) {
			res.redirect("/");
			return false;
		}
		var data = {
			cri: req.session.cri,
			cfi: req.session.cfi,
		};
		try {
			const _userAchievementDetails =
				await IndexModel.selectAchievementDetails(res.pool, data);

			if (_userAchievementDetails[0].p_done == 1) {
				return res.redirect("/home");
			}

			let achievementList = _userAchievementDetails[0]?.achievementList
				? _userAchievementDetails[0].achievementList
				: [];

			res.render("new/achievement-details.pug", {
				title: "User Achievement",
				regIDInt: req.session.cri,
				regIDString: req.session.criString,
				form_id: req.session.cfi,
				userName: req.session.fullName,
				regPostName: _userAchievementDetails[0].post_name,
				achievementList: achievementList,
				p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
			});
		} catch (error) {
			console.log(error.message, "==error.message==");
		}
	},
	documentUploadView: async (req, res, next) => {
		console.log(1, "==1==");
		if (req.session.cfi === undefined) return res.redirect("/");

		let data = {
			cri: req.session.cri,
			cfi: req.session.cfi,
		};

		try {
			// await IndexModel.

			const result = await IndexModel.selectDocumentDetails(
				res.pool,
				data,
			);
			console.log(result, "==result==");

			let images = {
				// photo: "/assets/images/upload-default/image.jpg",
				// sign: "/assets/images/upload-default/sign.jpg",
				// aadharCard:
				// 	"/assets/images/upload-default/aadhar-dummy-image.jpg",
				isP: false,
				isS: false,
				isA: false,
				s3URL: process.env.S3_BUCKET_URL,
			};

			if (result.length > 0) {
				if (result[0].p_done == 1) {
					res.redirect("/home");
					return;
				}

				if (result[0].photo !== "") {
					images.photo = result[0].photo;
					images.isP = true;
				}

				if (result[0].sign !== "") {
					images.sign = result[0].sign;
					images.isS = true;
				}

				if (result[0].aadharCard !== "") {
					images.aadharCard = result[0].aadharCard;
					images.isA = true;
				}
			}

			console.log(images, "==images==");
			res.render("new/document-upload.pug", {
				title: "User Profile Photo Upload",
				regIDInt: req.session.cri,
				regIDString: req.session.criString,
				form_id: req.session.cfi,
				userName: req.session.fullName,
				candidateDocumentDetails: result[0],
				regPostName: result[0].post_name,
				images: images,
				p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
			});
		} catch (error) {
			console.log(error, "==error==");
			next(error);
		}
	},

	documentUploadView_V2: async (req, res, next) => {
		console.log(1, "==1==");
		console.log(req.session);

		const { r, f } = req.query;

		if (!r || !f) return res.redirect("/");

		if (req.session.cri === undefined) return res.redirect("/");

		let data = {
			cri: req.session.cri,
			cfi: f,
		};

		console.log(data);

		try {
			const result = await IndexModel.selectDocumentDetails(
				res.pool,
				data,
			);

			if (result.length === 0) {
				return res.redirect("/");
			}

			console.log(result, "=result");

			let images = {
				// photo: "/assets/images/upload-default/image.jpg",
				// sign: "/assets/images/upload-default/sign.jpg",
				// aadharCard:
				// 	"/assets/images/upload-default/aadhar-dummy-image.jpg",
				isP: false,
				isS: false,
				isA: false,
				s3URL: process.env.S3_BUCKET_URL,
			};

			if (result.length > 0) {
				if (result[0].p_done == 1) {
					res.redirect("/home");
					return;
				}

				if (result[0].photo !== "") {
					images.photo = result[0].photo;
					images.isP = true;
				}

				if (result[0].sign !== "") {
					images.sign = result[0].sign;
					images.isS = true;
				}

				if (result[0].aadharCard !== "") {
					images.aadharCard = result[0].aadharCard;
					images.isA = true;
				}
			}

			console.log(images, "==images==");
			res.render("new/document-upload.pug", {
				title: "Document Upload",
				regIDInt: req.session.cri,
				regIDString: req.session.criString,
				form_id: f,
				userName: req.session.fullName,
				candidateDocumentDetails: result[0],
				regPostName: result[0].post_name,
				images: images,
				p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
			});
		} catch (error) {
			console.log(error, "==error==");
			next(error);
		}
	},

	getExtraUploadDocumentView: (req, res, next) => {
		if (req.session.cfi === undefined) {
			res.redirect("/");
			return false;
		}
		var data = {
			cri: req.session.cri,
			cfi: req.session.cfi,
		};
		IndexModel.selectExtraDocumentDetails(res.pool, data)
			.then(async function (result) {
				if (result.length > 0) {
					if (result[0].p_done == 1) {
						res.redirect("/home");
						return false;
					}

					res.render("new/extra-document-upload", {
						title: "User Document Uploading",
						regIDInt: req.session.cri,
						regIDString: req.session.criString,
						form_id: req.session.cfi,
						userName: req.session.fullName,
						regPostName:
							result[0] !== undefined ? result[0].post_name : "-",
						documents: result[0].documents,
						p: await responderSet.getFromGlobalCache(
							`p_${__processDb}`,
						),
					});
				} else {
					res.redirect("/home");
					return false;
				}
			})
			.catch(function (error) {
				next(error);
			});
	},

	forgetPasswordView: (req, res, next) => {
		res.render("forget-password", {
			title: "Forget Password",
		});
	},

	forgetUsernameView: (req, res, next) => {
		res.render("forget-username", {
			title: "Forget UserName",
		});
	},

	getApplicationView: async (req, res, next) => {
		// final application print
		var data = req.query;
		if (typeof data.r == "undefined") {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		data.r = Number(data.r);

		if (isNaN(data.r)) {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		if (typeof data.f == "undefined") {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		data.f = Number(data.f);
		if (isNaN(data.f)) {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		var getData = {
			r_id: data.r,
			f_id: data.f,
		};
		try {
			console.log(getData, "==getData==");
			infoLog(JSON.stringify(getData));
			const previewData = await IndexModel.selectPreviewDataFinal(
				res.pool,
				getData,
			);
			console.log(previewData, "==previewData==");

			if (previewData.length === 0) {
				return res.redirect("/home");
			}

			if (
				previewData[0].g_done == 0 ||
				previewData[0].d_done == 0 ||
				previewData[0].p_done == 0
			) {
				return res.redirect("/home");
			}

			res.render("application", {
				title: "Application Print",
				regIDInt: data.r,
				regIDString: "",
				form_id: data.f,
				preview_data: previewData[0],
				p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
				todaysDate: responderSet.momentDates.getDateOnly({
					dateFormat: "DD-MM-YYYY",
				}),
				s3BucketUrl: process.env.S3_BUCKET_URL,
			});
		} catch (error) {
			next(error);
		}
	},

	getApplicationView_V2: async (req, res, next) => {
		// final application print

		const { r, f } = req.query;

		if (!r || !f) return res.redirect("/");

		var getData = {
			r_id: r,
			f_id: f,
		};
		try {
			console.log(getData, "==getData==");
			infoLog(JSON.stringify(getData));
			const previewData = await IndexModel.selectPreviewDataFinal(
				res.pool,
				getData,
			);
			console.log(previewData, "==previewData==");

			if (previewData.length === 0) {
				return res.redirect("/home");
			}

			if (
				previewData[0].g_done == 0 ||
				previewData[0].d_done == 0 ||
				previewData[0].p_done == 0
			) {
				return res.redirect("/home");
			}

			res.render("application", {
				title: "Application Print",
				regIDInt: r,
				regIDString: "",
				form_id: f,
				preview_data: previewData[0],
				p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
				todaysDate: responderSet.momentDates.getDateOnly({
					dateFormat: "DD-MM-YYYY",
				}),
				s3BucketUrl: process.env.S3_BUCKET_URL,
			});
		} catch (error) {
			next(error);
		}
	},

	applicationPreview: async (req, res, next) => {
		try {
			var data = {
				cri: req.session.cri,
				cfi: req.session.cfi,
			};
			const result = await IndexModel.selectPreviewData(res.pool, data);
			console.log(result, "==result==");

			if (result.length === 0 || result[0].p_done === 1) {
				return res.redirect("/home");
			}

			if (
				result[0].g_done == 0 &&
				result[0].e_done == 0 &&
				result[0].d_done == 0
			) {
				return res.redirect("/home");
			}

			res.render("new/application-preview.pug", {
				title: "Application Preview",
				regIDInt: req.session.cri,
				regIDString: req.session.criString,
				form_id: req.session.cfi,
				userName: req.session.fullName,
				regPostName: result[0]?.post_name || "-",
				preview_data: result[0] || [],
				p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
				s3BucketUrl: process.env.S3_BUCKET_URL,
			});
		} catch (error) {
			next(error);
		}
	},
	getUserLogout: (req, res, next) => {
		delete req.session.cri;
		delete req.session.cfi;
		req.session.destroy();
		res.redirect("/");
	},
	testLogin: (req, res, next) => {
		// var data = req.body;
		let data = {};
		data["utrUserName"] = 1;
		data["utrPassword"] = 1;
		IndexModel.checkForLogin(res.pool, data)
			.then(function (result) {
				if (result.length === 0) {
					req.session.ErrorMessage =
						"Invalid User Id or Password, Try Again";
					console.log(req.session.ErrorMessage);
					res.redirect("/login");
					return false;
				} else {
					let base64data = resultStatus.toBase64(
						Number(result[0].id).toString(),
					);
					req.session.cri = Number(result[0].id);
					req.session.criString = base64data;
					req.session.fullName =
						result[0].ub_first_name +
						" " +
						result[0].ub_middle_name +
						" " +
						result[0].ub_last_name;
					req.session.fatherName = result[0].ub_middle_name;
				}
				next();
			})
			.catch(function (error, status) {
				res.status(500).send(error);
			});
	},
	makeUserLogedIn: async (req, res, next) => {
		var data = req.body;
		const _loginResp = await IndexModel.checkForLogin(res.pool, data);

		if (_loginResp.length === 0) {
			req.session.ErrorMessage = "Invalid User Id or Password, Try Again";

			res.redirect("/");
			return false;
		}

		let base64data = resultStatus.toBase64(
			Number(_loginResp[0].id).toString(),
		);

		req.session.cri = Number(_loginResp[0].id);
		req.session.criString = base64data;
		req.session.fullName = _loginResp[0].ub_first_name;

		req.session.fatherName = _loginResp[0].ub_middle_name;

		// add login log time stamp
		console.log("Adding candidate login log");
		await IndexModel.addLoginTimeStamp(res.pool, req.session.cri);

		res.redirect("/home");
	},
	makeUserLogedInOnlyPay: (req, res, next) => {
		var data = req.body;
		let login_details = [];

		IndexModel.checkForLogin(res.pool, data)
			.then(function (result) {
				login_details = result;
				if (login_details.length === 0) {
					req.session.ErrorMessage =
						"Invalid User Id or Password, Try Again";
					console.log(req.session.ErrorMessage);
					res.redirect("/login");
					return false;
				} else {
					return IndexModel.checkForPayDone(
						res.pool,
						login_details[0],
						1,
					);
				}
			})
			.then(function (result) {
				if (result !== false) {
					if (result.length === 0) {
						req.session.ErrorMessage =
							"Invalid User Id or Password, Try Again";
						console.log(req.session.ErrorMessage);
						res.redirect("/login");
						return false;
					} else {
						let base64data = resultStatus.toBase64(
							Number(login_details[0].id).toString(),
						);
						req.session.cri = Number(login_details[0].id);
						req.session.criString = base64data;
						req.session.fullName = login_details[0].ub_first_name;

						req.session.fatherName =
							login_details[0].ub_middle_name;
						res.redirect("/home");
						return false;
					}
				}
			})
			.catch(function (error, status) {
				res.status(500).send(error);
			});
	},

	setEditor: (req, res, next) => {
		var data = req.body;
		req.session.cfi = Number(data.cfi);
		res.status(200).send({ _call: 1 });
	},

	addNewCandidate: (req, res, next) => {
		let data = req.body;
		console.log(data, "==new registration data==");
		let randomstring = Math.floor(100000 + Math.random() * 900000);
		let mobileNo = data.newMobileNumber;

		IndexModel.preAddharChecking(res.pool, data)
			.then(function (result) {
				if (result.length > 0) {
					return false;
				} else {
					return IndexModel.NewCandidate(
						res.pool,
						[data],
						randomstring,
					);
				}
			})
			.then(function (result) {
				if (result == false) {
					res.status(200).send({
						_call: 2,
						message: "duplicate addhar",
					});
				} else {
					// var mailData = {
					// 	to: data.newMailPartOne,
					// 	subject: `${process.name} Recruitment Process.`,
					// 	message: `Dear ${data.newFname},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Your registration for ${process.name} recruitment is done successfully.Your login details are as <br> UserName: <strong>${result.insertId} </strong> <br> Password: <strong>${randomstring} </strong> <br>Do not share the credentials.<br>Thank you.`,
					// };
					// emailModel.sendEmailGmailCallback(mailData, function (data) {});
					let details = {
						ub_first_name: data.newFname,
						ub_middle_name: data.newMname,
						ub_last_name: data.newLname,
						r_id: result.insertId,
						ub_password: randomstring,
						email: data.newMailPartOne,
					};
					let sms = {
						mobile: mobileNo,
						username: result.insertId,
						password: randomstring,
					};

					smsModel.sendSMS(
						{ smsDetails: sms, smsType: REGISTRATION_SMS_TYPE },
						function (smsResponse) {
							// console.log(smsResponse, "==smsResponse==");
						},
					);

					// let context = registrationDone(details);
					// emailModel.sendEmailGmailPromise(details.email, context);
					// emailController.sendRegistrationEmail(details);

					let base64data = resultStatus.toBase64(
						result.insertId.toString(),
					);
					req.session.cri = result.insertId;
					req.session.cfi = 0;
					req.session.criString = base64data;
					req.session.currentPassword = randomstring;
					req.session.fullName = data.newFname;
					req.session.fatherName = data.newMname;
					res.status(200).send({ _call: 1, resp_id: base64data });
				}
			})
			.catch(error => {
				console.log(error);
				next(error);
			});
	},
	saveEligibleDetails: (req, res, next) => {
		var data = req.body;
		console.log(data, "==data saveEligibileDetaisl==");

		IndexModel.getPaymantDetails(res.pool, data)
			.then(function (result) {
				if (result.length == 0)
					throw new Error("No payment found for selected caste.");
				data["payment"] = result[0].pi_payment;
				data["tax_per"] = result[0].pi_tax_per;
				data["tax_payment"] = result[0].pi_tax_payment;
				return IndexModel.createNewAppication(res.pool, [data]);
			})
			.then(function (result) {
				req.session.cfi = result.insertId;
				res.status(200).send({
					_call: 1,
					form_id: result.insertId,
					type: "add",
				});
			})
			.catch(function (error, status) {
				console.log(error, "==error==");
				next(error);
			});
	},

	saveGeneralDetails: (req, res, next) => {
		let data = req.body;
		console.log(data, "==data==");

		IndexModel.updateGeneralDetails(res.pool, [data])
			.then(function (result) {
				res.status(200).json({
					call: 1,
					message: "Successfully saved general details.",
				});
			})
			.catch(function (error, status) {
				console.log(error, "-err");
				res.status(200).json({
					call: 1,
					message: error?.message || "Server error.",
				});
			});
	},

	saveGeneralDetails_V2: async (req, res, next) => {
		let data = req.body;
		console.log(data,'-req.body');

		try {
			await IndexModel.updateBasicDetails_V2(res.pool, data);

			await IndexModel.updateGeneralDetails_V2(res.pool, data);

			if (data.isUpdated) {
				await IndexModel.addUpdateDetailsLog(res.pool, data);
			}

			return res
				.status(200)
				.json(new ApiResponseV2(200, "Successfully updated"));
		} catch (error) {
			next(error);
		}
	},
	saveEducationDetails: (req, res, next) => {
		var data = req.body;
		IndexModel.updateEducationDetails(res.pool, data)
			.then(function (result) {
				res.status(200).send({ _call: 1, type: "updated" });
			})
			.catch(function (error, status) {
				res.status(500).send(error);
			});
	},

	saveExperienceDetails: (req, res, next) => {
		var data = req.body;
		IndexModel.updateExperienceDetails(res.pool, data)
			.then(function (result) {
				res.status(200).send({ _call: 1, type: "updated" });
			})
			.catch(function (error, status) {
				res.status(500).send(error);
			});
	},
	saveAchievementDetails: (req, res, next) => {
		var data = req.body;
		IndexModel.updateAchievementDetails(res.pool, data)
			.then(function (result) {
				res.status(200).send({ _call: 1, type: "updated" });
			})
			.catch(function (error, status) {
				res.status(500).send(error);
			});
	},
	savePreview: (req, res, next) => {
		// if (req.session.cri === undefined) {
		// 	res.status(200).send({ _call: 2 });
		// 	return false;
		// }
		const data = {
			cri: req.session.cri,
			cfi: req.session.cfi,
		};
		IndexModel.saveApplicationPreview(res.pool, data)

			.then(function (result) {
				res.status(200).send({ _call: 1, type: "updated" });
			})
			.catch(function (error, status) {
				res.status(500).send(error);
			});
	},
	saveUploadDocuemnt: async (req, res, next) => {
		var data = req.body;
		var files = req.files;

		var is_to_update = false;
		var update_data = {
			photo_name: "",
			sign_name: "",
			aadhar_card_name: "",
			cfi: Number(data.cfi),
			cri: Number(data.cri),
		};
		if (Object.keys(files).length == 0) {
			res.status(200).send({
				_call: -1,
				msg: "No Document was uploaded.",
			});
		} else {
			var photo = files.photo;
			var sign = files.sign;
			var aadharCard = files.aadharCard;

			if (photo != undefined) {
				is_to_update = true;
				update_data.photo_name = photo[0].filename;
			}
			if (sign != undefined) {
				is_to_update = true;
				update_data.sign_name = sign[0].filename;
			}

			if (aadharCard != undefined) {
				is_to_update = true;
				update_data.aadhar_card_name = aadharCard[0].filename;
			}

			console.log(update_data, "==update_data==");

			if (is_to_update) {
				IndexModel.updateDocumentInfo(res.pool, update_data)
					.then(function (result) {
						res.status(200).send({
							_call: 1,
							msg: "Document Saved Successfully.",
						});
					})
					.catch(function (error) {
						console.log(error, "==error==");
						res.status(500).send({
							_call: 0,
							result: error,
							msg: "Unable To Upload Document, Try Again",
						});
					});
			} else {
				res.status(200).send({
					_call: -1,
					msg: "No Document was uploaded.",
				});
			}
		}
	},

	savesS3DoumentName: async (req, res, next) => {
		try {
			const data = req.body;
			console.log(data, "==data==");
			await IndexModel.savesS3DoumentName(res.pool, data);
			return res
				.status(201)
				.json(
					new ApiResponse(
						201,
						true,
						`${data.img_type} Upload Successful.`,
					),
				);
		} catch (error) {
			next(error);
		}
	},

	delteS3DoumentName: async (req, res, next) => {
		try {
			const data = req.body;
			console.log(data, "==data==");
			await awsController.deleteFile_2(data.file_name);
			await IndexModel.deleteS3DoumentName(res.pool, data);
			return res
				.status(201)
				.json(
					new ApiResponse(
						201,
						true,
						`${data.img_type}  deleted successfully`,
					),
				);
		} catch (error) {
			console.log(error, "==error==");
			next(error);
		}
	},

	updateDocumentDetailsDone: async (req, res, next) => {
		try {
			const data = req.body;
			console.log(data, "==data==");
			const _upateResp = await IndexModel.updateDocumentDetailsDone(
				res.pool,
				data,
			);
			console.log(_upateResp, "==_upateResp==");
			return res
				.status(201)
				.json(
					new ApiResponse(201, true, "Documents saved successfully."),
				);
		} catch (error) {
			next(error);
		}
	},

	saveExtraUploadDocuemnt: (req, res, next) => {
		var data = req.body;
		var files = req.files;
		var is_to_update = false;
		let documents = JSON.parse(data.documents);
		let index = Number(data.current_id);
		documents[index].delete = true;
		documents[index].view = true;
		documents[index].edit = false;
		documents[index].filePath = files.extra_doc[0].filename;
		var update_data = {
			documents: JSON.stringify(documents),
			cfi: Number(data.cfi),
			cri: Number(data.cri),
		};
		if (Object.keys(files).length == 0) {
			res.status(200).send({
				_call: -1,
				msg: "No Document was uploaded.",
			});
		} else {
			IndexModel.updateExtraDocumentInfo(res.pool, update_data)
				.then(function (result) {
					res.status(200).send({
						_call: 1,
						msg: "Document Saved Successfully.",
					});
				})
				.catch(function (error) {
					res.status(500).send({
						_call: 0,
						result: error,
						msg: "Unable To Upload Document, Try Again",
					});
				});
		}
	},
	finalizedExtraUploadDocuemnt: (req, res, next) => {
		var data = req.body;
		var update_data = {
			documents: data.documents,
			cfi: Number(data.cfi),
			cri: Number(data.cri),
		};
		IndexModel.updateExtraDocumentInfo(res.pool, update_data, 1)
			.then(function (result) {
				res.status(200).send({
					_call: 1,
					msg: "Document Saved Successfully.",
				});
			})
			.catch(function (error) {
				res.status(500).send({
					_call: 0,
					result: error,
					msg: "Unable To Upload Document, Try Again",
				});
			});
	},
	checkForPostDetails: (req, res, next) => {
		var data = req.body;
		if (req.session.cri === undefined) {
			res.status(200).send({ _call: 999, message: "session expires" });
			return false;
		}

		IndexModel.checkDuplicatePost(res.pool, data, req.session.cri)
			.then(function (result) {
				if (result.length > 0) {
					res.status(200).send({ _call: 2, type: "post found" });
				} else {
					res.status(200).send({
						_call: 1,
						message: "post not found",
					});
				}
			})
			.catch(function (error, status) {
				res.status(500).send(error);
			});
	},
	getVerifyRecoveryDetails: (req, res, next) => {
		var data = req.body;
		IndexModel.getVerifyRecoveryDetails(res.pool, data)
			.then(function (result) {
				if (result.length > 0) {
					var mobile = result[0].mobile.replace(/\d(?=\d{4})/g, "*");
					var email = indexController.maskEmail(result[0].email);
					var sendData = {
						mobile: mobile,
						email: email,
						password: result[0].password,
					};
					res.status(200).send({
						_call: 1,
						type: "data found",
						data: sendData,
					});
				} else {
					res.status(200).send({
						_call: 0,
						message: "data not found",
					});
				}
			})
			.catch(function (error, status) {
				res.status(500).send(error);
			});
	},
	sendOTP: (req, res, next) => {
		var data = req.body;
		if (data.attempt == 1) {
			var otp = Math.floor(Math.random() * 9000 + 1000);
			IndexModel.saveOTP(res.pool, data, otp)
				.then(function (result) {
					if (result.affectedRows === 1) {
						return IndexModel.getVerifyRecoveryDetails(
							res.pool,
							data,
						);
					} else {
						res.status(200).send({
							_call: 2,
							message: "post not found",
						});
						return 999;
					}
				})
				.then(function (result) {
					if (result !== 999) {
						if (result.length > 0) {
							var mobile = result[0].mobile;
							var mail = result[0].email;
							if (data.type == "m") {
							} else {
								var mailData = {
									to: mail,
									subject: `OTP For Forget Password.`,
									message: `Dear Candidate,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Your One Time Password(OTP) is <strong>${otp}</strong> <br>Do not share the otp.<br>Thank you.`,
								};
								emailModel.sendEmailGmailCallback(
									mailData,
									function (data) {
										res.status(200).send({
											_call: 1,
											data: data,
										});
									},
								);
							}
						} else {
							res.status(200).send({
								_call: 0,
								message: "data not found",
							});
						}
					}
				})
				.catch(function (error, status) {
					res.status(500).send(error);
				});
		} else {
			IndexModel.getVerifyRecoveryDetails(res.pool, data)
				.then(function (result) {
					if (result !== 999) {
						if (result.length > 0) {
							var mobile = result[0].mobile;
							var mail = result[0].email;
							if (data.type == "m") {
							} else {
								var mailData = {
									to: mail,
									subject: `OTP For Forget Password.`,
									message: `Dear Candidate,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Your One Time Password(OTP) is <strong>${result[0].otp}</strong> <br>Do not share the otp.<br>Thank you.`,
								};
								emailModel.sendEmailGmailCallback(
									mailData,
									function (data) {
										res.status(200).send({
											_call: 1,
											data: data,
										});
									},
								);
							}
						} else {
							res.status(200).send({
								_call: 0,
								message: "data not found",
							});
						}
					}
				})
				.catch(function (error, status) {
					res.status(500).send(error);
				});
		}
	},
	maskEmail: function (myemailId) {
		var maskid = "";
		var myemailId = myemailId;
		var prefix = myemailId.substring(0, myemailId.lastIndexOf("@"));
		var postfix = myemailId.substring(myemailId.lastIndexOf("@"));
		for (var i = 0; i < prefix.length; i++) {
			if (i == 0 || i == prefix.length - 1) {
				maskid = maskid + prefix[i].toString();
			} else {
				maskid = maskid + "*";
			}
		}
		maskid = maskid + postfix;
		return maskid;
	},
	getPasswordRecovery: (req, res, next) => {
		var data = req.body;
		if (isNaN(Number(data.otpNumber))) {
			res.status(200).send({ _call: 0, message: "data not found" });
		} else {
			IndexModel.getPasswordRecovery(res.pool, data)
				.then(function (result) {
					if (result.length > 0) {
						res.status(200).send({
							_call: 1,
							type: "data found",
							data: result[0].password,
						});
					} else {
						res.status(200).send({
							_call: 0,
							message: "data not found",
						});
					}
				})
				.catch(function (error, status) {
					res.status(500).send(error);
				});
		}
	},

	getUsernameRecovery: (req, res, next) => {
		var data = req.body;
		IndexModel.getUserNameRecovery(res.pool, data)
			.then(function (result) {
				if (result.length > 0) {
					res.status(200).send({
						_call: 1,
						type: "data found",
						data: result,
					});
				} else {
					res.status(200).send({
						_call: 0,
						message: "data not found",
					});
				}
			})
			.catch(function (error, status) {
				res.status(500).send(error);
			});
	},

	paymentChecksum: async (req, res) => {
		var { token } = req.params;
		IndexModel.getUserDetailsByTransactionId(res.pool, token)
			.then(function (result) {
				if (result.length === 0) {
					res.status(200).send({
						message: "Invalid user passed",
					});
					return false;
				}
				res.redirect(
					`/payment-status/${result[0].reg_id}/${result[0].form_id}`,
				);
			})
			.catch(function (error) {
				res.status(500).send({ data: error, call: 0 });
			});
	},
	checkPaymentStatus: async (req, res) => {
		var { r, f, t } = req.params;
		var { t } = req.query;
		console.log(t);
		let pay = {};
		let userData = [];
		if (typeof r == "undefined") {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		r = Number(r);

		if (isNaN(r)) {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		if (typeof f == "undefined") {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		f = Number(f);
		if (isNaN(f)) {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		IndexModel.getUserDetailsByUserId(res.pool, r, f)
			.then(async function (result) {
				console.log(r, f);
				userData = result;
				if (userData.length === 0) {
					res.status(200).send({
						message: "User Not Found",
					});
					return false;
				}
				const options = {
					method: "POST",
					url: `${process.env.DB_BASE_URL}/check-payment-status`,
					headers: {
						accept: "application/json",
						"Content-Type": "application/json",
					},
					data: {
						token: t !== undefined ? t : result[0].token,
					},
				};
				console.log(options);
				let response = await axios.request(options);

				if (response.data.status === true) {
					let details = response.data.payment.fullPayDetails;
					details.success = details.success ? 1 : 0;
					IndexModel.getPreVerificationDetails(res.pool, {
						r,
						f,
						t: details.data.merchantTransactionId,
					})
						.then(result => {
							if (result.length === 0) {
								return IndexModel.saveVerificationDetails(
									res.pool,
									{
										r,
										f,
										...details,
										date: response.data.date.date,
										time: response.data.date.time,
									},
								);
							} else {
								return IndexModel.updateVerificationDetails(
									res.pool,
									{
										r,
										f,
										...details,
										date: response.data.date.date,
										time: response.data.date.time,
									},
								);
							}
						})
						.then(result => {
							if (result.affectedRows === 1) {
								let updatePay = {
									isPayDone:
										details.code == "PAYMENT_SUCCESS"
											? 1
											: 0,
									code: details.code,
									t_id: details.data.merchantTransactionId,
									amount:
										details.data.amount !== undefined
											? details.data.amount
											: 0,
								};
								return IndexModel.updateOnlinePaymentStatus(
									res.pool,
									updatePay,
								);
							} else {
								res.send({
									status: false,
									message:
										"check to fail payment status, try again",
								});
								return false;
							}
						})
						.then(result => {
							res.redirect(`/verify-details/${r}/${f}`);
						})
						.catch(error => {
							res.send({
								status: false,
								message: "something went wrong, try again.",
								error,
							});
						});
				} else {
					res.send({
						status: false,
						message: "payment server error try again",
					});
				}
			})
			.catch(function (error) {
				console.log(error);
				res.status(500).send({ data: error, call: 0 });
			});
	},
	getVerifyDetails: async (req, res) => {
		var { r, f } = req.params;
		let isPayDone = 0;
		let userData = [];
		IndexModel.getUserDetailsByUserId(res.pool, r, f)
			.then(function (result) {
				userData = result;
				if (userData.length === 0) {
					res.status(200).send({
						message: "User Not Found",
					});
					return false;
				}

				if (
					userData[0].ca_payment_online_status_message === "-" &&
					userData[0].ca_payment_done === 0
				) {
					redirect("/");
					return false;
				}

				return IndexModel.getUserPaymentHistoryDetails(res.pool, {
					r,
					f,
				});
			})
			.then(async result => {
				if (result) {
					res.render("new/verify-user-online-payment", {
						call: 1,
						userData: userData[0],
						pay: result,
						p: await responderSet.getFromGlobalCache(
							`p_${__processDb}`,
						),
					});
				}
			})
			.catch(function (error) {
				res.status(500).send({ data: error, call: 0 });
			});
	},

	oldGetVerifyDetails: async (req, res) => {
		var getData = req.body;
		let pay = {};
		let userData = [];

		IndexModel.getUserDetailsByTransactionId(
			res.pool,
			getData.transactionId,
		)
			.then(function (result) {
				userData = result;
				if (userData.length === 0) {
					res.status(200).send({
						message: "User Not Found",
					});
					return false;
				}
				let merchantId = process.env.MERCHANT_ID;
				let merchantTransactionId = getData.transactionId;
				let salt = process.env.SALT;
				let saltIndex = process.env.SALT_INDEX;

				let details_1 =
					process.env
						.DB_BASE_URL`/pg/v1/status/${merchantId}/${merchantTransactionId}` +
					salt;
				let sha256 = createHash("sha256")
					.update(details_1)
					.digest("hex");
				sha256 += "###" + saltIndex;

				const options = {
					method: "GET",
					url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
					headers: {
						accept: "application/json",
						"Content-Type": "application/json",
						"X-VERIFY": sha256,
						"X-MERCHANT-ID": merchantId,
					},
				};

				axios
					.request(options)
					.then(function (response) {
						let updatePay = {
							token: response.data.data.merchantTransactionId,
							transactionId: response.data.data.transactionId,
							amount: response.data.data.amount,
							state: response.data.data.state,
							responseCode: response.data.data.responseCode,
							fullPayDetails: response.data,
						};
						pay = { ...updatePay };
						var _date = {
							date: myDates.getDate(),
							time: myDates.getTime(),
						};
						return IndexModel.updateOnlinePaymentStatus(
							res.pool,
							updatePay,
							_date,
						);
					})
					.then(function (result) {
						if (result.affectedRows !== 0) {
							res.render("new/verify-user-online-payment", {
								call: 1,
								userData: userData[0],
								pay,
							});
						} else {
							res.status(200).send({
								call: 0,
							});
						}
					})
					.catch(function (error) {
						console.log(error);
						console.log(error);
						console.log(error);

						res.status(500).send({ data: error, call: 0 });
					});
			})
			.catch(function (error) {
				res.status(500).send({ data: error, call: 0 });
			});
	},
	getPlacePaymentOrder: async (req, res) => {
		var getData = req.body;
		var params = {};
		try {
			let result = await IndexModel.getOnlinePaymentToken(
				res.pool,
				getData,
			);
			const options = {
				method: "POST",
				url: `${process.env.DB_BASE_URL}/api/payment/order`,
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
				},
				data: {
					merchantTransactionId: result[0].token,
					amount: 1180 * 100,
					mobileNumber: "9999999999",
				},
			};
			let response = await axios.request(options);
			let { data, status } = response.data;
			if (status === 2) {
				res.status(500).send({ ...data, call: 2 });
			} else if (status === 3) {
				res.status(500).send({ ...response.data, call: 3 });
			} else {
				res.status(200).send({
					data: response.data.response.data.instrumentResponse
						.redirectInfo.url,
					call: 1,
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).send({ data: error, call: 0 });
		}
	},
	savePaymentCallanDetail: (req, res) => {
		var getData = req.body;
		var _date = {
			date: myDates.getDate(),
			time: myDates.getTime(),
		};
		IndexModel.updatePaymentChallanStatus(res.pool, getData, _date)
			.then(result => {
				res.status(200).send({ call: 1, result: result });
			})
			.catch(error => {
				res.status(500).send({ call: 2, error: error });
			});
	},
	getPlacePaymentOrderVerify: (req, res) => {
		var getData = req.body;
		var body =
			req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
		var crypto = require("crypto");
		var expectedSignature = crypto
			.createHmac("sha256", "oA0ygiaELrNyziKLoYLchCy9")
			.update(body.toString())
			.digest("hex");
		var response = { call: 0 };
		if (expectedSignature === req.body.razorpay_signature) {
			/*var mailData = {
        to: data.newMailPartOne + "@" + data.newMailPartTwo,
        subject: `${process.name} Recruitment Process.`,
        message: `Dear ${data.newFname},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Your registration for ${process.name} recruitment is done successfully.Your login details are as <br> UserName: <strong>${result.insertId} </strong> <br> Password: <strong>${randomstring} </strong> <br>Do not share the credentials.<br>Thank you.`,
      };
      emailModel.sendEmailGmailCallback(mailData, function (data) {});
      */
			//email
			var _date = {
				date: myDates.getDate(),
				time: myDates.getTime(),
			};
			var SMS = {
				userMobileNo: getData.contact,
				docSMS: `Dear ${getData.name},\nThank you for your payment.refer details of transaction.\nProcess :: ${getData.process} \nPost:: ${getData.post} \nAmount :: Rs.${getData.amount}/- \nDate:: ${_date.date} ${_date.time} \nTransaction ID:: ${getData.razorpay_payment_id}.`,
			};

			IndexModel.updatePaymentStatus(res.pool, getData, _date)
				.then(result => {
					res.status(200).send({ call: 1, result: result });
				})
				.catch(error => {
					res.status(500).send({ call: 2, error: error });
				});
		} else {
			res.status(200).send({ call: 0 });
		}
	},

	printHallTicket: async function (req, res, next) {
		try {
			const { r, f } = req.query;

			const r_id = Number(r);
			const f_id = Number(f);

			if (!r_id || !f_id || isNaN(r_id) || isNaN(f_id)) {
				res.render("new/error-page.pug", {
					errorTitle: "Woops!",
					errorMessage: "Invalid details passed.",
				});
			}

			let userData = {
				candidate: {},
				htDetails: {},
				slotDetails: {},
			};

			const candidateDetails = await IndexModel.getSoloCandidateDetails(
				res.pool,
				r_id,
			);

			if (candidateDetails.length === 0) {
				res.render("new/error-page.pug", {
					errorTitle: "Woops!",
					errorMessage: "Requested Candidate Details Not Found.",
				});
			}

			userData.candidate = candidateDetails[0];

			const candidateHtDetails =
				await IndexModel.getSoloCandidateHTDetails(res.pool, {
					r_id,
					f_id,
				});

			if (candidateHtDetails.length === 0) {
				res.render("new/error-page.pug", {
					errorTitle: "Woops!",
					errorMessage:
						"Requested Candidate Hallticket Details Not Found.",
				});
			}

			userData.htDetails = candidateHtDetails[0];

			const candidateSlotDetails = await IndexModel.getSoloSlotDetails(
				res.pool,
				userData.htDetails.ca_batch_slot,
			);

			if (candidateSlotDetails.length === 0) {
				res.render("new/error-page.pug", {
					errorTitle: "Woops!",
					errorMessage: "Candidate Slot Details Not Found.",
				});
			}

			userData.slotDetails = candidateSlotDetails[0];

			await IndexModel.updateHTDownload(res.pool, { r_id, f_id });

			// TODO (Omkar) : check process type and render hallticket accordingly
			const _process = await IndexModel.getProcessData(res.pool);
			if (_process[0].print_hall_ticket === 1) {
				res.render("new/error-page.pug", {
					errorTitle: "Woops!",
					errorMessage: "Hallticket Printing Is Not Started Yet.",
				});
			}

			// TODO (Omkar) : get rules data as per process (online [from db], offline [from s3])
			const rulesList = await IndexModel.getHtRulesList(res.pool);
			const rulesFilesList = await IndexModel.getHtRulesFilesList(
				res.pool,
			);

			if (rulesList.length === 0) {
				res.render("new/error-page.pug", {
					errorTitle: "Woops!",
					errorMessage: "Hallticket rules not found.",
				});
			}

			//  1 = ONLINE, 2 = OFFLINE
			const RENDER_HT_FILE_NAME =
				_process[0].process_mode === 1
					? "candidate-hallticket-online.pug"
					: "candidate-hallticket-offline.pug";

			console.log(userData, "==userData==");
			console.log(_process, "==_process==");

			res.render(RENDER_HT_FILE_NAME, {
				p: _process,
				ca: userData.candidate,
				ht: userData.htDetails,
				slot: userData.slotDetails,
				s3BucketUrl: process.env.S3_BUCKET_URL,
				rulesList,
				rulesFilesList,
			});
		} catch (error) {
			next(error);
		}
	},

	previewHallTicket: async function (req, res, next) {
		try {
			let userData = {
				candidate: {
					id: 1,
					ub_first_name: "OMKAR",
					ub_middle_name: "POPAT",
					ub_last_name: "PATOLE",
					ub_mobile_number: "7857684763",
					ub_email_id: "omkarpatole@gmail.com",
					ub_aadhar_number: "554538976555",
				},
				htDetails: {
					id: 50001,
					ca_reg_id: 10001,
					ca_post_id: 1,
					ca_post_name: "Jr. Clerk",
					ca_detailsMainPost: "DUMMY_POST",
					ca_gender: "male",
					ca_pin_number: 332423,
					ca_sign:
						"दि कोडोली उर्बन को ऑप. बँक लि, कोडोली/users/दि कोडोली उर्बन को ऑप. बँक लि, कोडोली_sign_500016_2025-01-10 19:49:29.jpeg",
					ca_photo:
						"दि कोडोली उर्बन को ऑप. बँक लि, कोडोली/users/दि कोडोली उर्बन को ऑप. बँक लि, कोडोली_photo_500010_2025-01-10 13:50:38.jpeg",
					ca_aadhar_card:
						"ff_demo_1/users/ff_demo_1_aadharCard_1_2024-17-12 17:24:02.jpeg",
					ca_preview_done: 0,
					ca_payment_done: 1,
					ca_payment_type: 1,
					ca_valid_user: 1,
					ca_roll_number: 10001,
					ca_center_name:
						"Vinayak Ganesh Vaze College Of Arts, Science, And Commerce (Autonomous), Mithagar Road, Mulund(East), Mumbai - 400081",
					ca_center_code: "101",
					ca_batch_time: "10:00 AM TO 11:30 PM",
					ca_batch_slot: 1,
					birth_date: "14-12-1993",
					birth_pass: "14121993",
					exam_date: "24/12/2024",
				},
				slotDetails: {
					id: 1,
					slot: "1",
					time: "10:00 AM TO 11:30 PM",
					entry_time: "08:30 AM",
					gate_close_time: "09:45 PM",
				},
			};

			const _process = await IndexModel.getProcessData(res.pool);

			const rulesList = await IndexModel.getHtRulesList(res.pool);
			const rulesFilesList = await IndexModel.getHtRulesFilesList(
				res.pool,
			);

			//  1 = ONLINE, 2 = OFFLINE
			const RENDER_HT_FILE_NAME =
				_process[0].process_mode === 1
					? "candidate-hallticket-online.pug"
					: "candidate-hallticket-offline.pug";

			res.render(RENDER_HT_FILE_NAME, {
				p: _process,
				ca: userData.candidate,
				ht: userData.htDetails,
				slot: userData.slotDetails,
				s3BucketUrl: process.env.S3_BUCKET_URL,
				rulesList,
				rulesFilesList,
			});
		} catch (error) {
			next(error);
		}
	},

	paperResult: function (req, res) {
		var userData = {
			personal: {},
			educational: {},
		};

		var data = req.query;
		if (typeof data.r == "undefined") {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		data.r = Number(data.r);

		if (isNaN(data.r)) {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		if (typeof data.f == "undefined") {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		data.f = Number(data.f);
		if (isNaN(data.f)) {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}

		IndexModel.getSoloCandidateDetails(res.pool, data.r)
			.then(result => {
				if (result.length !== 1) {
					res.status(200).send({
						_call: 0,
						message: "resource not found",
					});
					return 999;
				} else {
					userData.personal = result[0];
					return IndexModel.getResultDetails(res.pool, data);
				}
			})
			.then(result => {
				if (result !== 999) {
					if (result.length == 0) {
						res.status(200).send({
							_call: 0,
							message: "resource not found",
						});
						return 999;
					} else {
						return result;
					}
				}
			})
			.then(result => {
				if (result !== 999) {
					userData.educational = result[0];
				} else {
					return 999;
				}
			})
			.then(result => {
				console.log(result);
				if (result !== 999) {
					return IndexModel.getInterViewSlotDetails(
						res.pool,
						userData.educational,
					);
				} else {
					return 999;
				}
			})
			.then(async result => {
				console.log(userData);
				if (result !== 999) {
					res.render("result", {
						title: "Result",
						p: await responderSet.getFromGlobalCache(
							`p_${__processDb}`,
						),
						per: userData.personal,
						ht: userData.educational,
						slot: result[0],
					});
				}
			})
			.catch(error => {
				res.send({ call: 0, data: error });
			});
	},
	printResult: function (req, res) {
		var userData = {
			personal: {},
			educational: {},
		};

		var data = req.query;
		if (typeof data.r == "undefined") {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		data.r = Number(data.r);

		if (isNaN(data.r)) {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		if (typeof data.f == "undefined") {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}
		data.f = Number(data.f);
		if (isNaN(data.f)) {
			res.status(200).send({ _call: 0, message: "resource not found" });
			return false;
		}

		IndexModel.getSoloCandidateDetails(res.pool, data.r)
			.then(result => {
				if (result.length !== 1) {
					res.status(200).send({
						_call: 0,
						message: "resource not found",
					});
					return 999;
				} else {
					userData.personal = result[0];
					return IndexModel.getResultDetails(res.pool, data);
				}
			})
			.then(result => {
				if (result !== 999) {
					if (result.length == 0) {
						res.status(200).send({
							_call: 0,
							message: "resource not found",
						});
						return 999;
					} else {
						return result;
					}
				}
			})
			.then(result => {
				if (result !== 999) {
					userData.educational = result[0];
				} else {
					return 999;
				}
			})
			.then(result => {
				console.log(result);
				if (result !== 999) {
					return IndexModel.getInterViewSlotDetails(
						res.pool,
						userData.educational,
					);
				} else {
					return 999;
				}
			})
			.then(async result => {
				console.log(userData);
				if (result !== 999) {
					res.render("result_print", {
						title: "Result",
						p: await responderSet.getFromGlobalCache(
							`p_${__processDb}`,
						),
						per: userData.personal,
						ht: userData.educational,
						slot: result[0],
					});
				}
			})
			.catch(error => {
				next(error);
			});
	},
	paperKeyView: async function (req, res, next) {
		try {
			var userData = {
				personal: {},
				educational: {},
			};

			var data = req.query;
			if (typeof data.r == "undefined") {
				res.status(200).send({
					_call: 0,
					message: "resource not found1",
				});
				return false;
			}
			data.r = Number(data.r);

			if (isNaN(data.r)) {
				res.status(200).send({
					_call: 0,
					message: "resource not found2",
				});
				return false;
			}
			if (typeof data.f == "undefined") {
				res.status(200).send({
					_call: 0,
					message: "resource not found3",
				});
				return false;
			}
			data.f = Number(data.f);
			if (isNaN(data.f)) {
				res.status(200).send({
					_call: 0,
					message: "resource not found4",
				});
				return false;
			}
			const _candidateDetails = await IndexModel.getSoloCandidateDetails(
				res.pool,
				data.r,
			);

			if (_candidateDetails.length === 0) {
				return res.status(200).send({
					_call: 0,
					message: "resource not found",
				});
			}

			userData.personal = _candidateDetails[0];

			const _candidateHtDetails =
				await IndexModel.getSoloCandidateHTDetails(res.pool, {
					f_id: data.f,
					r_id: data.r,
				});

			if (_candidateHtDetails.length === 0) {
				return res.status(200).send({
					_call: 0,
					message: "resource not found5",
				});
			}

			userData.educational = _candidateHtDetails[0];

			const _candidateSlotDetails = await IndexModel.getSoloSlotDetails(
				res.pool,
				userData.educational.ca_batch_slot,
			);

			// Getting candidate question paper
			const _solorQuestionPaperDetails =
				await IndexModel.getSoloQuestionPaper(res.pool, data.f);

			console.log(
				_solorQuestionPaperDetails,
				"==_solorQuestionPaperDetails==",
			);

			res.render("answer-key", {
				title: "Answer Key",
				p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
				per: userData.personal,
				ht: userData.educational,
				slot: _candidateSlotDetails[0],
				_solorQuestionPaperDetails,
			});
		} catch (error) {
			console.log(error, "==error==");
			next(error);
		}
	},

	attendanceList: function (req, res) {
		res.render("attendance-list", {
			title: "Application Preview",
		});
	},

	markPresent: async function (req, res, next) {
		try {
			const studentsList = req.body?.list;
			if (studentsList.length === 0) {
				return res
					.status(400)
					.json(new ApiResponse(201, true, "share students list."));
			}
			const updateResponse = await indexModel.markPresent(
				res.pool,
				studentsList,
			);

			if (studentsList.length == updateResponse.affectedRows) {
				return res
					.status(201)
					.json(
						new ApiResponse(
							201,
							true,
							"Successfully updated attendance.",
						),
					);
			} else {
				return res
					.status(400)
					.json(
						new ApiResponse(
							201,
							true,
							"Error updating attendance.(student count mismatch).",
						),
					);
			}
		} catch (error) {
			console.log(error, "==error==");
			next(error);
		}
	},

	getDateOfBirthAge: function (req, res) {
		let { dob, to } = req.body;

		let age = AgeCalculator.getAge(new Date(dob), new Date(to));
		res.send({
			status: true,
			year: age.years,
			month: age.months,
			day: age.days,
		});
	},
	testSMS: (request, response) => {
		let sms = {
			mobile: "8007070845",
			username: "0001",
			password: "sdjfkses87df",
		};
		smsModel.sendNewRegistrationSMS(sms, function (data) {
			response.send(data);
		});
	},

	// send email to all registered students
	sendEmailToRegisteredStudents: async (req, res) => {
		try {
			console.log("==1=");
			let _list = await indexModel.getAllRegisteredStudentsList(res.pool);
			console.log(_list.length);

			_list.forEach(el => {
				// emailController.sendRegistrationEmail(el);
			});
			// console.log(_list);
		} catch (error) {
			console.log("err", error);
		}
	},

	// save header file
	saveHeaderFile: (req, res, next) => {
		try {
			let headerFilePath = path.join(
				"public",
				"assets",
				"images",
				"brand-name.jpg",
			);
			const headerFile = req.files.headerFile;
			console.log(headerFile, "==headerFile==");
			headerFile.mv(headerFilePath, err => {
				if (err) {
					console.error("Error moving file:", err);
					return res.status(500).send({ error: "File save failed" });
				}
				res.send({ message: "File saved successfully" });
			});
		} catch (error) {
			console.error("Error in file upload:", error.message);
			res.status(500).send({ error: "Server error in saving file" });
		}
	},

	// save header file
	saveNoticeFile: (req, res, next) => {
		try {
			let noticeFilePath = path.join(
				"public",
				"uploads",
				"important-notices",
				req.files.noticeFile.name,
			);
			const noticeFile = req.files.noticeFile;
			noticeFile.mv(noticeFilePath, err => {
				if (err) {
					console.error("Error moving file:", err);
					return res.status(500).send({ error: "File save failed" });
				}
				res.send({ message: "File saved successfully" });
			});
		} catch (error) {
			console.error("Error in file upload:", error.message);
			res.status(500).send({ error: "Server error in saving file" });
		}
	},

	removeFile: (req, res, next) => {
		console.log(req.body, "==req.body==");
		let { filePath } = req.body;
		fs.unlink(filePath, err => {
			return res.status(201).json({
				message: "Successfully removed important notice file",
			});
		});
	},

	// registrations closed view
	registrationClosedView: async (req, res, next) => {
		res.render("new/registration-closed", {
			p: await responderSet.getFromGlobalCache(`p_${__processDb}`),
		});
	},
};

module.exports = indexController;
