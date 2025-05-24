import { alertjs } from "./common.js";
let saveQualificationList = achievementList;
$(function () {
	printEducationTable(saveQualificationList);
	check_added_achievements();

	$("#achievementForm").validate({
		rules: {
			particulars: {
				required: true,
			},
			award: {
				required: true,
			},
			proficiency_1: {
				required: true,
			},
			proficiency_2: {
				required: true,
			},
		},

		messages: {
			particulars: {
				required: "Enter Particulars",
			},
			award: {
				required: "Enter Award Certificate / Scholarship",
			},
			proficiency_1: {
				required: "Enter Proficiency in Games/Sports",
			},
			proficiency_2: {
				required: "Proficiency in literacy work/art/culture",
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
		$("#experienceModal .modal").html("Accomplishments (सिद्धता)");
		$(".form-select-input,.form-control-input").val("");
	});

	$("#achievementForm").on("submit", function (e) {
		e.preventDefault();
		if ($("#achievementForm").valid()) {
			let formData = $("#achievementForm").serializeArray();
			let _formData = {};
			formData.forEach(function (obj) {
				_formData[obj.name] = obj.value;
			});

			saveQualificationList.push(_formData);
			alertjs.success(
				{
					t: "Success",

					m: "Achievement added successfully.",
				},

				function () {
					$("#achievementForm")[0].reset();
					$("#experienceModal").modal("hide");
					printEducationTable(saveQualificationList);
				},
			);
		}
	});

	$(document).on("click", ".remove-education", function () {
		check_added_achievements();
		alertjs.delete(function (status) {
			if (status) {
				let index = $(this).data("id");
				saveQualificationList.splice(index, 1);
				printEducationTable(saveQualificationList);
			}
		});
	});

	function printEducationTable(list) {
		check_added_achievements();
		let tr = "";
		if (list.length === 0) {
			tr = `<tr>
              <td colspan="8" class="text-center text-danger fw-bold input-label"> No Achievement Details Are Added</td>
              </tr>`;
		} else {
			tr = list
				.map(function (li, index) {
					return `<tr class='text-center'>
                    <td class='input-label'>${li.particulars}</td>
                    <td class='input-label'>${li.award}</td>
                    <td class='input-label word'>${li.proficiency_1}</td>
                    <td class='input-label'>${li.proficiency_2}</td>

                    <td class="small input-label">
                      <button class="remove-education btn btn-danger btn-sm" data-id=${index}>
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>`;
				})
				.join("");
		}
		$("#educationTbody").html(tr);
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
			url: "/save-achievement-details",
			data: sendData,
		})

			.done(function (data) {
				$this.prop("disabled", false).html(`Submit`);

				var json_data = data;

				if (json_data._call == 1) {
					alertjs.success(
						{
							t: "Achievement Details Saved Successfully",
							m: "",
						},
						function () {
							window.location.assign(
								"/document-upload/" + regString,
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

	function check_added_achievements() {
		if (saveQualificationList.length > 0) {
			$("#saveEducationDetails").removeClass("d-none");
			$(".achieve-skip-btn").addClass("d-none");
		} else {
			$("#saveEducationDetails").addClass("d-none");
			$(".achieve-skip-btn").removeClass("d-none");
		}
	}

	// skip achievements details

	// $('#skipAchievementDetails').on('click', function (e) {
	// 	e.preventDefault()

	// 	let is_experience_added = saveQualificationList.length > 0

	// 	console.log(is_experience_added)

	// 	if (!is_experience_added && post_experience_required === 1) {
	// 		alertjs.warning(
	// 			{
	// 				t: 'add experience',
	// 			},
	// 			() => {}
	// 		)
	// 	} else {
	// 		window.open('/document-upload/' + regString, '_self')
	// 	}
	// })
});
