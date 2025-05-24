import { alertjs } from "./common.js";
const SSC_10TH = 1;
const HSC_12TH = 2;
const DIPLOMA = 3;
const ITI = 4;
const GRADUATION = 5;
const POST_GRADUATION = 6;
const COMPUTER_CERTIFICATION = 7;
const PROFESSIONAL_QUALIFICATION = 8;
const TYPING_CERTIFICATION = 9;
const OTHER = 10;

const TENTH_DETAILS = {
	specilization: [...getCourseList(SSC_10TH)],
	institue: [...getUniversityList(SSC_10TH)],
};

const TWELVETH_DETAILS = {
	specilization: [...getCourseList(HSC_12TH)],
	institue: [...getUniversityList(HSC_12TH)],
};

const DIPLOMA_DETAILS = {
	specilization: [...getCourseList(DIPLOMA)],
	institue: [...getUniversityList(DIPLOMA)],
};

const ITI_DETAILS = {
	specilization: [...getCourseList(ITI)],
	institue: [...getUniversityList(ITI)],
};

const GRADUATION_DETAILS = {
	specilization: [...getCourseList(GRADUATION)],
	institue: [...getUniversityList(GRADUATION)],
};

const POST_GRADUATION_DETAILS = {
	specilization: [...getCourseList(POST_GRADUATION)],
	institue: [...getUniversityList(POST_GRADUATION)],
};

const COMPUTER_CERTIFICATION_DETAILS = {
	specilization: [...getCourseList(COMPUTER_CERTIFICATION)],
	institue: [...getUniversityList(COMPUTER_CERTIFICATION)],
};
const PROFESSIONAL_CERTIFICATION_DETAILS = {
	specilization: [...getCourseList(PROFESSIONAL_QUALIFICATION)],
	institue: [...getUniversityList(PROFESSIONAL_QUALIFICATION)],
};

const TYPING_SPECILIZATION_DETAILS = {
	specilization: [...getCourseList(TYPING_CERTIFICATION)],
	institue: [...getUniversityList(TYPING_CERTIFICATION)],
};

function getCourseList(courseId) {
	return _eduCourses
		.filter(_el => Number(_el.edu_type_id) == Number(courseId))
		.map(_el => _el.edu_course_name);
}

function getUniversityList(courseId) {
	return _eduUni
		.filter(_el => Number(_el.edu_type_id) == Number(courseId))
		.map(_el => _el.edu_uni_name);
}

let qualification = [..._eduTypes];

(function setEducationTypeList() {
	const option =
		`<option value="">---Select Education---</option>` +
		qualification
			.map(function (_el) {
				return `<option value="${_el.id}" data-details='${JSON.stringify(_el)}'>${_el.edu_type_name}</option>`;
			})
			.join("");
	$("#qualificationList").html(option);
})();

let saveQualificationList = educationDetails;

$(".greadClass").html('<option value="">--Select--</option>');

printEducationTable(saveQualificationList);
$("#newOtherEducation").validate({
	rules: {
		eduSpecialization: {
			required: true,
		},
		eduUniversity: {
			required: true,
		},
		eduMonth: {
			required: true,
		},
		eduYear: {
			required: true,
		},
	},

	messages: {
		eduSpecialization: {
			required: "Enter Specialization",
		},
		eduUniversity: {
			required: "Enter School/University/Institute",
		},
		eduMonth: {
			required: "Select Month",
		},
		eduYear: {
			required: "Select Year",
		},
	},

	errorPlacement: function (error, element) {
		let e = $(element).parent("div");
		error.appendTo(e);
		// error.insertAfter(element);

		$("label[class='error']").addClass("text-danger font-weight-bolder");
	},
});

// result type (percentage/cgpa)
$(document).on("change", "#result-type", function () {
	console.log(2, "==2==");
	let value = $(this).val();
	if (!value) {
		$(".percentage-type-result-container").addClass("d-none");
		$(".cgpa-type-result-container").addClass("d-none");

		return false;
	}
	$("#newMarks2").val("");
	$("#newMarks1").val("");
	$("#percent").val("");
	$("#obtained-cgpa").val("");
	switch (value) {
		case "PERCENTAGE":
			$(".percentage-type-result-container").removeClass("d-none");
			$(".cgpa-type-result-container").addClass("d-none");
			updateValidationRules();
			break;
		case "CGPA":
			$(".percentage-type-result-container").addClass("d-none");
			$(".cgpa-type-result-container").removeClass("d-none");
			updateValidationRules();
			break;
	}
});

updateValidationRules();

function updateValidationRules() {
	const gradingSystem = $("#result-type").val();

	// Define validation rules based on grading system
	let rules = {
		eduSpecialization: {
			required: true,
		},
		["manual-specilization-input"]: {
			required: function () {
				return (
					$("select[name='eduSpecialization']")
						.val()
						.trim()
						.toLowerCase() === "other"
				);
			},
		},
		eduUniversity: {
			required: true,
		},
		manual_school_university_input: {
			required: function () {
				return (
					$("select[name='eduUniversity']")
						.val()
						.trim()
						.toLowerCase() === "other"
				);
			},
		},
		eduMonth: {
			required: true,
		},
		eduYear: {
			required: true,
		},
		eduMarksOutOf: {
			required: gradingSystem === "PERCENTAGE",
			number: gradingSystem === "PERCENTAGE",
		},
		eduMarksGain: {
			required: gradingSystem === "PERCENTAGE",
			number: gradingSystem === "PERCENTAGE",
		},
		eduCgpaOutOf: {
			required: gradingSystem === "CGPA",
			number: gradingSystem === "CGPA",
		},
		cgpaGained: {
			required: gradingSystem === "CGPA",
			number: gradingSystem === "CGPA",
		},
		eduClass: {
			required: true,
		},
	};

	let messages = {
		eduSpecialization: {
			required: "Select Specialization",
		},
		["manual-specilization-input"]: {
			required: "Select Specialization",
		},
		eduUniversity: {
			required: "Select School/University",
		},

		manual_school_university_input: {
			required: "Select School/University",
		},
		eduMonth: {
			required: "Select Month",
		},
		eduYear: {
			required: "Select Year",
		},
		eduMarksGain: {
			required: "Enter Obtained Marks",
			number: "Invalid Value",
		},
		eduMarksOutOf: {
			required: "Enter Out-Of Marks",
			number: "Invalid Value",
		},
		eduCgpaOutOf: {
			required: "Enter total CGPA",
			number: "Invalid value",
		},
		cgpaGained: {
			required: "Enter obtained CGPA",
			number: "Invalid value",
		},
		eduClass: {
			required: "Select Class",
		},
	};

	// Update the validation rules
	$("#newEducation").validate().destroy();
	$("#newEducation").validate({
		rules: rules,
		messages: messages,
		errorPlacement: function (error, element) {
			let e = $(element).parent("div");
			error.appendTo(e);
			$("label[class='error']").addClass(
				"text-danger font-weight-bolder",
			);
		},
	});
}

$(document).on("keyup", "#obtained-cgpa", function () {
	const _this = $(this);
	const thisValue = _this.val();
	const totalCgpa = $("#total-cgpa").val();

	if (isNaN(thisValue)) {
		_this.val("");
		return;
	}

	if (Number(thisValue) >= Number(totalCgpa)) {
		_this.val(totalCgpa);
	}
});

let is_other_selected_university = false;
let is_other_selected_specilization = false;

function check_selected_university_type() {
	const check_type = "other";
	$(document).on("change", "#newUniversity", function () {
		const selected_university_type = $(this).val().toLowerCase();

		if (selected_university_type === check_type) {
			is_other_selected_university = true;
			$(".manual-school-university-input").removeClass("d-none");
			// handle_other_university_selection_for_manual_percentge_input();
		} else {
			is_other_selected_university = false;
			$(".manual-school-university-input").addClass("d-none");
			// handle_other_university_selection_for_manual_percentge_input();
		}

		updateValidationRules();
	});
}

function handle_other_university_selection_for_manual_percentge_input() {
	$("#percent").val("");
	if (
		+qualification_selected_for_add_details === GRADUATION &&
		is_other_selected_university
	) {
		$("#percent").attr("readonly", false);
		$("#newMarks1").addClass("d-none");
		$("#newMarks1").siblings().addClass("d-none");
		$("#newMarks2").addClass("d-none");
		$("#newMarks2").siblings().addClass("d-none");
	} else {
		$("#percent").attr("readonly", true);
		$("#newMarks1").removeClass("d-none");
		$("#newMarks1").siblings().removeClass("d-none");
		$("#newMarks2").removeClass("d-none");
		$("#newMarks2").siblings().removeClass("d-none");
	}
	setGrades();
}

$(document).on("keyup", "#percent", function () {
	if (isNaN($(this).val())) {
		$("#percent").val("");
	}
});

function check_selected_specilzation_type() {
	const check_type = "other";
	$(document).on("change", "#newSpecialization", function () {
		const selected_university_type = $(this).val().toLowerCase();
		if (selected_university_type === check_type) {
			is_other_selected_specilization = true;
			$(".manual-specilization-input").removeClass("d-none");
		} else {
			is_other_selected_specilization = false;
			$(".manual-specilization-input").addClass("d-none");
		}
	});
}

function renderPassingMonth() {
	// prettier-ignore
	const month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ];
	let _monthDropdownHtml = month
		.map(function (m) {
			return `<option value="${m}">${m}</option>`;
		})
		.join("");
	_monthDropdownHtml =
		`<option value="">--- Select ---</option>` + _monthDropdownHtml;
	$("#newMonth,#newOtherMonth").html(_monthDropdownHtml);
}

function renderPassingYear(year = 1980) {
	let date = new Date();
	date = date.getFullYear();
	for (let index = year; index <= date; index++) {
		$("#newYear,#newOtherYear").append(
			`<option value="${index}">${index}</option>`,
		);
	}
}

function getPassingStartYear(eduTypeId) {
	return _eduTypes
		.filter(_el => Number(_el.id) == Number(eduTypeId))
		.map(_el => _el.passing_year_start);
}
setGrades();
function setGrades() {
	const grades = ["Distinction", "First Class", "Second Class", "Pass Class"];
	const gradesHtml =
		`<option value=''>--- Select ---</option>` +
		grades
			.map(grade => `<option value='${grade}'>${grade}</option>`)
			.join("");
	$(".greadClass").html(gradesHtml);
}

$("#qualificationList").on("change", function () {
	let selected_qualification_for_details_add = +$(this).val();
	console.log(selected_qualification_for_details_add, "-+");

	const selectedEducationMoreDetails = JSON.parse(
		$("#qualificationList option:selected").attr("data-details"),
	);

	if (
		+selected_qualification_for_details_add === COMPUTER_CERTIFICATION ||
		+selected_qualification_for_details_add ===
			PROFESSIONAL_QUALIFICATION ||
		+selected_qualification_for_details_add === OTHER ||
		+selected_qualification_for_details_add === TYPING_CERTIFICATION
	) {
		return false;
	}

	let is_qualification_already_added = saveQualificationList.find(
		function (qualification) {
			return (
				+qualification.id === +selected_qualification_for_details_add
			);
		},
	);

	if (is_qualification_already_added !== undefined) {
		alertjs.warning(
			{
				t: "Warning",
				m: "Already Added",
			},
			function () {
				$("#qualificationList").val("");
			},
		);
		return false;
	}
});

// make specialization dropdown

function make_specilization_dropdown(specialization_list) {
	let specilization_list_dropdown = specialization_list.map(
		specialization_name => {
			return `<option value='${specialization_name}'>${specialization_name}</option>`;
		},
	);
	specilization_list_dropdown = `<label for="" class="input-label">
										Course&nbsp;*&nbsp;
										<br> 
										(कोर्स)&nbsp;*&nbsp;
									</label>
									<label for="" class="input-label"></label>
									<select class='form-input form-control input-element input-sm' id='newSpecialization' name="eduSpecialization" >
										<option value=''>-- Select --</option>
										${specilization_list_dropdown} +
									</select>
									<input class='input-element input-sm d-none mt-3 manual-specilization-input' name="manual-specilization-input" type='text' placeholder='Enter Specialization'/>`;

	$(".edu-specilization-dropdown").html(specilization_list_dropdown);
}

function make_institue_dropdown(institute_list) {
	let institute_list_dropdown = institute_list.map(institute_name => {
		return `<option value='${institute_name}'>${institute_name}</option>`;
	});
	institute_list_dropdown = `<label for="" class="input-label">
									Board / University&nbsp;*&nbsp;
									<br/>
									(बोर्ड/विद्यापीठ)&nbsp;*&nbsp;</label>
								<select class='form-input form-control input-element input-sm' id='newUniversity' name="eduUniversity" >
									<option value=''>-- Select --</option>
									${institute_list_dropdown} 
								</select>
								<input class='input-element input-sm d-none mt-3 manual-school-university-input' name="manual_school_university_input" type='text' placeholder='Board/University Name'/>`;

	$("#school-university-type-dropdown").html(institute_list_dropdown);
}

function check_selected_qualification_is_empty(
	qualification_selected_for_add_details,
) {
	if (
		qualification_selected_for_add_details === "" ||
		qualification_selected_for_add_details === null ||
		qualification_selected_for_add_details === undefined
	) {
		alertjs.warning(
			{
				t: "Warning",
				m: "Select Qualification.",
			},

			function () {},
		);
		return false;
	}
	return true;
}

let qualification_selected_for_add_details;
$("#addNewDetails").on("click", function () {
	// RESETTING
	$("#percent").attr("readonly", true);
	$("#newMarks1").removeClass("d-none");
	$("#newMarks1").siblings().removeClass("d-none");
	$("#newMarks2").removeClass("d-none");
	$("#newMarks2").siblings().removeClass("d-none");

	check_selected_university_type();
	check_selected_specilzation_type();
	renderPassingMonth();

	$("#result-type").prop("selectedIndex", 0);
	$("#result-type").trigger("change");

	qualification_selected_for_add_details = $("#qualificationList").val();
	if (
		!check_selected_qualification_is_empty(
			qualification_selected_for_add_details,
		)
	) {
		return false;
	}

	if (+qualification_selected_for_add_details === SSC_10TH) {
		$("#newQualification").modal("show");
		$("#newQualification .newTitle").html("SSC 10TH");
		renderPassingYear(getPassingStartYear(SSC_10TH));

		make_specilization_dropdown(TENTH_DETAILS.specilization);
		make_institue_dropdown(TENTH_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === HSC_12TH) {
		$("#newQualification").modal("show");
		$("#newQualification .newTitle").html("HSC 12TH");
		renderPassingYear(getPassingStartYear(HSC_12TH));

		make_specilization_dropdown(TWELVETH_DETAILS.specilization);
		make_institue_dropdown(TWELVETH_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === DIPLOMA) {
		$("#newQualification").modal("show");
		$("#newQualification .newTitle").html("DIPLOMA");
		renderPassingYear(getPassingStartYear(DIPLOMA));

		make_specilization_dropdown(DIPLOMA_DETAILS.specilization);
		make_institue_dropdown(DIPLOMA_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === ITI) {
		$("#newQualification").modal("show");
		$("#newQualification .newTitle").html("ITI");
		renderPassingYear(getPassingStartYear(ITI));

		make_specilization_dropdown(ITI_DETAILS.specilization);
		make_institue_dropdown(ITI_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === GRADUATION) {
		$("#newQualification").modal("show");
		$("#newQualification .newTitle").html("GRADUATION");
		renderPassingYear(getPassingStartYear(GRADUATION));

		make_specilization_dropdown(GRADUATION_DETAILS.specilization);
		make_institue_dropdown(GRADUATION_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === POST_GRADUATION) {
		console.log($(".newTitle"), "----1");
		$("#newQualification").modal("show");
		$("#newQualification .newTitle").html("POST GRADUATION");
		renderPassingYear(getPassingStartYear(POST_GRADUATION));

		make_specilization_dropdown(POST_GRADUATION_DETAILS.specilization);
		make_institue_dropdown(POST_GRADUATION_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === COMPUTER_CERTIFICATION) {
		$("#newQualification").modal("show");
		$("#newQualification .newTitle").html("COMPUTER_CERTIFICATION");
		renderPassingYear(getPassingStartYear(COMPUTER_CERTIFICATION));

		make_specilization_dropdown(
			COMPUTER_CERTIFICATION_DETAILS.specilization,
		);
		make_institue_dropdown(COMPUTER_CERTIFICATION_DETAILS.institue);
	}

	if (
		+qualification_selected_for_add_details === PROFESSIONAL_QUALIFICATION
	) {
		$("#newQualification").modal("show");
		$("#newQualification .newTitle").html("PROFESSIONAL QUALIFICATION");
		renderPassingYear(getPassingStartYear(PROFESSIONAL_QUALIFICATION));

		make_specilization_dropdown(
			PROFESSIONAL_CERTIFICATION_DETAILS.specilization,
		);
		make_institue_dropdown(PROFESSIONAL_CERTIFICATION_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === OTHER) {
		$("#newOtherQualification").modal("show");
		$("#newOtherQualification .newTitle").html("OTHER QUALIFICATION");
		renderPassingYear(1971);
	}

	if (+qualification_selected_for_add_details === TYPING_CERTIFICATION) {
		$("#newQualification").modal("show");
		$("#newQualification .newTitle").html("TYPING CERTIFICATION");
		renderPassingYear(getPassingStartYear(TYPING_CERTIFICATION));

		make_specilization_dropdown(TYPING_SPECILIZATION_DETAILS.specilization);
		make_institue_dropdown(TYPING_SPECILIZATION_DETAILS.institue);
	}
});

$("#newOtherMarks2,#newOtherMarks1").on("keyup", function () {
	let totalMarks = Number($("#newOtherMarks2").val());
	let marks = Number($("#newOtherMarks1").val());

	if (totalMarks <= 0 || isNaN(totalMarks) === true) {
		$("#newOtherMarks2").val("");
		$("#newOtherMarks1").val("");
		$("#otherPercent").val("");
		return false;
	}

	if (marks <= 0 || isNaN(marks) === true) {
		$("#newOtherMarks1").val("");
		$("#otherPercent").val("");
		return false;
	}

	if (totalMarks < marks) {
		$("#newOtherMarks1").val("");
		$("#otherPercent").val("");
		marks = Number($("#newOtherMarks1").val());
		return false;
	}
	if (marks !== 0) {
		let result = ((marks / totalMarks) * 100).toFixed(2);
		$("#otherPercent").val(result);
	}
});

$("#newMarks2,#newMarks1").on("keyup", function () {
	let totalMarks = Number($("#newMarks2").val());
	let marks = Number($("#newMarks1").val());

	if (totalMarks <= 0 || isNaN(totalMarks) === true) {
		$("#newMarks2").val("");
		$("#newMarks1").val("");
		$("#percent").val("");
		return false;
	}

	if (marks <= 0 || isNaN(marks) === true) {
		$("#newMarks1").val("");
		$("#percent").val("");
		return false;
	}

	if (totalMarks < marks) {
		$("#newMarks1").val("");
		$("#percent").val("");
		marks = Number($("#newMarks1").val());
		return false;
	}
	if (marks !== 0) {
		let result = ((marks / totalMarks) * 100).toFixed(2);
		$("#percent").val(result);
		setGrades();
	}
});

$("#newEducation").on("submit", function (e) {
	e.preventDefault();
	if ($("#newEducation").valid()) {
		let formData = $("#newEducation").serializeArray();
		let value = $("#qualificationList").val();
		let isFound = qualification.find(function (qualification) {
			return Number(qualification.id) === Number(value);
		});
		console.log(isFound, "==isFound==");

		if (!validateMinPercentageCgpaRequired(isFound)) return false;

		let _formData = {};
		formData.forEach(function (obj) {
			_formData[obj.name] = obj.value;
		});

		_formData["id"] = Number(isFound.id);
		_formData["name"] = isFound.edu_type_name;

		if (is_other_selected_university) {
			_formData["eduUniversity"] = $(
				".manual-school-university-input",
			).val();
		}

		if (is_other_selected_specilization) {
			_formData["eduSpecialization"] = $(
				".manual-specilization-input",
			).val();
		}

		if (isFound !== undefined) {
			saveQualificationList.push(_formData);
			alertjs.success(
				{
					t: "Success",

					m: "Education details saved successfully",
				},
				function () {
					$("#newEducation")[0].reset();
					$("#newQualification").modal("hide");
					printEducationTable(saveQualificationList);
					$("#qualificationList").val("");
				},
			);
		} else {
			alert("saving fail");
			// $("#newQualification").val();
			window.location.reload();
		}
	}
	// $(".manual-school-university-input").addClass("d-none");
	// $(".manual-specilization-input").addClass("d-none");
	is_other_selected_university = false;
	is_other_selected_specilization = false;
});

function validateMinPercentageCgpaRequired(_details) {
	const resultType = $("#result-type").val();
	const minPassingPercent = _details.min_passing_percentage;
	const enteredPercentage = parseFloat($("#percent").val());

	console.log(
		resultType,
		minPassingPercent,
		enteredPercentage,
		"==resultType, minPassingPercent, enteredPercentage==",
	);

	if (
		resultType == "PERCENTAGE" &&
		minPassingPercent !== 0 &&
		enteredPercentage < _details.min_passing_percentage
	) {
		alertjs.warning(
			{
				t: "Warning",
				m: `Minimum ${_details.min_passing_percentage}% are mandatory in ${_details.edu_type_name}.`,
			},
			function () {},
		);
		return false;
	}

	const minPassingCgpa = _details.min_passing_cgpa;
	const enteredCgpa = parseFloat($("#obtained-cgpa").val());

	if (
		resultType == "CGPA" &&
		minPassingCgpa !== 0 &&
		enteredCgpa < _details.min_passing_cgpa
	) {
		alertjs.warning(
			{
				t: "Warning",
				m: `Minimum ${_details.min_passing_cgpa} CGPA is mandatory in ${_details.edu_type_name}.`,
			},
			function () {},
		);
		return false;
	}

	return true;
}

$("#newOtherEducation").on("submit", function (e) {
	e.preventDefault();
	if ($("#newOtherEducation").valid()) {
		let formData = $("#newOtherEducation").serializeArray();
		let value = $("#qualificationList").val();
		let isFound = qualification.find(function (qualification) {
			return Number(qualification.id) === Number(value);
		});
		let _formData = {};
		formData.forEach(function (obj) {
			_formData[obj.name] = obj.value;
		});
		_formData["id"] = Number(isFound.id);
		_formData["name"] = isFound.name;

		if (isFound !== undefined) {
			saveQualificationList.push(_formData);
			alertjs.success(
				{
					t: "Success",

					m: "Education details added successfully.",
				},

				function () {
					$("#newOtherEducation")[0].reset();
					$("#newOtherQualification").modal("hide");
					printEducationTable(saveQualificationList);
					$("#qualificationList").val("");
				},
			);
		} else {
			alert("saving fail");
			// $("#newQualification").val();
			window.location.reload();
		}
	}
	$(".manual-school-university-input").addClass("d-none");
	is_other_selected_university = false;
	is_other_selected_specilization = false;
});

$(document).on("click", ".remove-education", function () {
	let _this = this;
	alertjs.delete(function (status) {
		if (status) {
			let index = Number($(_this).data("id"));
			saveQualificationList.splice(index, 1);
			printEducationTable(saveQualificationList);
		}
	});
	is_other_selected_university = false;
	is_other_selected_specilization = false;
});
function printEducationTable(list) {
	if (!list) return false;

	let tr = "";
	if (list?.length === 0) {
		tr = `<tr>
				<td colspan="8" class="text-center text-danger fw-bold input-label"> No education details are added.</td>
			</tr>`;
	} else {
		list = list.sort(function (a, b) {
			a = Number(a.id);
			b = Number(b.id);
			if (b < a) return 1;
			if (b > a) return -1;
		});
		tr = list
			.map(function (li, index) {
				return `<tr class='text-center'>
							<td class='input-label'>${li.name}</td>
							<td class='input-label'>${li.eduSpecialization}</td>
							<td class='input-label' class="word">${li.eduUniversity}</td>
							<td class='input-label'>${
								li.eduPercent === ""
									? li.cgpaGained + " CGPA"
									: li.eduPercent + " %"
							} </td>
							<td class='input-label'>${li.eduClass}</td>
							<td class='input-label'>${li.eduMonth} ${li.eduYear}</td>
							<td class="small input-label">
								<button class="remove-education btn btn-danger btn-sm" data-id=${index} data-bs-toggle="tooltip" data-bs-placement="left" data-bs="Delete">
									<i class="fa fa-trash" style="font-size: 10px;"></i>
								</button>
							</td>
						</tr>`;
			})
			.join("");
	}
	$("#educationTbody").html(tr);
}

function isEducationFilled(eduType) {
	const isFilled = saveQualificationList.find(function (qualification) {
		return Number(qualification.id) === Number(eduType);
	});

	if (isFilled) {
		return true;
	}
	return false;
}

function showEducationNotFilledMessage(eduType) {
	const SSC_10TH_MESSAGE = "SSC/10th is compulsory for this post.";
	const GRADUATION_MESSAGE = "Graduation is compulsory for this post.";
	// prettier-ignore
	const DIPLOMA_OR_12TH_MESSAGE = "HSC/12th or Diploma is compulsory for this post.";
	// prettier-ignore
	const COMPUTER_CERTIFICATION_MESSAGE = "Computer certification course is compulsory for this post.";

	let MESSAGE = "";
	switch (eduType) {
		case SSC_10TH:
			MESSAGE = SSC_10TH_MESSAGE;
			break;
		case HSC_12TH:
			MESSAGE = DIPLOMA_OR_12TH_MESSAGE;
			break;
		case DIPLOMA:
			MESSAGE = DIPLOMA_OR_12TH_MESSAGE;
			break;
		case GRADUATION:
			MESSAGE = GRADUATION_MESSAGE;
			break;
		case COMPUTER_CERTIFICATION:
			MESSAGE = COMPUTER_CERTIFICATION_MESSAGE;
			break;
	}

	alertjs.warning(
		{
			t: "Warning!!!",
			m: MESSAGE,
		},
		function () {},
	);
}

$("#saveEducationDetails").on("click", function () {
	if (saveQualificationList.length == 0) {
		alertjs.warning(
			{
				t: "Warning",
				m: "No List Found To Save",
			},
			function () {},
		);
		return false;
	}

	if (!isEducationFilled(SSC_10TH) && postDetails.post_tenth === 1) {
		showEducationNotFilledMessage(SSC_10TH);
		return false;
	}

	if (postDetails.post_graduation === 1) {
		if (isEducationFilled(HSC_12TH) || isEducationFilled(DIPLOMA)) {
		} else {
			showEducationNotFilledMessage(HSC_12TH);
			return false;
		}

		if (!isEducationFilled(GRADUATION)) {
			showEducationNotFilledMessage(GRADUATION);
			return false;
		}
	}

	if (
		!isEducationFilled(COMPUTER_CERTIFICATION) &&
		postDetails.post_com_citification === 1
	) {
		showEducationNotFilledMessage(COMPUTER_CERTIFICATION);
		return false;
	}

	upload_candiate_education_data();
});

function upload_candiate_education_data() {
	var sendData = {
		cri: regID,
		cfi: form_id,
		edu_data: JSON.stringify(saveQualificationList),
	};
	let saveEducationDetailsBtn = $("#saveEducationDetails");

	saveEducationDetailsBtn.prop("disabled", true).html(`Saving Details...`);

	$.ajax({
		method: "post",
		url: "/save-education-details",
		data: sendData,
	})
		.done(function (data) {
			saveEducationDetailsBtn.prop("disabled", false).html(`Submit`);

			if (data._call == 1) {
				alertjs.success(
					{
						t: "Education details added successfully.",
						m: "",
					},
					function () {
						window.location.assign(
							`/experience-details/${regString}`,
						);
					},
				);
			}
		})
		.fail(function (error) {
			saveEducationDetailsBtn.prop("disabled", false).html(`Submit`);
			alertjs.error(function () {
				console.log(error.message);
			});
		})
		.always(function () {
			saveEducationDetailsBtn.prop("disabled", false).html(`Submit`);
		});
}
