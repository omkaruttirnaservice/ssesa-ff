import { alertjs } from "./common.js";
let saveQualificationList = experienceList;
$(function () {
	(function () {
		if (is_post_required_experience === "true") {
			$("#skipExperienceDetails").addClass("d-none");
			$("#saveEducationDetails").addClass("d-none");
		} else {
			$("#skipExperienceDetails").removeClass("d-none");
		}
		isTotalExpEqualToRequiredExp(saveQualificationList);
	})();
	console.log(saveQualificationList, "-save q list");

	let is_other_specilization_selected = false;
	printEducationTable(saveQualificationList);

	const AUDIT = 1;
	const FINANCE = 2;
	const COMPLIANCE = 3;
	const LEGAL = 4;
	const RISK_MANAGEMENT = 5;
	const OTHER = 6;

	const EXPERIENCE_DEPARTMENT_LIST = [
		{ id: AUDIT, value: "Audit" },
		{ id: FINANCE, value: "Finance" },
		{ id: COMPLIANCE, value: "Compliance" },
		{ id: LEGAL, value: "Legal" },
		{ id: RISK_MANAGEMENT, value: "Risk Management" },
		{ id: OTHER, value: "Other" },
	];

	printExperienceDepartmentDropdown();
	function printExperienceDepartmentDropdown() {
		let dropdown_html = EXPERIENCE_DEPARTMENT_LIST.map(el => {
			return `<option value='${el.value}'>${el.value}</option>`;
		});
		dropdown_html = `
		<label for='experience-department' class='input-label'>
			Experience Department
			<br>
			(अनुभव विभाग)
		</label>
		<select id='experience-department' class='input-element input-sm' name='experience_department'>
			<option value=''>--Select Department--</option>
			${dropdown_html}	
		</select>
		<input id='experience-department-manual-input' class='input-element input-sm d-none mt-3' type='text' name='experience_department'/>
		`;
		$(".experience-department-dropdown").html(dropdown_html);
		add_input_field_for_other_experience_department();
	}

	function add_input_field_for_other_experience_department() {
		const check_with = "other";
		$(document).on("change", "#experience-department", function (e) {
			console.log("changed");
			const selected_department = $(this).val().toLowerCase();

			if (selected_department === check_with) {
				console.log("in here");
				$("#experience-department-manual-input").removeClass("d-none");
				is_other_specilization_selected = true;
			} else {
				$("#experience-department-manual-input").addClass("d-none");
				is_other_specilization_selected = false;
			}
		});
	}

	$("#experienceForm").validate({
		rules: {
			organization: {
				required: true,
			},
			location: {
				required: true,
			},
			designation: {
				required: true,
			},
			experience: {
				required: true,
				// number: true,
				// min: 1,
			},
			experience_department: {
				required: true,
			},
			experience_starting_date: {
				required: true,
			},
			experience_end_date: {
				required: true,
			},
		},

		messages: {
			organization: {
				required: "Enter Organization Name",
			},
			location: {
				required: "Enter Working Location",
			},
			designation: {
				required: "Enter Your Designation",
			},
			experience: {
				required: "Enter Experience Count",
				// number: 'Invalid Experience Count',
				// min: 'Invalid Experience Count',
			},
			experience_department: {
				required: "select department",
			},
			experience_starting_date: {
				required: "mention experience start date",
			},
			experience_end_date: {
				required: "mention experience end date",
			},
		},

		errorPlacement: function (error, element) {
			let e = $(element).parent("div");
			error.appendTo(e);
			// error.insertAfter(element);

			$("label[class='error']").addClass(
				"text-danger font-weight-bolder",
			);
		},
	});

	$("#addNewDetails").on("click", function () {
		$("#experienceModal").modal("show");
		$("#experienceModal .modal").html(
			"Experience Details(अनुभव तपशील)",
		);
		$(".form-select-input,.form-control-input").val("");
	});

	// calculate experience years from starting and ending date

	let exp_start_date = "";
	let exp_end_date = "";
	$(document).on("change", ".experience-date", function () {
		exp_start_date =
			$(this).attr("name") === "experience_starting_date"
				? $(this).val()
				: exp_start_date;

		exp_end_date =
			$(this).attr("name") === "experience_end_date"
				? $(this).val()
				: exp_end_date;

		if (exp_start_date !== "" && exp_end_date !== "") {
			$.ajax({
				url: "/eligibility-dob",
				method: "POST",
				data: { dob: exp_start_date, to: exp_end_date },
			})
				.done(_result => {
					// let exp_string = `${_result.day} - Days,${_result.month} - Month,${_result.year} - Years`;
					let exp_string = `${_result.year}-Years,${_result.month}-Month,${_result.day}-Days`;
					$("#total-experience").val(exp_string);
				})
				.fail(_err => {
					console.log(_err, "--");
				});
		}
	});

	// $('#experienceForm').on('submit', function (e) {
	$(".experienceSaveBtn").on("click", function (e) {
		e.preventDefault();
		console.log("saving experience");
		let is_save_button = false;

		if ($(this).attr("name") === "save") {
			is_save_button = true;
		}
		if ($("#experienceForm").valid()) {
			let formData = $("#experienceForm").serializeArray();
			let _formData = {};
			formData.forEach(function (obj) {
				_formData[obj.name] = obj.value;
			});

			if (is_other_specilization_selected) {
				_formData["experience_department"] = $(
					"#experience-department-manual-input",
				).val();
			} else {
				let experienceDepartment = $("#experience-department").val();
				if (experienceDepartment === "") {
					return;
				}
				_formData["experience_department"] = experienceDepartment;
			}

			saveQualificationList.push(_formData);
			alertjs.success(
				{
					t: "Success",
					m: "Experience added successfully.",
				},
				function () {
					$("#experienceForm")[0].reset();
					if (is_save_button) {
						$("#experienceModal").modal("hide");
					}
					printEducationTable(saveQualificationList);
				},
			);
		}
	});

	$(document).on("click", ".remove-education", function () {
		let index = $(this).attr("data-id");
		alertjs.delete(function (status) {
			if (status) {
				saveQualificationList.splice(index, 1);
				printEducationTable(saveQualificationList);
			}
		});
	});

	function printEducationTable(list) {
		console.log(list, "list --2");
		is_other_specilization_selected = false;
		$("#experience-department-manual-input").addClass("d-none");

		isTotalExpEqualToRequiredExp(list);

		let tr = "";
		if (list.length === 0) {
			tr = `<tr>
              <td colspan="8" class="text-center text-danger fw-bold input-label"> No Experience Details Are Added</td>
              </tr>`;
		} else {
			tr = list
				.map(function (li, index) {
					console.log(index, "print index");
					return `<tr class='text-center'>
                    <td class='input-label'>${li.organization}</td>
                    <td class='input-label'>${li.location}</td>
                    <td class='input-label' class="word">${
						li.designation
					}</td>
                    <td class='input-label' class="word">${
						li?.experience_description || "-"
					}</td>
                    <td class='input-label'>${li?.experience || "-"}</td>
                    <td class="small input-label">
                      <button class="remove-education btn btn-danger btn-sm" data-id="${index}">
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>`;
				})
				.join("");
		}
		$("#educationTbody").html(tr);
	}

	function isTotalExpEqualToRequiredExp(list) {
		console.log(list, "-list");
		let totalDays = 0;
		list.forEach(exp => {
			totalDays += getTotalDays(exp.experience);
		});

		const totalYears = Math.floor(totalDays / 365);
		console.log(totalYears, "==totalYears");
		if (+totalYears >= +totalExpRequiredInYears) {
			$("#saveEducationDetails").removeClass("d-none");
			$("#skipExperienceDetails").addClass("d-none");
		} else {
			$("#saveEducationDetails").addClass("d-none");
			$("#skipExperienceDetails").addClass("d-none");
		}

		if (+totalYears == 0 && is_post_required_experience == "false") {
			$("#skipExperienceDetails").removeClass("d-none");
			$("#saveEducationDetails").addClass("d-none");
		}

		if (list.length >= 1 && is_post_required_experience == "false") {
			$("#saveEducationDetails").removeClass("d-none");
			$("#skipExperienceDetails").addClass("d-none");
		}
	}
	function getTotalDays(experienceStr) {
		const regex = /(\d+)-Years,(\d+)-Month,(\d+)-Days/;
		const match = experienceStr.match(regex);

		if (match) {
			const years = parseInt(match[1]);
			const months = parseInt(match[2]);
			const days = parseInt(match[3]);

			// prettier-ignore
			return (years * 365) + (months * 30) + days;
		}
		return 0;
	}

	$("#saveEducationDetails").on("click", function () {
		var sendData = {
			cri: regID,
			cfi: form_id,
			exp_data: JSON.stringify(saveQualificationList),
		};
		var $this = $("#saveEducationDetails");
		$this.prop("disabled", true).html(`Saving Details...`);
		$.ajax({
			method: "post",
			url: "/save-experience-details",
			data: sendData,
		})

			.done(function (data) {
				$this.prop("disabled", false).html(`Submit`);

				var json_data = data;

				if (json_data._call == 1) {
					alertjs.success(
						{
							t: "Experience Details Saved Successfully.",
							m: "",
						},
						function () {
							window.location.assign(
								"/achievement-details/" + regString,
							);
						},
					);
				}
			})

			.fail(function (error) {
				$this.prop("disabled", false).html(`Submit`);

				alertjs.error(function () {
					console.log(error);
				});
			})

			.always(function () {
				$this.prop("disabled", false).html(`Submit`);
			});
	});

	$("#skipExperienceDetails").on("click", function (e) {
		e.preventDefault();

		window.open("/achievement-details/" + regString, "_self");
	});
});
