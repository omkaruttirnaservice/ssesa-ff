import { alertjs } from "./common.js";

$(document).ready(() => {
	const disabledInputs = $(
		"input:not(.no-edit), select:not(.no-edit), textarea:not(.no-edit)",
	);

	disabledInputs.css("pointer-events", "none");

	$("input, select, textarea").attr("readonly", true);

	const candidateForm = $("#candidate-form");
	const submitButton = $("#candidate-form-submit-btn");
	const editFormBtn = $("#edit-btn");

	editFormBtn.on("click", function (e) {
		e.preventDefault();
		disabledInputs.attr("readonly", false);
		disabledInputs.css("pointer-events", "all");
	});

	candidateForm.validate({
		rules: {
			name: {
				required: true,
				minlength: 2,
			},
			dob: {
				required: true,
				dateISO: true,
			},
			gender: {
				required: true,
			},
			email: {
				required: true,
				email: true,
			},
			"primary-mobile": {
				required: true,
				digits: true,
				minlength: 10,
				maxlength: 10,
			},
			"alternate-mobile": {
				digits: true,
				minlength: 10,
				maxlength: 10,
			},
			caste: {
				required: true,
			},
			subcaste: {
				required: true,
			},
			adress: {
				required: true,
				minlength: 5,
			},
		},
		messages: {
			name: {
				required: "Full name is required",
				minlength: "Full name must be at least 2 characters",
			},
			dob: {
				required: "Date of birth is required",
				dateISO: "Enter a valid date in YYYY-MM-DD format",
			},
			gender: {
				required: "Please select your gender",
			},
			email: {
				required: "Email is required",
				email: "Enter a valid email address",
			},
			"primary-mobile": {
				required: "Primary mobile number is required",
				digits: "Only digits are allowed",
				minlength: "Mobile number must be 10 digits",
				maxlength: "Mobile number must be 10 digits",
			},
			"alternate-mobile": {
				digits: "Only digits are allowed",
				minlength: "Mobile number must be 10 digits",
				maxlength: "Mobile number must be 10 digits",
			},
			caste: {
				required: "Please select your caste",
			},
			subcaste: {
				required: "Subcaste is required",
			},
			adress: {
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

		// validate
		if (!candidateForm.valid()) {
			return;
		}

		// get form data
		const formData = new FormData($(this)[0]);

		formData.set("r_id", candidateInfo.r_id);
		formData.set("f_id", candidateInfo.f_id);

		// compare both the objects
		const isUpdated = compareObjectsDeep(
			candidateInfo,
			formDataToJsObject(formData),
		);

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
			alertjs.success({ t: "Successful", m: "Details updated" }, () => {
				// window.location.reload();
				window.location.assign(
					"/v2/document-upload?r=" +
						candidateInfo.r_id +
						"&f=" +
						candidateInfo.f_id,
				);
			});
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
				key == "ca_offline_form_no";

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

		return jsObject;
	}
});
