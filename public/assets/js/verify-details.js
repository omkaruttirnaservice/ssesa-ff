import { alertjs } from "./common.js";

$(document).ready(() => {
	// add jquery datepicker for date of birth
	$("#dob").datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: "dd-mm-yy",
	});

	const disabledInputs = $(
		"input:not(.no-edit):not(.no-disabled), select:not(.no-edit):not(.no-disabled), textarea:not(.no-edit):not(.no-disabled)",
	);

	disabledInputs.css("pointer-events", "none");

	$("input, select, textarea").attr("readonly", true);

	const candidateForm = $("#candidate-form");
	const submitButton = $("#candidate-form-submit-btn");
	const editFormBtn = $("#edit-btn");
	const declerationInput = $("#decleration");

	editFormBtn.on("click", function (e) {
		e.preventDefault();
		disabledInputs.attr("readonly", false);
		disabledInputs.css("pointer-events", "all");
	});

	candidateForm.validate({
		rules: {
			ub_first_name: {
				required: true,
				minlength: 2,
			},
			dob: {
				required: true,
			},
			ca_gender: {
				required: true,
			},
			ub_email_id: {
				required: true,
				email: true,
			},
			ub_mobile_number: {
				required: true,
				digits: true,
				minlength: 10,
				maxlength: 10,
			},
			ub_alternative_number: {
				digits: true,
				minlength: 10,
				maxlength: 10,
			},
			ca_catagory: {
				required: true,
			},
			ca_detailsSubCategory: {
				required: true,
			},
			ca_address: {
				required: true,
				minlength: 5,
			},
		},
		messages: {
			ub_first_name: {
				required: "Full name is required",
				minlength: "Full name must be at least 2 characters",
			},
			dob: {
				required: "Date of birth is required",
			},
			ca_gender: {
				required: "Please select your gender",
			},
			ub_email_id: {
				required: "Email is required",
				email: "Enter a valid email address",
			},
			ub_mobile_number: {
				required: "Primary mobile number is required",
				digits: "Only digits are allowed",
				minlength: "Mobile number must be 10 digits",
				maxlength: "Mobile number must be 10 digits",
			},
			ub_alternative_number: {
				digits: "Only digits are allowed",
				minlength: "Mobile number must be 10 digits",
				maxlength: "Mobile number must be 10 digits",
			},
			ca_catagory: {
				required: "Please select your caste",
			},
			ca_detailsSubCategory: {
				required: "Subcaste is required",
			},
			ca_address: {
				required: "Address is required",
				minlength: "Address must be at least 5 characters",
			},
		},
		errorClass: "text-danger",
		errorElement: "small",
		highlight: function (element) {
			$(element).addClass("is-invalid");
		},
		unhighlight: function (element) {
			$(element).removeClass("is-invalid");
		},
	});

	candidateForm.on("submit", function (e) {
		e.preventDefault();
		const isDeclerationAccepted = declerationInput.is(":checked");

		// validate
		if (!candidateForm.valid()) {
			return;
		}

		if (!isDeclerationAccepted) {
			alertjs.warning(
				{
					t: "Warning",
					m: "Please accept the declaration.",
				},
				() => {},
			);
			return;
		}

		// get form data
		const formData = new FormData($(this)[0]);

		formData.set("r_id", candidateInfo.r_id);
		formData.set("f_id", candidateInfo.f_id);

		const newDataJson = formDataToJsObject(formData);
		// compare both the objects
		const isUpdated = compareObjectsDeep(candidateInfo, newDataJson);

		console.log(isUpdated, "=isUpated");

		if (isUpdated) {
			const infoObject = {
				old: { ...candidateInfo },
				new: { ...newDataJson },
			};
			formData.set("info", JSON.stringify(infoObject));
		}

		formData.set("isUpdated", isUpdated);

		saveGeneralDetails(formData);
	});

	async function saveGeneralDetails(data) {
		const url = "/v2/save-general-details";
		submitButton.html("Submitting...");
		submitButton.attr("disabled", true);
		try {
			const _resp = await fetch(url, {
				method: "POST",
				body: data,
			});

			if (!_resp.ok) {
				throw new Error("Error while saving details");
			}

			const jsonResp = await _resp.json();
			alertjs.success(
				{ t: "Successful", m: "Details updated" },
				() => {
					// window.location.reload();
					window.location.assign(
						"/v2/document-upload?r=" +
							candidateInfo.r_id +
							"&f=" +
							candidateInfo.f_id,
					);
				},
				() => {},
			);
		} catch (error) {
			console.log(error);
		} finally {
			submitButton.html("Submit");
			submitButton.attr("disabled", false);
		}
	}

	function compareObjectsDeep(originalData, newData) {
		let isModified = false;

		for (let key in originalData) {
			let isSkipKey =
				key == "ca_post_id" ||
				key == "ca_post_name" ||
				key == "ca_offline_form_no" ||
				key == "g_done" ||
				key == "d_done";

			if (!isSkipKey) {
				if (originalData[key] != newData[key]) {
					isModified = true;
				}
			}
		}

		return isModified;
	}

	function formDataToJsObject(formData) {
		let jsObject = {};

		for (let [key, value] of formData) {
			jsObject[key] = value;
		}

		console.log(jsObject, "-new");

		return jsObject;
	}
});
