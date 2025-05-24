import { alertjs } from "./common.js";

$(document).ready(() => {
	let generalDetails = {
		age: "",
		detailsGender: "",
		detailsNonCreamyLayer: "",
		detailsMarital: "",
		detailsCategory: "",
		detailsSubCategory: "",
		detailsFather: "",
		detailsMother: "",
		detailsSpouse: "",
		detailsAddress: "",
		detailsLineTwo: "",
		detailsLineThree: "",
		detailsState: "",
		detailsDistrict: "",
		detailsTaluka: "",
		detailsPin: "",
		detailsPostId: "",
		detailsPostName: "",
		cri: "",
		cfi: 0,
		regString: "",
		detailsReligion: "",
		detailsNationality: "",
		detailsDomicile: "",
		detailsMainPost: "",
		detailsLanguages: [],
		dob: "",
	};

	const StateList = [...statesList];
	const distList = [...districtsList];
	let generalDetailsValidationRules = {
		detailsFather: {
			required: true,
			lettersonly: true,
			noSpaces: true,
		},

		detailsMother: {
			required: true,

			lettersonly: true,
			noSpaces: true,
		},

		detailsPin: {
			required: true,

			number: true,

			minlength: 6,

			maxlength: 6,
		},

		candidateMaritalStartus: {
			required: true,
		},

		candidateCategory: {
			required: true,
		},

		detailsbday: {
			required: true,

			min: 1,
		},

		detailsmonth: {
			required: true,

			min: 1,
		},

		detailsYear: {
			required: true,

			min: 1,
		},

		candidateGender: {
			required: true,
		},

		detailsSpouse: {
			required: true,
			noSpaces: true,
		},

		detailsAddress: {
			required: true,
			noSpaces: true,
		},

		detailsState: {
			required: true,
		},

		detailsDistrict_1: {
			required: true,
			lettersonly: true,
		},

		detailsDistrict: {
			required: true,
		},
		detailsTaluka: {
			required: true,
		},

		candidateReligion: {
			required: true,
		},

		candidateNationality: {
			required: true,
		},

		candidateDomicile: {
			required: true,
		},

		candidateDisability: {
			required: true,
		},

		candidateExServiceman: {
			required: true,
		},

		candidateFreedomFighterChild: {
			required: true,
		},

		candidateProjectAffected: {
			required: true,
		},

		candidateEarthquakeAffected: {
			required: true,
		},

		candidateMeritoriousSports: {
			required: true,
		},

		candidateChildWifeServicemanDied: {
			required: true,
		},

		candidateJDPendingInCourt: {
			required: true,
		},

		candidateJDPendingDisciplinaryOtherSimilarAction: {
			required: true,
		},

		candidateJDPendingDisciplinaryOtherSimilarction: {
			required: true,
		},

		candidateJDPendingDisciplinaryActionByGov: {
			required: true,
		},

		candidateJDCourtCaseFiled: {
			required: true,
		},

		candidateJDBlackListed: {
			required: true,
		},

		candidateMarathiLanguage: {
			required: true,
		},

		candidateOtherLanguage: {
			required: true,
		},

		candidateEnglishLanguage: {
			required: true,
		},

		candidateSammnater: {
			required: true,

			min: 1,
		},

		candidateDetailsNonCreamyLayer: {
			required: true,
		},
		candidateSubCategory: {
			required: true,
			noSpaces: true,
		},
	};

	let generalDetailsValidationMessages = {
		detailsPin: {
			required: "&nbsp;Enter Pin Code.",

			number: "&nbsp;Invalid Pin Code.",

			minlength: "&nbsp;Pin Code Must Be {0} Digits.",

			maxlength: "&nbsp;Pin Code Must Be At Least {0} Digits.",
		},

		detailsFather: {
			required: "&nbsp;Enter Father's Name.",
			lettersonly: "&nbsp;Invalid Father's Name.",
			noSpaces: "&nbsp;Enter Father's Name.",
		},

		detailsMother: {
			required: "&nbsp;Enter Mother's Name.",

			lettersonly: "&nbsp;Invalid Mother's Name.",
			noSpaces: "&nbsp;Enter Mother's Name.",
		},

		candidateGender: {
			required: "&nbsp;Select Gender",
		},

		candidateMaritalStartus: {
			required: "&nbsp;Select Marital Status.",
		},

		candidateCategory: {
			required: "&nbsp;Select Category.",
		},

		candidateDetailsNonCreamyLayer: {
			required: "&nbsp;Select Non Creamy Layer.",
		},
		detailsbday: {
			require: "&nbsp;Select a Day.",

			min: "&nbsp;select a Day.",
		},

		detailsmonth: {
			require: "&nbsp;select a Month.",

			min: "&nbsp;select a Month.",
		},

		detailsYear: {
			required: "&nbsp;select a Year.",
			min: "&nbsp;select a Year.",
		},

		detailsSpouse: {
			required: "&nbsp;Enter Spouse Name.",
			noSpaces: "Enter Spouse Name.",
		},

		detailsAddress: {
			required: "&nbsp;enter Address.",
			noSpaces: "&nbsp;enter Address.",
		},

		detailsState: {
			required: "&nbsp;Select State.",
		},

		detailsDistrict_1: {
			required: "&nbsp;Enter District Name.",

			lettersonly: "&nbsp;Invalid District Name.",
		},

		detailsDistrict: {
			required: "&nbsp;Enter District Name.",
		},
		detailsTaluka: {
			required: "&nbsp;Select Taluka Name.",
		},

		candidateReligion: {
			required: "&nbsp;Select Religion.",
		},

		candidateNationality: {
			required: "&nbsp;Select Nationality.",
		},

		candidateDomicile: {
			required: "&nbsp;Select Domicile.",
		},

		candidateDisability: {
			required: "&nbsp;Select Disability.",
		},

		candidateExServiceman: {
			required: "&nbsp;Select Is Ex-Serviceman.",
		},

		candidateFreedomFighterChild: {
			required: "&nbsp;Select The Option",
		},

		candidateProjectAffected: {
			required: "&nbsp;Select The Option",
		},

		candidateEarthquakeAffected: {
			required: "&nbsp;Select The Option",
		},

		candidateMeritoriousSports: {
			required: "&nbsp;Select The Option",
		},

		candidateChildWifeServicemanDied: {
			required: "&nbsp;Select The Option",
		},

		candidateJDPendingInCourt: {
			required: "&nbsp;Select The Option",
		},

		candidateJDPendingDisciplinaryOtherSimilarAction: {
			required: "&nbsp;Select The Option",
		},

		candidateJDPendingDisciplinaryOtherSimilarction: {
			required: "&nbsp;Select The Option",
		},

		candidateJDPendingDisciplinaryActionByGov: {
			required: "&nbsp;Select The Option",
		},

		candidateJDCourtCaseFiled: {
			required: "&nbsp;Select The Option",
		},

		candidateJDBlackListed: {
			required: "&nbsp;Select The Option",
		},

		candidateMarathiLanguage: {
			required: "&nbsp; Marathi Language Required",
		},

		candidateOtherLanguage: {
			required: "&nbsp; Hindi Language Required",
		},

		candidateEnglishLanguage: {
			required: "&nbsp; English Language Required",
		},

		candidateSammnater: {
			required: "&nbspकृपया समान्तर आरक्षण निवडा",

			min: "&nbsp;कृपया समान्तर आरक्षण निवडा",
		},
		candidateSubCategory: {
			required: "&nbsp;Enter Sub Category",
			noSpaces: "&nbsp;Enter Sub Category",
		},
	};

	generalDetails.cri = regID;
	generalDetails.regString = regString;
	generalDetails.cfi = form_id;

	renderReligionList();
	loadDetails();

	$("#verifyPersonalDetails").click(verifyGeneralDetails);
	$("#submitPersonalDetails").click(saveGeneralDetails);

	function renderStatesList(selectedValue = null) {
		console.log(selectedValue, "==selectedValue==");
		let stateListDropdownHtml = StateList.map(state => {
			return `
		<option value="${state.s_name}" ${selectedValue && state.s_name.toLowerCase() == selectedValue?.toLowerCase() ? "selected" : ""} data-state-id="${state.id}">${state.s_name}</option>
	`;
		});

		stateListDropdownHtml =
			`<option value=''>--- Select State ---</option>` +
			stateListDropdownHtml;

		$("#detailsState").html(stateListDropdownHtml);
	}

	function renderReligionList() {
		// prettier-ignore
		const detailsReligion = ["Buddhist", "Christians", "Hindu", "Jain", "Muslims", "Sikhs", "Zoroastrians(Parsis)", "Other"];
		$("#detailsReligion").empty();
		$("#detailsReligion").append(`<option value="">--Select--</option>`);
		detailsReligion.forEach(function (value, index) {
			$("#detailsReligion").append(
				`<option value='${value}'>${value}</option>`,
			);
		});
	}

	function setDistrict(selectedDistrict = null) {
		console.log("1", selectedDistrict, "==selectedDistrict==");
		const selectedStateId = $("#detailsState option:selected").attr(
			"data-state-id",
		);
		let districtListHtml = `<option value="">--- Select District ---</option>`;
		if (selectedStateId) {
			districtListHtml += distList
				.filter(district => district.d_state_id == selectedStateId)
				.map(district => {
					let isSelected = false;
					if (selectedDistrict != "" || selectedDistrict) {
						isSelected =
							district.d_name.toLowerCase() ==
							selectedDistrict?.toLowerCase();
					}
					return `
					<option value="${district.d_name}" ${isSelected ? "selected" : ""} data-district-id="${district.id}">${district.d_name}</option>	
				`;
				});
		}

		$("#detailsDistrict").html(districtListHtml);
	}

	function renderLanguagesKnownList_FOR_PRE_FILLED_DATA(languages) {
		console.log(languages, "==languages==");
		console.log(2, "==2==");
		if (languages.length === 0) return;
		$("#languagesKnown").empty();
		let html = languages
			.map(language => {
				return `
			<div class="languageContainer">
				<div class="checkBoxInputContainer">
					<label class="input-label m-0">
					${language.languageName}
					${language.isCompulsary ? '<span class="input-label">*</span>' : ""}
					</label>
				</div>
				<div class="inputMainContainer">
					<div class="checkBoxInputContainer">
						<input id="candidate${language.languageName}LanguageRead" class="_language" type="checkbox" name="candidate${language.languageName}Language" placeholder="" value="read" ${language.read === "true" ? "checked" : ""} />
						<label class="input-label" for="candidate${language.languageName}LanguageRead">Read(वाचणे)</label>
					</div>
					<div class="checkBoxInputContainer">
						<input id="candidate${language.languageName}LanguageWrite"  class="_language" type="checkbox" name="candidate${language.languageName}Language" placeholder="" value="write" ${language.write === "true" ? "checked" : ""} />
						<label class="input-label" for="candidate${language.languageName}LanguageWrite">Write(लिहिणे)</label>
					</div>
					<div class="checkBoxInputContainer">
						<input id="candidate${language.languageName}LanguageSpeak" class="_language" type="checkbox" name="candidate${language.languageName}Language" placeholder="" value="speak" ${language.speak === "true" ? "checked" : ""} />
						<label class="input-label" for="candidate${language.languageName}LanguageSpeak">Speak(बोलणे)</label>
					</div>
				</div>
			</div>
		`;
			})
			.join("");

		$("#languagesKnown").html(html);
		generateLanguageValidationRules(languages);
		generateLanguageValidationMessages(languages);

		getLanguagesInputValues(languages);
	}

	function renderLanguagesKnownList_FOR_FORM_FILLING(languages) {
		console.log(1, "==1==");
		if (languages.length === 0) return;
		$("#languagesKnown").empty();
		let html = languages
			.map(language => {
				return `
			<div class="languageContainer">
				<div class="checkBoxInputContainer">
					<label class="input-label m-0">
					${language.languageName}
					${language.isCompulsary ? '<span class="input-label">*</span>' : ""}
					</label>
				</div>
				<div class="inputMainContainer">
					<div class="checkBoxInputContainer">
						<input id="candidate${language.languageName}LanguageRead" class="" type="checkbox" name="candidate${language.languageName}Language" placeholder="" value="read" />
						<label class="input-label" for="candidate${language.languageName}LanguageRead">Read(वाचणे)</label>
					</div>
					<div class="checkBoxInputContainer">
						<input id="candidate${language.languageName}LanguageWrite"  class="" type="checkbox" name="candidate${language.languageName}Language" placeholder="" value="write" />
						<label class="input-label" for="candidate${language.languageName}LanguageWrite">Write(लिहिणे)</label>
					</div>
					<div class="checkBoxInputContainer">
						<input id="candidate${language.languageName}LanguageSpeak" class="" type="checkbox" name="candidate${language.languageName}Language" placeholder="" value="speak" />
						<label class="input-label" for="candidate${language.languageName}LanguageSpeak">Speak(बोलणे)</label>
					</div>
				</div>
			</div>
		`;
			})
			.join("");

		$("#languagesKnown").html(html);
		generateLanguageValidationRules(languages);
		generateLanguageValidationMessages(languages);

		getLanguagesInputValues(languages);
	}

	function getLanguagesInputValues(languages) {
		// console.log(languages.length, '==languages==')
		if (languages.length == 0) return;
		const details = [];
		languages.forEach(language => {
			const temp = {};
			temp["languageName"] = language.languageName;
			$(`input[name="candidate${language.languageName}Language"]`).each(
				(i, el) => {
					const propName = $(el).prop("value");
					temp[propName] = $(el).prop("checked");
				},
			);
			details.push(temp);
		});
		generalDetails.detailsLanguages = details;
	}

	$(document).on(
		"click",
		'input[name*="candidate"][name*="Language"]',
		function () {
			const currentStatus = $(this).prop("checked");
			// console.log(currentStatus, "==currentStatus==");
			$(this).prop("checked", currentStatus);
			getLanguagesInputValues(generalDetails.detailsLanguages);
		},
	);

	function generateLanguageValidationRules(languages) {
		let rules = {};
		languages.forEach(language => {
			rules[`candidate${language.languageName}Language`] = {
				required: function () {
					return language.read || language.write || language.speak;
				},
			};
		});
		generalDetailsValidationRules = {
			...generalDetailsValidationRules,
			...rules,
		};
	}

	function generateLanguageValidationMessages(languages) {
		let messages = {};
		languages.forEach(language => {
			messages[`candidate${language.languageName}Language`] = {
				required: `Select at least one option for ${language.languageName}.`,
			};
		});

		generalDetailsValidationMessages = {
			...generalDetailsValidationMessages,
			...messages,
		};
	}

	function loadDetails() {
		setPreviousDetails();

		$("#PrePostMain").html(
			` <p id="detailsPost" class="m-0 p-0 input-label">${generalDetails.detailsMainPost}</p>`,
		);

		$("#PrePost").html(
			`<p id="detailsPost" class="m-0 p-0 input-label">${generalDetails.detailsPostName}</p>`,
		);

		if (generalDetails.detailsGender != "") {
			$("#" + generalDetails.detailsGender).prop("checked", true);
		}
		$("#dob").html(generalDetails.dob);
		$("#age").html(generalDetails.age);
		$("#age-as-on").html(generalDetails.ageAsOn);

		if (generalDetails.detailsMarital != "") {
			$("#" + generalDetails.detailsMarital).prop("checked", true);
		}
		if (generalDetails.detailsMarital === "unmarried") {
			$("#detailsSpouse").val("-").prop("readonly", true);
		}
		if (generalDetails.detailsMarital == "married") {
			$("#detailsSpouse").prop("readonly", false);
			$("#detailsSpouse").val(generalDetails.detailsSpouse);
		}

		if (generalDetails.detailsNationality !== "") {
			$(
				"input[name=candidateNationality][value=" +
					generalDetails.detailsNationality +
					"]",
			).prop("checked", true);
		}

		if (generalDetails.detailsDomicile !== "") {
			$(
				"input[name=candidateDomicile][value=" +
					generalDetails.detailsDomicile +
					"]",
			).prop("checked", true);
		}

		$("#detailsFather").val(generalDetails.detailsFather);
		$("#detailsMother").val(generalDetails.detailsMother);

		$("#detailsCategory").val(generalDetails.detailsCategory.toUpperCase());
		$("#detailsSubCategory").val(generalDetails.detailsSubCategory);
		$("#detailsReligion").val(generalDetails.detailsReligion);

		if (generalDetails.detailsNonCreamyLayer != "") {
			$(
				"#detailsNonCreamyLayer" + generalDetails.detailsNonCreamyLayer,
			).prop("checked", true);
		}

		if (generalDetails?.languageDetails?.length > 0) {
			// TODO (Omkar) : render prefilled language selection details
			// updateData[0].languageDetails.forEach(language=> {})
			renderLanguagesKnownList_FOR_PRE_FILLED_DATA(
				generalDetails.languageDetails,
			);
		} else {
			renderLanguagesKnownList_FOR_FORM_FILLING(
				postList[0].languageDetails,
			);
		}

		$("#detailsAddress").val(generalDetails.detailsAddress);
		$("#detailsLineTwo").val(generalDetails.detailsLineTwo);
		$("#detailsLineThree").val(generalDetails.detailsLineThree);

		// $("#detailsState").val(generalDetails.detailsState);
		renderStatesList(generalDetails?.detailsState || "");
		setDistrict(generalDetails?.detailsDistrict || "");

		$("#detailsTaluka").val(generalDetails.detailsTaluka);

		$("#detailsPin").val(
			generalDetails.detailsPin == 0 ? "" : generalDetails.detailsPin,
		);
	}

	function setPreviousDetails() {
		if (updateData.length !== 0) {
			generalDetails.detailsPostId = updateData[0].post_id;

			generalDetails.detailsMainPost = updateData[0].detailsMainPost;
			generalDetails.detailsPostName = updateData[0].post_name;

			generalDetails.detailsGender = updateData[0].gender;
			generalDetails.dob = updateData[0].dob;
			generalDetails.age = updateData[0].age;

			generalDetails.detailsMarital = updateData[0].detailsMarital;
			generalDetails.detailsSpouse = updateData[0].spouse_name;

			generalDetails.detailsNationality =
				updateData[0].detailsNationality;
			generalDetails.detailsDomicile = updateData[0].detailsDomicile;

			generalDetails.detailsFather = updateData[0].fathers_name;
			generalDetails.detailsMother = updateData[0].mother_name;

			generalDetails.detailsCategory = updateData[0].catagory;

			generalDetails.detailsSubCategory =
				updateData[0].detailsSubCategory;

			generalDetails.detailsReligion = updateData[0].detailsReligion;

			generalDetails.detailsNonCreamyLayer =
				updateData[0].detailsNonCreamyLayer;

			generalDetails.languageDetails = updateData[0].languageDetails;

			generalDetails.detailsAddress = updateData[0].address;

			generalDetails.detailsLineTwo = updateData[0].line_two_address;

			generalDetails.detailsLineThree = updateData[0].line_three_address;

			generalDetails.detailsState = updateData[0].state;

			generalDetails.detailsDistrict = updateData[0].district;

			generalDetails.detailsTaluka = updateData[0].detailsTaluka;

			generalDetails.detailsPin = updateData[0].pin_number;
		}
	}

	$(".detailsMarital").on("click change", function (e) {
		let val = $(this).val();

		generalDetails.detailsMarital = val;

		if (val === "unmarried") {
			$("#detailsSpouse").val("-").prop("readonly", true);
		} else {
			$("#detailsSpouse").val("").prop("readonly", false);
		}

		$("#detailsSpouse").valid();
	});

	$("#detailsSpouse").on("keyup", function (e) {
		let val = $(this).val();
		generalDetails.detailsSpouse = val;
	});

	$(".detailsGender").click(function (e) {
		let val = $(this).val();

		generalDetails.detailsGender = val;
	});

	$(".detailsNonCreamyLayer").click(function (e) {
		let val = $(this).val();
		generalDetails.detailsNonCreamyLayer = val;
	});

	$(document).on("click", ".detailsCategory", function (e) {
		let val = $(this).val();
		generalDetails.detailsCategory = val;
	});

	$("#detailsSubCategory").on("keyup blur", function (e) {
		let val = $(this).val();
		generalDetails.detailsSubCategory = val;
	});

	$("#detailsReligion").change(function (e) {
		let val = $(this).val();
		generalDetails.detailsReligion = val;
	});

	$(".detailsNationality").click(function (e) {
		let val = $(this).val();
		generalDetails.detailsNationality = val;
	});

	$(".detailsDomicile").click(function (e) {
		let val = $(this).val();
		generalDetails.detailsDomicile = val;
	});

	$("#detailsAddress").on("keyup", function (e) {
		generalDetails.detailsAddress = $(this).val();
	});

	$("#detailsLineTwo").on("keyup", function (e) {
		generalDetails.detailsLineTwo = $(this).val();
	});

	$("#detailsLineThree").on("keyup", function (e) {
		generalDetails.detailsLineThree = $(this).val();
	});

	$("#detailsFather").on("keyup", function (e) {
		generalDetails.detailsFather = $(this).val();
	});

	$("#detailsMother").on("keyup", function (e) {
		generalDetails.detailsMother = $(this).val();
	});

	$("#detailsState").change(function (e) {
		let val = $(this).val();
		generalDetails.detailsState = val;
		setDistrict(null);
	});

	$("#detailsDistrict").on("change", function () {
		let val = $(this).val();
		generalDetails.detailsDistrict = val;
	});

	$("#detailsTaluka").on("keyup", function (e) {
		generalDetails.detailsTaluka = $(this).val();
	});

	$("#detailsPin").on("keyup", function (e) {
		generalDetails.detailsPin = $(this).val();
	});

	$("#generalDetailsForm").validate({
		rules: generalDetailsValidationRules,
		messages: generalDetailsValidationMessages,
		errorPlacement: function (error, element) {
			if (element.is(".detailsGender")) {
				error.appendTo(element.parents(".inputMainContainer"));
			}

			if (element.is(".detailsNonCreamyLayer")) {
				error.appendTo(
					element.parents(".candidateDetailsNonCreamyLayer"),
				);
			}

			const languages = postList[0]?.languageDetails || [];
			if (languages?.length > 0) {
				languages.forEach(language => {
					const languageName = `#candidate${language.languageName}LanguageRead`;
					if (element.is(languageName)) {
						error.appendTo(element.parents(".inputMainContainer"));
					}
				});
			}

			if (element.is(``))
				if (element.is(".detailsMarital")) {
					// console.log(element, '==element==')
					error.appendTo(element.parents(".candidateMaritalStartus"));
				} else {
					if (element.is(".detailsCategory")) {
						error.appendTo(element.parents(".categoryTypeMain"));
					} else {
						if (element.is(".birth_date")) {
							error.appendTo(element.parents(".birthMessage"));
						} else {
							if (element.is(".detailsGender")) {
								error.appendTo(
									element.parents(".inputMainContainer"),
								);
							} else {
								if (element.is(".detailsNonCreamyLayer")) {
									error.appendTo(
										element.parents(
											".candidateDetailsNonCreamyLayer",
										),
									);
								} else {
									let e = $(element)
										.parent("div")
										.parent("td");
									error.appendTo(e);
									// error.insertAfter(element);
								}
							}
						}
					}
				}
			if (
				element.is("#detailsSubCategory") ||
				element.is("#detailsReligion") ||
				element.is("#detailsFather") ||
				element.is("#detailsMother") ||
				element.is("#detailsAddress") ||
				element.is("#detailsPin") ||
				element.is("#detailsTaluka")
			) {
				error.insertAfter(element);
			}

			if (element.is("#detailsState"))
				error.appendTo(element.parents(".detailsState"));

			if (element.is(""))
				error.appendTo(element.parents("#setDistInput"));

			if (element.is("#detailsSpouse"))
				error.appendTo(element.parents(".spouce-name-container"));

			if (element.is(".detailsMarathiLanguage"))
				error.appendTo(element.parents(".candidateMarathiLanguage"));

			if (element.is(".detailsOtherLanguage"))
				error.appendTo(element.parents(".candidateHindiLanguage"));

			if (element.is(".detailsEnglishLanguage"))
				error.appendTo(element.parents(".candidateEnglishLanguage"));

			if (element.is(".detailsReligion"))
				error.appendTo(element.parents(".candidateReligion"));

			if (element.is(".detailsNationality"))
				error.appendTo(element.parents(".candidateNationality"));

			if (element.is(".detailsDomicile"))
				error.appendTo(element.parents(".candidateDomicile"));

			if (element.is(".detailsDisability"))
				error.appendTo(element.parents(".candidateDisability"));

			if (element.is(".detailsExServiceman"))
				error.appendTo(element.parents(".candidateExServiceman"));

			if (element.is(".detailsFreedomFighterChild"))
				error.appendTo(
					element.parents(".candidateFreedomFighterChild"),
				);

			if (element.is(".detailsProjectAffected"))
				error.appendTo(element.parents(".candidateProjectAffected"));

			if (element.is(".detailsEarthquakeAffected"))
				error.appendTo(element.parents(".candidateEarthquakeAffected"));

			if (element.is(".detailsMeritoriousSports"))
				error.appendTo(element.parents(".candidateMeritoriousSports"));

			if (element.is(".detailsChildWifeServicemanDied"))
				error.appendTo(
					element.parents(".candidateChildWifeServicemanDied"),
				);

			if (element.is(".detailsJDPendingInCourt"))
				error.appendTo(element.parents(".candidateJDPendingInCourt"));

			if (element.is(".detailsJDPendingDisciplinaryOtherSimilarction"))
				error.appendTo(
					element.parents(
						".candidateJDPendingDisciplinaryOtherSimilarction",
					),
				);

			if (element.is(".detailsJDPendingDisciplinaryActionByGov"))
				error.appendTo(
					element.parents(
						".candidateJDPendingDisciplinaryActionByGov",
					),
				);

			if (element.is(".detailsJDCourtCaseFiled"))
				error.appendTo(element.parents(".candidateJDCourtCaseFiled"));

			if (element.is(".detailsJDBlackListed"))
				error.appendTo(element.parents(".candidateJDBlackListed"));

			if (element.is(".detailsJDPendingDisciplinaryOtherSimilarAction"))
				error.appendTo(
					element.parents(
						".candidateJDPendingDisciplinaryOtherSimilarAction",
					),
				);

			if (element.is(".detailsDistrict")) {
				error.insertAfter(element);
			}

			if (element.is(".detailsDistrict_1")) {
				error.insertAfter(element);
			}

			$("label[class='error']").addClass(
				"text-danger font-weight-bolder",
			);
		},
	});

	function verifyGeneralDetails() {
		const verifyDetailsBtn = $("#verifyPersonalDetails");

		verifyDetailsBtn.prop("disabled", true).html(`Verifying Details...`);

		if (!$("#generalDetailsForm").valid()) {
			alertjs.warning(
				{
					t: "Some Fields Are Invalid !!!",
					m: "Kindly check if all details/fields are filled correctly.",
				},

				function () {
					$("label[class='error']").addClass(
						"text-danger font-weight-bolder",
					);
				},
			);
		} else {
			alertjs.success(
				{
					t: "Verified!!!",
					m: "You can Submit Personal Details form.",
				},

				function () {
					$("#submitPersonalDetails").removeClass("d-none");
				},
			);
		}
		verifyDetailsBtn.prop("disabled", false).html(`Verify Details`);
	}

	function saveGeneralDetails() {
		generalDetails.detailsDistrict = $("#detailsDistrict").val();
		if (!$("#generalDetailsForm").valid()) {
			alertjs.warning(
				{
					t: "Some Fields Are Invalid !!!",
					m: "Kindly check if all details/fields are filled correctly.",
				},
				function () {},
			);
		} else {
			let submitPersonalDetailsButton = $("#submitPersonalDetails");

			submitPersonalDetailsButton
				.prop("disabled", true)
				.html(`Saving Details...`);

			$.ajax({
				method: "post",
				url: "/save-general-details",
				data: generalDetails,
			})
				.done(function (data) {
					submitPersonalDetailsButton
						.prop("disabled", false)
						.html(`Submit`);

					const saveResponse = data;
					if (saveResponse.call === 1) {
						alertjs.success(
							{
								t: "General Details Saved Successfully",
								m: "",
							},
							() => {
								window.location.assign(
									"/education-details/" +
										generalDetails.regString,
								);
							},
						);
					} else {
						alertjs.warning(
							{
								t: "Error",
								m: "Cannot save user details now, try again later.",
							},
							() => {},
						);
					}
				})
				.fail(function (error) {
					console.log(error);
					submitPersonalDetailsButton
						.prop("disabled", false)
						.html(`Submit`);
					alertjs.warning(
						{
							t: "Error",
							m: "Something went wrong while saving general details.",
						},
						() => {},
					);
				});
		}
	}
});
