import { alertjs, _showLoader, _hideLoader } from "./common.js";

var compareDate = null;
let compareDateFrom = null;
let compareDateTo = null;
let compareDateAgeString = "";
let maxAge = 0;
let minAge = 0;
var candidateAge = 0;

var generalDetails = {
	detailsbday: "",

	detailsmonth: "",

	detailsYear: "",

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

	update_page: 1,

	regString: "",

	detailsReligion: "",

	detailsNationality: "",

	detailsDomicile: "",

	detailsMarathiLanguage: "Marathi",

	detailsMarathiLanguageRead: 0,

	detailsMarathiLanguageWrite: 0,

	detailsMarathiLanguageSpeak: 0,

	detailsEnglishLanguage: "English",

	detailsEnglishLanguageRead: 0,

	detailsEnglishLanguageWrite: 0,

	detailsEnglishLanguageSpeak: 0,

	detailsOtherLanguage: "Hindi",

	detailsOtherLanguageRead: 0,

	detailsOtherLanguageWrite: 0,

	detailsOtherLanguageSpeak: 0,

	detailsDisability: "",

	detailsDisabilityType: "",

	detailsExServiceman: "",

	detailsExServicemanYear: "",

	detailsExServicemanMonth: "",

	detailsFreedomFighterChild: "",

	detailsProjectAffected: "",

	detailsMeritoriousSports: "",

	detailsChildWifeServicemanDied: "",

	detailsJDPendingInCourt: "",

	detailsJDPendingDisciplinaryOtherSimilarAction: "",

	detailsJDPendingDisciplinaryActionByGov: "",

	detailsJDCourtCaseFiled: "",

	detailsJDBlackListed: "",

	detailsEarthquakeAffected: "",

	detailsSammanter: "-1",

	detailsSammanterText: "",

	detailsExistingEmployee: "0",

	detailsExistingEmployeeDept: "-",

	detailsExistingEmployeeDeptPost: "-",

	detailsExistingEmployeeYear: 0,

	detailsExistingEmployeeMonth: 0,

	detailsMainPost: "",

	detailsIsEmployed: "-1",
};

var month = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

$("#detailsbday").html("<option value='-1'>Day</option>");

$("#detailsmonth").html("<option value='-1'>Month</option>");

$("#detailsYear").html("<option value='-1'>Year</option>");
$("#detailsPost").html("<option value='-1'>---- Select ----</option>");

$("#detailsMainPost").html("<option value=''>---- Select ----</option>");

generalDetails.cri = regID;

generalDetails.regString = regString;

generalDetails.cfi = form_id;

var mainPostList = removeDuplicates(postList, "post_name");

for (var i = 1; i < 32; i++) {
	$("#detailsbday").append(`<option value='${i}'>${i}</option>`);
}

for (var i = 1960; i <= 2010; i++) {
	$("#detailsYear").append(`<option value='${i}'>${i}</option>`);
}

month.forEach(function (value, index) {
	$("#detailsmonth").append(`<option value='${index + 1}'>${value}</option>`);
});
mainPostList.forEach(function (value, index) {
	$("#detailsMainPost").append(
		`<option value="${value.main_post_name}">${value.main_post_name}</option>`,
	);
});

$("#detailsbday").change(function (e) {
	var val = $(this).val();
	generalDetails.detailsbday = val;

	calculateAge();
});

$("#detailsmonth").change(function (e) {
	var val = $(this).val();
	generalDetails.detailsmonth = val;
	calculateAge();
});

$("#detailsYear").change(function (e) {
	var val = $(this).val();
	generalDetails.detailsYear = val;
	calculateAge();
});

$("#detailsMainPost").on("change", function () {
	var bankName = $(this).val();
	generalDetails.detailsMainPost = bankName;
	// $('#detailsPostType').html('<select>--Select Type--</select>')
	// $('#detailsPost').html('<select>--Select Type--</select>')
	_showLoader();
	setPost();
	_hideLoader();
});

$("#detailsPost").change(function (e) {
	let postId = $(this).val();
	if (postId == "-1") return false;

	let _selectedPostDetails = postList.find(post => {
		return Number(post.id) === Number(postId);
	});

	checkForPostDetails(_selectedPostDetails);

	setCategoryForPost(
		postId,
		JSON.parse(_selectedPostDetails.post_allowed_category),
	);

	renderExtraDeclerationCheckboxes(_selectedPostDetails);
});

$("#detailsCategory").on("change", function () {
	console.log($(this), "==$(this)==");
	let _selectedCastId = $(this).val();
	const _catName = $("#detailsCategory option:selected").data("catname");
	console.log(_catName, "==_catName==");
	generalDetails.detailsCategory = _catName;
	generalDetails.detailsCategoryId = _selectedCastId;

	let selectedPostId = $("#detailsPost").val();
	let selectedCastAllDetails = postCategoryList.filter(
		el =>
			Number(el.category_id) == Number(_selectedCastId) &&
			Number(el.postId) == Number(selectedPostId),
	);

	setExamFees(selectedCastAllDetails);
});

function setPost() {
	console.log(postList, "-postlist");
	let postsAsPerPostType = postList
		.filter(post => {
			return post.main_post_name == generalDetails.detailsMainPost;
		})
		.map(el => {
			return `<option value="${el.id}">${el.name}</option>`;
		});

	postsAsPerPostType =
		`<option value='-1'>---- Select ----</option>` + postsAsPerPostType;

	$("#detailsPost").html(postsAsPerPostType);
}

function setCategoryForPost(postId, _selectedPostAllowedCategoryId) {
	let _postCategoryHtml = postCategoryList
		.filter(el => {
			return (
				Number(el.postId) == Number(postId) &&
				_selectedPostAllowedCategoryId.includes(
					el.category_id.toString(),
				)
			);
		})
		.map(el => {
			return `<option value="${el.category_id}" data-catname="${el.cat_name}">${el?.cat_name?.toUpperCase()}</option>`;
		});

	_postCategoryHtml =
		`<option value=''>--Select Caste--</option>` + _postCategoryHtml;
	$("#detailsCategory").html(_postCategoryHtml);
}

function renderExtraDeclerationCheckboxes(postDetails) {
	if (postDetails.post_eligibility_checkboxes.length == 0) return false;

	const _extraDeclerationHtml = postDetails.post_eligibility_checkboxes.map(
		el => {
			return `
				<div class="mt-1">
					<input type="checkbox" class="extra-decleration"/>	
					<label class="ms-1 input-label">${el}</label>
				</div>
				`;
		},
	);
	$("#extra-declerations").html(_extraDeclerationHtml);
}

function removeDuplicates(originalArray, prop) {
	var newArray = [];
	var seenNames = {};

	newArray = originalArray.filter(function (currentObject) {
		if (currentObject.main_post_name in seenNames) {
			return false;
		} else {
			seenNames[currentObject.main_post_name] = true;
			return true;
		}
	});
	return newArray;
}

$(".date").addClass("d-none");
function calculateAge() {
	_showLoader();
	if (
		generalDetails.detailsbday == "" ||
		generalDetails.detailsmonth == "" ||
		generalDetails.detailsYear == "" ||
		generalDetails.detailsbday == "-1" ||
		generalDetails.detailsmonth == "-1" ||
		generalDetails.detailsYear == "-1"
	) {
		$(".setAgeText").html("-");
		candidateAge = 0;
		_hideLoader();
	} else {
		/*var dob = new Date(
      generalDetails.detailsYear,
      generalDetails.detailsmonth - 1,
      generalDetails.detailsbday
    );*/
		//console.log(dob);
		// var month_diff = compareDate.getTime() - dob.getTime();
		// var age_dt = new Date(month_diff);
		// var year = age_dt.getUTCFullYear();
		// candidateAge = Math.abs(year - 1970);
		// $(".setAgeText").html(candidateAge + "+");

		// var today = compareDate;
		// var age = today.getTime() - dob.getTime();
		// var elapsed = new Date(age);
		// console.log(elapsed);
		// var year = elapsed.getFullYear() - 1970;
		// var month = elapsed.getMonth();
		// var day = elapsed.getDate();
		//var ageTotal = year + " Years," + month + " Months";
		//candidateAge = year;

		let dob = `${generalDetails.detailsYear}-${generalDetails.detailsmonth}-${generalDetails.detailsbday}`;
		// let diff = moment(date).diff(moment(compareDate), "milliseconds");
		// let duration = moment.duration(diff);
		// console.log(duration);
		// candidateAge = Number(duration._data.years.toString().replace("-", ""));
		// $(".setAgeText").html(duration.format().replace("-", ""));
		let to = compareDate;
		// compareDateTo
		// compareDateAgeString
		// console.log(to);
		// return false;
		$.ajax({
			method: "post",
			url: "/eligibility-dob",
			data: { dob, to },
		})
			.done(function (data) {
				_hideLoader();
				console.log(data);
				compareDateFrom = dob;
				compareDateTo = compareDate;
				compareDateAgeString = `${data.year} year, ${data.month} month, ${data.day} day`;
				candidateAge = Number(data.year);
				$(".setAgeText").html(compareDateAgeString);
			})

			.fail(function (error) {
				_hideLoader();
				$(".setAgeText").html("-");
				alertjs.error(function () {
					console.log(error);
				});
			});
	}
}

function verify(callback) {
	console.log($(".extra-decleration"), "this log ===");

	// return;
	var subList = postList.filter(function (element) {
		return (
			element.main_post_name == generalDetails.detailsMainPost &&
			element.name == generalDetails.detailsPostName
		);
	});
	console.log(subList, "==subList==");

	if (subList.length === 0) {
		alertjs.warning(
			{
				t: "Select Post.",
				m: "",
			},

			function () {},
		);
		return false;
	}

	if ($("#detailsCategory").val() == "") {
		alertjs.warning({ t: "Warning", m: "select caste." }, () => {});
		return false;
	}

	let isWorkingInBankRadioButton = $(
		'input[name="post-is-employed"]:checked',
	).val();

	if (isWorkingInBankRadioButton === "yes") {
		generalDetails.detailsIsEmployed = 1;
		console.log("is employed checked");
		maxAge = subList[0].post_is_employed_max_age;
		if (candidateAge > maxAge) {
			alertjs.warning(
				{
					t: "Your age is not applicable for this post.",
					m: `Age must be less than or equal to ${maxAge}. Your age is ${candidateAge} plus`,
				},
				function () {},
			);
			return;
		} else {
			check2(type => {
				if (type == false) {
					return false;
				}
			});
		}
	} else {
		maxAge = subList[0].post_age_limit;
	}

	check2(function (type) {
		if (type == false) {
			return false;
		}

		if (subList[0].post_tenth === 1) {
			if ($("#checkTenth").prop("checked") === false) {
				alertjs.warning(
					{
						t: "SSC/10th is compulsory for this post.",
						m: "",
					},

					function () {},
				);
				return false;
			}
		}

		if (subList[0].post_graduation === 1) {
			if ($("#checkGraduation").prop("checked") === false) {
				alertjs.warning(
					{
						t: "Graduation is compulsory for this post.",
						m: "",
					},

					function () {},
				);
				return false;
			}

			if ($("#checkGraduation-2").prop("checked") === false) {
				alertjs.warning(
					{
						t: "Minimum 50% are mandatory in Graduation",
						m: "",
					},

					function () {},
				);
				return false;
			}

			// if ($('#checkGraduation-3').prop('checked') === false) {
			// 	alertjs.warning(
			// 		{
			// 			t: 'It is mandatory to complete the Graduation in First Attempt.',
			// 			m: '',
			// 		},

			// 		function () {}
			// 	)
			// 	return false
			// }
		}

		if (subList[0].post_com_citification === 1) {
			if ($("#checkCitification").prop("checked") === false) {
				alertjs.warning(
					{
						t: "A computer certification course is compulsory for this post.",
						m: "",
					},

					function () {},
				);
				return false;
			}
		}

		if (subList[0].post_eligibility_checkboxes.length >= 1) {
			let allChecked = true;
			$(".extra-decleration").each((i, el) => {
				console.log($(el).prop("checked"), "==el==");
				if ($(el).prop("checked") === false) {
					alertjs.warning(
						{
							t: "Warning!!!",
							m: "confirm all of the declarations.",
						},

						function () {},
					);
					allChecked = false;
					return false;
				}
			});
			if (!allChecked) {
				return false;
			}
		}

		alertjs.success(
			{
				t: "Verified!!!",

				m: "Now, you can save the form.",
			},

			function () {
				$("#submitPersonalDetails").removeClass("d-none");
			},
		);
	});
}
function check2(callback) {
	var age = candidateAge;
	if (age == 0) {
		alertjs.warning(
			{
				t: "Your age is not applicable for this post.",

				m: `Age Must Not Be Zero i.e 0`,
			},

			function () {},
		);
		callback(false);
		return false;
	}
	let max = maxAge;
	if (age >= max) {
		alertjs.warning(
			{
				t: "Your age is not applicable for this post.",
				m: `Age must be less than or equal to ${max}. Your age is ${age} plus`,
			},
			function () {},
		);
		callback(false);
		return false;
	}
	let min = minAge;
	if (age < min) {
		alertjs.warning(
			{
				t: "Your age is not applicable for this post.",
				m: `Age must be greater than or equal to ${min}. Your age is ${age}`,
			},
			function () {},
		);
		callback(false);
		return false;
	}

	callback(true);
}

//

$("#verifyPersonalDetails").on("click", function () {
	_showLoader();
	verify();
	_hideLoader();
});

$("#submitPersonalDetails").click(function () {
	_showLoader();
	var $this = $("#submitPersonalDetails");
	console.log(generalDetails, "==generalDetails==");

	var subList = postList.filter(function (element) {
		return (
			element.main_post_name == generalDetails.detailsMainPost &&
			element.name == generalDetails.detailsPostName
		);
	});

	if (subList.length === 0) {
		alertjs.warning(
			{
				t: "Select Post",
				m: "",
			},

			function () {},
		);
		_hideLoader();
		return false;
	}

	check2(function (type) {
		if (type == false) {
			_hideLoader();
			return false;
		}
		if (subList[0].post_tenth === 1) {
			if ($("#checkTenth").prop("checked") === false) {
				alertjs.warning(
					{
						t: "10th is compulsory for this post",
						m: "",
					},

					function () {},
				);
				_hideLoader();
				return false;
			}
		}

		if (subList[0].post_graduation === 1) {
			if ($("#checkGraduation").prop("checked") === false) {
				alertjs.warning(
					{
						t: "Graduation is compulsory for this post",
						m: "",
					},

					function () {},
				);
				_hideLoader();
				return false;
			}
		}

		if (subList[0].post_com_citification === 1) {
			if ($("#checkCitification").prop("checked") === false) {
				alertjs.warning(
					{
						t: "Computer certification course is compulsory  for this post",
						m: "",
					},

					function () {},
				);
				_hideLoader();
				return false;
			}
		}

		if (subList[0].post_eligibility_checkboxes.length >= 1) {
			let allChecked = true;
			$(".extra-decleration").each((i, el) => {
				console.log($(el).prop("checked"), "==el==");
				if ($(el).prop("checked") === false) {
					alertjs.warning(
						{
							t: "Warning!!!",
							m: "Confirm all of the declarations.",
						},

						function () {},
					);
					allChecked = false;
					return false;
				}
			});
			if (!allChecked) {
				_hideLoader();
				return false;
			}
		}

		$this.prop("disabled", true).html(`Saving Details...`);
		$.ajax({
			method: "post",
			url: "/save-eligible-details",
			data: {
				...generalDetails,
				compareDateFrom,
				compareDateTo,
				compareDateAgeString,
			},
		})
			.done(function (data) {
				_hideLoader();
				$this.prop("disabled", false).html(`Submit`);
				var json_data = data;
				if (json_data._call == 1) {
					generalDetails.cfi = json_data.form_id;
					alertjs.success(
						{
							t: "Eligibiliy Details saved successfully",
							m: "",
						},
						function () {
							window.location.assign(
								"/user-details/" + generalDetails.regString,
							);
						},
					);
					// switch (json_data.type) {
					// 	case 'add':
					// 		generalDetails.cfi = json_data.form_id
					// 		alertjs.success(
					// 			{
					// 				t: 'Details Saved Successfully',
					// 				m: '',
					// 			},
					// 			function () {
					// 				window.location.assign(
					// 					'/user-details/' + generalDetails.regString
					// 				)
					// 			}
					// 		)
					// 		break
					// 	default:
					// 		alertjs.success(
					// 			{
					// 				t: 'Details Add Successfully',
					// 				m: '',
					// 			},
					// 			function () {
					// 				window.location.assign(
					// 					'/user-details/' + generalDetails.regString
					// 				)
					// 			}
					// 		)
					// 		break
					// }
				}
			})

			.fail(function (error) {
				_hideLoader();
				$this.prop("disabled", false).html(`Submit`);

				alertjs.error(function () {
					console.log(error);
				});
			})

			.always(function () {
				_hideLoader();
			});
	});
});

function setExamFees(casteDetails) {
	console.log(casteDetails, "==casteDetails setExamFees==");
	if (casteDetails.length == 0) {
		$("#exam-fee").html(`&nbsp; 0/-`);

		$("#exam-fee-tax").html(`&nbsp; 0/-`);

		$("#total-exam-fee").html(`&nbsp; 0/-`);
		return;
	}
	$("#exam-fee").html(`&nbsp; ${casteDetails[0].payment}/-`);

	$("#exam-fee-tax").html(`&nbsp; ${casteDetails[0].pi_tax_payment}/-`);

	$("#total-exam-fee").html(
		`&nbsp; ${Number(casteDetails[0].pi_tax_payment) + Number(casteDetails[0].payment)}/-`,
	);
}

function checkForPostDetails(_selectedPostDetails) {
	_showLoader();
	$.ajax({
		method: "post",
		url: "/check-for-post-details",
		data: { _postId: _selectedPostDetails.id },
	})
		.done(function (data) {
			_hideLoader();
			console.log(data, "data");
			var json_data = data;

			switch (json_data._call) {
				case 1:
					$(".decleration-container").removeClass("d-none");
					generalDetails.detailsPostId = _selectedPostDetails.id;
					generalDetails.detailsPostName = _selectedPostDetails.name;
					/* cast handling */
					$(".date").removeClass("d-none");
					compareDate = _selectedPostDetails.post_date_from;
					$(".setAgeOfAsOn").html(
						_selectedPostDetails.post_date_from_1,
					);
					minAge = _selectedPostDetails.post_age_from;
					maxAge = _selectedPostDetails.post_age_limit;
					//elg-graduation
					//elg-citification
					//elg-tenth

					$(".select-cast-dropdown").removeClass("d-none");

					if (_selectedPostDetails.post_com_citification == 1) {
						$("#elg-citification")
							.prop("checked", false)
							.removeClass("d-none");
					} else {
						$("#elg-citification")
							.prop("checked", false)
							.addClass("d-none");
					}

					if (_selectedPostDetails.post_graduation == 1) {
						$("#elg-graduation")
							.prop("checked", false)
							.removeClass("d-none");
					} else {
						$("#elg-graduation")
							.prop("checked", false)
							.addClass("d-none");
					}

					if (_selectedPostDetails.post_graduation == 1) {
						$("#elg-graduation-3")
							.prop("checked", false)
							.removeClass("d-none");
					} else {
						$("#elg-graduation-3")
							.prop("checked", false)
							.addClass("d-none");
					}

					if (_selectedPostDetails.post_graduation == 1) {
						$("#elg-graduation-4")
							.prop("checked", false)
							.removeClass("d-none");
					} else {
						$("#elg-graduation-4")
							.prop("checked", false)
							.addClass("d-none");
					}

					if (_selectedPostDetails.post_tenth == 1) {
						$("#elg-tenth")
							.prop("checked", false)
							.removeClass("d-none");
					} else {
						$("#elg-tenth")
							.prop("checked", false)
							.addClass("d-none");
					}

					if (_selectedPostDetails.post_is_employed === 1) {
						$("#elg-isWorkingInBank").removeClass("d-none");
					} else {
						$("#elg-isWorkingInBank").addClass("d-none");
					}
					break;

				case 2:
					$(".decleration-container").addClass("d-none");
					generalDetails.detailsPostId = "";

					generalDetails.detailsPostName = "";

					alertjs.warning(
						{
							t: "You have already applied for this post",

							m: "",
						},
						function () {
							$(".select-cast-dropdown").addClass("d-none");
							$(".date").addClass("d-none");
							$("#detailsPost").val("-2");
							$("#elg-citification")
								.prop("checked", false)
								.addClass("d-none");
							$("#elg-graduation")
								.prop("checked", false)
								.addClass("d-none");
							$("#elg-tenth")
								.prop("checked", false)
								.addClass("d-none");
							$("#elg-graduation-3")
								.prop("checked", false)
								.addClass("d-none");
							$("#elg-graduation-4")
								.prop("checked", false)
								.addClass("d-none");

							setPost();
						},
					);

					break;

				default:
					alertjs.warning(
						{
							t: "Session expired login again.",
							m: "",
						},

						function () {
							window.location.replace("/");
						},
					);
					break;
			}
		})
		.fail(function (error) {
			_hideLoader();
			alertjs.error(function () {
				console.log(error);
			});
		})
		.always(function () {
			_hideLoader();
		});
}
