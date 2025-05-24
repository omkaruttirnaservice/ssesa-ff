var compareDate = "2023-07-07";
var candidateAge = 0;
var detailsReligion = [
	"Buddhist",
	"Christians",
	"Hindu",
	"Jain",
	"Muslims",
	"Sikhs",
	"Zoroastrians(Parsis)",
	"Other",
];

var StateList = [
	"Andaman and Nicobar Islands",

	"Andhra Pradesh",

	"Arunachal Pradesh",

	"Assam",

	"Bihar",

	"Chandigarh",

	"Chhattisgarh",

	"Dadra and Nagar Haveli and Daman & Diu",

	"Delhi",

	"Goa",

	"Gujarat",

	"Haryana",

	"Himachal Pradesh",

	"Jammu and Kashmir",

	"Jharkhand",

	"Karnataka",

	"Kerala",

	"Ladakh",

	"Lakshadweep",

	"Madhya Pradesh",

	"Maharashtra",

	"Manipur",

	"Meghalaya",

	"Mizoram",

	"Nagaland",

	"Odisha",

	"Puducherry",

	"Punjab",

	"Rajasthan",

	"Sikkim",

	"Tamil Nadu",

	"Telangana",

	"Tripura",

	"Uttar Pradesh",

	"Uttarakhand",

	"West Bengal",
];

// district in maharashtra only
var distList = [
	"Ahmednagar",

	"Akola",

	"Amravati",

	"Aurangabad",

	"Beed",

	"Bhandara",

	"Buldhana",

	"Chandrapur",

	"Dhule",

	"Gadchiroli",

	"Gondia",

	"Hingoli",

	"Jalgaon",

	"Jalna",

	"Kolhapur",

	"Latur",

	"Mumbai City",

	"Mumbai Suburban",

	"Nagpur",

	"Nanded",

	"Nandurbar",

	"Nashik",

	"Osmanabad",

	"Palghar",

	"Parbhani",

	"Pune",

	"Raigad",

	"Ratnagiri",

	"Sangli",

	"Satara",

	"Sindhudurg",

	"Solapur",

	"Thane",

	"Wardha",

	"Washim",

	"Yavatmal",
];

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
};

var generalDetailsIdArray = [
	"detailsbday",

	"detailsmonth",

	"detailsYear",

	"detailsGender",
	"detailsNonCreamyLayer",
	"detailsMarital",

	"detailsCategory",
	"detailsSubCategory",
	"detailsFather",

	"detailsMother",

	"detailsSpouse",

	"detailsAddress",

	"detailsLineTwo",

	"detailsLineThree",

	"detailsState",

	"detailsDistrict",
	"detailsTaluka",
	"detailsPin",
];

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

// $("#detailsState").html("<option value=''>---- Select State ----</option>");

$("#detailsReligion").html("<option value=''>---- Select ----</option>");

$("#distList").html("<option value=''>---- State ----</option>");

$("#detailsMainPost").html("<option value=''>---- Select ----</option>");

generalDetails.cri = regID;

generalDetails.regString = regString;

generalDetails.cfi = form_id;

for (var i = 1; i < 32; i++) {
	$("#detailsbday").append(`<option value='${i}'>${i}</option>`);
}

for (var i = 1966; i < 2006; i++) {
	$("#detailsYear").append(`<option value='${i}'>${i}</option>`);
}

month.forEach(function (value, index) {
	$("#detailsmonth").append(`<option value='${index + 1}'>${value}</option>`);
});

var mainPostList = removeDuplicates(postList, "post_name");

mainPostList.forEach(function (value, index) {
	$("#detailsMainPost").append(
		`<option value='${value.main_post_name}'>${value.main_post_name}</option>`,
	);
});

$("#detailsMainPost").on("change", function () {
	var main_post = $(this).val();

	generalDetails.detailsMainPost = main_post;

	var subList = postList

		.filter(function (element) {
			return element.main_post_name == main_post;
		})

		.map(function (element) {
			return `<option value='${element.name}'>${element.name}</option>`;
		});

	$("#detailsPost").html("<option value='-1'>---- Select ----</option>");

	$("#detailsPost").append(subList);

	if ($(this).val() == "") {
		$(".card").addClass("d-none");
	}
});

let stateListDropdownHtml = StateList.map(state => {
	return `
		<option value=${state}>${state}</option>
	`;
});

stateListDropdownHtml =
	`<option value=''>--- Select State ---</option>` + stateListDropdownHtml;

$("#detailsState").html(stateListDropdownHtml);

detailsReligion.forEach(function (value, index) {
	$("#detailsReligion").append(`<option value='${value}'>${value}</option>`);
});

$("#detailsState").change(function () {
	setDistrict();
});

setDistrict();
function setDistrict() {
	if ($("#detailsState").val()?.toLowerCase() === "maharashtra") {
		// set states in maharashtra
		let districtListHtml = distList.map(district => {
			return `
				<option value=${district}>${district}</option>	
			`;
		});
		let html = `
			<label class='input-label-title' for='detailsDistrict'>District (जिल्हा) *</label>
			<select id='detailsDistrict' name="detailsDistrict">
				<option value='-1'>--- Select District ---</option>
				${districtListHtml}
			</select>
		`;
		$("#setDistInput").html(html);
	} else {
		let districtListHtml = `
			<label class='input-label-title' for='detailsDistrict'>District (जिल्हा) *</label>
			<input class='onlyalpha input-element input-sm setToUpperCase' type='text' name='detailsDistrict_1' placeholder='District *' id='detailsDistrict'/>	
		`;
		$("#setDistInput").html(districtListHtml);
	}
	$("#detailsDistrict").val(generalDetails.detailsDistrict);
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

function manageSammanter(type = 0) {
	console.log(sammanter);
	var post = generalDetails.detailsPostId;

	var cat = generalDetails.detailsCategory;

	if (post == "" || cat == "") {
		$("#detailsSammanter").html(
			`<option value="-1">---- Select ----</option>`,
		);

		return false;
	}

	var list = sammanter.filter(function (element) {
		return (
			element.cat_name == cat &&
			Number(element.spc_post_id) == Number(post)
		);
	});

	if (list.length == 0) {
		$("#detailsSammanter").html(
			`<option value="-1">---- Select ----</option>`,
		);
	} else {
		list = list

			.map(function (element) {
				return `<option value="${element.spc_sammanter_id}">${element.sm_name}</option>`;
			})

			.join("");

		$("#detailsSammanter").html(
			`<option value="-1">---- Select ----</option>` + list,
		);

		if (type == 1) {
			$("#detailsSammanter").val(generalDetails.detailsSammanter);
		} else {
			$("#detailsSammanter").val("-1");

			generalDetails.detailsSammanter = -1;
		}
	}
}

function calculateAge() {
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
	} else {
		var dob = new Date(
			generalDetails.detailsYear,

			generalDetails.detailsmonth - 1,

			generalDetails.detailsbday,
		);
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
		// // var day = elapsed.getDate();
		// var ageTotal = year + " Years," + month + " Months";
		// candidateAge = year;
		let date = `${generalDetails.detailsYear}-${generalDetails.detailsmonth}-${generalDetails.detailsbday}`;
		let diff = moment(date).diff(moment(compareDate), "milliseconds");
		let duration = moment.duration(diff);
		console.log(duration);
		candidateAge = Number(duration._data.years.toString().replace("-", ""));
		$(".setAgeText").html(duration.format().replace("-", ""));
	}
}
// function printCastList() {
// 	let castList = []
// 	postList.forEach((post) => {
// 		if (post.name === generalDetails.detailsPostName) {
// 			castList = [post.post_allowed_category]
// 		}
// 	})
// 	console.log(castList[0].split(','))
// 	let castListHtml = castList[0]
// 		.split(',')
// 		.map((cast) => {
// 			return `<div class="form-check ms-3">
//                         <input class="input detailsCategory" id="${cast}" type='radio' name='candidateCategory' placeholder='' value='${cast}'>
//                         <label class="input-label text-capitalize form-check-label ms-1" for="${cast}">${cast.toUpperCase()}</label>
// 	            </div>`
// 		})
// 		.join('')
// 	$('.candidateCategory').html(castListHtml)
// }

function setRadioValue(value) {
	return value === "" ? "No" : value;
}
function loadDetails() {
	calculateAge();

	$("#detailsbday").val(generalDetails.detailsbday);

	$("#detailsmonth").val(generalDetails.detailsmonth);

	$("#detailsYear").val(generalDetails.detailsYear);

	$("#detailsCategory").val(generalDetails.detailsCategory.toUpperCase());
	$("#detailsSubCategory").val(generalDetails.detailsSubCategory);

	if (generalDetails.detailsGender != "") {
		$("#" + generalDetails.detailsGender).prop("checked", true);
	}

	if (generalDetails.detailsNonCreamyLayer != "") {
		$("#detailsNonCreamyLayer" + generalDetails.detailsNonCreamyLayer).prop(
			"checked",
			true,
		);
	}

	if (generalDetails.detailsMarital != "") {
		$("#" + generalDetails.detailsMarital).prop("checked", true);
	}

	if (generalDetails.detailsCategory != "") {
		$("#" + generalDetails.detailsCategory).prop("checked", true);
	}

	if (generalDetails.detailsMarital === "unmarried") {
		$("#detailsSpouse").val("-").prop("readonly", true);
	}

	if (Number(generalDetails.detailsExistingEmployee) == 1) {
		$("#detailsExistingEmployeeDept").val(
			generalDetails.detailsExistingEmployeeDept,
		);

		$("#detailsExistingEmployeeDeptPost").val(
			generalDetails.detailsExistingEmployeeDeptPost,
		);

		$("#detailsExistingEmployeeYear").val(
			generalDetails.detailsExistingEmployeeYear,
		);

		$("#detailsExistingEmployeeMonth").val(
			generalDetails.detailsExistingEmployeeMonth,
		);

		$(".existenceEmployeeDetails").removeClass("d-none");
	}

	$("#detailsExistingEmployee").val(generalDetails.detailsExistingEmployee);

	$("#detailsState").val(generalDetails.detailsState);

	$("#detailsFather").val(generalDetails.detailsFather);

	$("#detailsMother").val(generalDetails.detailsMother);

	$("#detailsSpouse").val(generalDetails.detailsSpouse);

	$("#detailsLineTwo").val(generalDetails.detailsLineTwo);

	$("#detailsLineThree").val(generalDetails.detailsLineThree);

	$("#detailsAddress").val(generalDetails.detailsAddress);

	$("#detailsTaluka").val(generalDetails.detailsTaluka);

	// $("#detailsDistrict").val(generalDetails.detailsDistrict);

	$("#detailsPin").val(
		generalDetails.detailsPin == 0 ? "" : generalDetails.detailsPin,
	);

	$("#PrePostMain").html(
		` <p type='button' class="" id="detailsPost" name="">${generalDetails.detailsMainPost}</p>`,
	);

	$("#PrePost").html(
		`<p type='button' class="" id="detailsPost" name="">${generalDetails.detailsPostName}</p>`,
	);

	$("#reg").addClass("setHand");

	setDistrict();

	if (generalDetails.detailsNationality !== "")
		$(
			"input[name=candidateNationality][value=" +
				generalDetails.detailsNationality +
				"]",
		).prop("checked", true);

	if (generalDetails.detailsDomicile !== "")
		$(
			"input[name=candidateDomicile][value=" +
				generalDetails.detailsDomicile +
				"]",
		).prop("checked", true);

	// marathi

	if (generalDetails.detailsMarathiLanguageRead == "1") {
		$("#marathiRead").prop("checked", true);
	} else {
		$("#marathiRead").prop("checked", false);
	}

	// console.log(typeof generalDetails.detailsMarathiLanguageWrite);

	if (generalDetails.detailsMarathiLanguageWrite == "1") {
		$("#marathiWrite").prop("checked", true);
	} else {
		$("#marathiWrite").prop("checked", false);
	}

	if (generalDetails.detailsMarathiLanguageSpeak == "1") {
		$("#marathiSpeak").prop("checked", true);
	} else {
		$("#marathiSpeak").prop("checked", false);
	}

	// english

	if (generalDetails.detailsEnglishLanguageRead == "1") {
		$("#englishRead").prop("checked", true);
	} else {
		$("#englishRead").prop("checked", false);
	}

	if (generalDetails.detailsEnglishLanguageWrite == "1") {
		$("#englishWrite").prop("checked", true);
	} else {
		$("#englishWrite").prop("checked", false);
	}

	if (generalDetails.detailsEnglishLanguageSpeak == "1") {
		$("#englishSpeak").prop("checked", true);
	} else {
		$("#englishSpeak").prop("checked", false);
	}

	// other

	$("#detailsOtherLanguage").val(generalDetails.detailsOtherLanguage);

	if (generalDetails.detailsOtherLanguage !== "") {
		$(".candidateDomicile").removeClass("d-none");

		if (generalDetails.detailsOtherLanguageRead == "1") {
			$("#otherRead").prop("checked", true);
		} else {
			$("#otherRead").prop("checked", false);
		}

		if (generalDetails.detailsOtherLanguageWrite == "1") {
			$("#otherWrite").prop("checked", true);
		} else {
			$("#otherWrite").prop("checked", false);
		}

		if (generalDetails.detailsOtherLanguageSpeak == "1") {
			$("#otherSpeak").prop("checked", true);
		} else {
			$("#otherSpeak").prop("checked", false);
		}
	} else {
	}
	// $(".candidateDomicile").addClass("d-none");
	// disability
	generalDetails.detailsDisability = setRadioValue(
		generalDetails.detailsDisability,
	);
	$(
		"input[name=candidateDisability][value=" +
			generalDetails.detailsDisability +
			"]",
	).prop("checked", true);

	if (generalDetails.detailsDisability == "Yes") {
		$("#detailsDisabilityTypeTr").removeClass("d-none");

		$("#detailsDisabilityType")
			.prop("disabled", false)

			.val(generalDetails.detailsDisabilityType);
	}

	generalDetails.detailsExServiceman = setRadioValue(
		generalDetails.detailsExServiceman,
	);
	$(
		"input[name=candidateExServiceman][value=" +
			generalDetails.detailsExServiceman +
			"]",
	).prop("checked", true);

	if (generalDetails.detailsExServiceman == "Yes") {
		$("#detailsExServicemanTr").removeClass("d-none");

		$("#detailsExServicemanYear").val(
			generalDetails.detailsExServicemanYear,
		);

		$("#detailsExServicemanMonth").val(
			generalDetails.detailsExServicemanMonth,
		);
	}

	// other type 2
	generalDetails.detailsFreedomFighterChild = setRadioValue(
		generalDetails.detailsFreedomFighterChild,
	);
	$(
		"input[name=candidateFreedomFighterChild][value=" +
			generalDetails.detailsFreedomFighterChild +
			"]",
	).prop("checked", true);

	generalDetails.detailsProjectAffected = setRadioValue(
		generalDetails.detailsProjectAffected,
	);
	$(
		"input[name=candidateProjectAffected][value=" +
			generalDetails.detailsProjectAffected +
			"]",
	).prop("checked", true);

	generalDetails.detailsEarthquakeAffected = setRadioValue(
		generalDetails.detailsEarthquakeAffected,
	);
	$(
		"input[name=candidateEarthquakeAffected][value=" +
			generalDetails.detailsEarthquakeAffected +
			"]",
	).prop("checked", true);

	generalDetails.detailsChildWifeServicemanDied = setRadioValue(
		generalDetails.detailsChildWifeServicemanDied,
	);
	$(
		"input[name=candidateChildWifeServicemanDied][value=" +
			generalDetails.detailsChildWifeServicemanDied +
			"]",
	).prop("checked", true);

	generalDetails.detailsMeritoriousSports = setRadioValue(
		generalDetails.detailsMeritoriousSports,
	);
	$(
		"input[name=candidateMeritoriousSports][value=" +
			generalDetails.detailsMeritoriousSports +
			"]",
	).prop("checked", true);

	generalDetails.detailsJDPendingInCourt = setRadioValue(
		generalDetails.detailsJDPendingInCourt,
	);
	$(
		"input[name=candidateJDPendingInCourt][value=" +
			generalDetails.detailsJDPendingInCourt +
			"]",
	).prop("checked", true);

	generalDetails.detailsJDPendingDisciplinaryOtherSimilarAction =
		setRadioValue(
			generalDetails.detailsJDPendingDisciplinaryOtherSimilarAction,
		);
	$(
		"input[name=candidateJDPendingDisciplinaryOtherSimilarAction][value=" +
			generalDetails.detailsJDPendingDisciplinaryOtherSimilarAction +
			"]",
	).prop("checked", true);

	generalDetails.detailsJDPendingDisciplinaryActionByGov = setRadioValue(
		generalDetails.detailsJDPendingDisciplinaryActionByGov,
	);
	$(
		"input[name=candidateJDPendingDisciplinaryActionByGov][value=" +
			generalDetails.detailsJDPendingDisciplinaryActionByGov +
			"]",
	).prop("checked", true);

	generalDetails.detailsJDCourtCaseFiled = setRadioValue(
		generalDetails.detailsJDCourtCaseFiled,
	);
	$(
		"input[name=candidateJDCourtCaseFiled][value=" +
			generalDetails.detailsJDCourtCaseFiled +
			"]",
	).prop("checked", true);

	generalDetails.detailsJDBlackListed = setRadioValue(
		generalDetails.detailsJDBlackListed,
	);
	$(
		"input[name=candidateJDBlackListed][value=" +
			generalDetails.detailsJDBlackListed +
			"]",
	).prop("checked", true);

	$("#detailsReligion").val(generalDetails.detailsReligion);

	// manageSammanter(1);
}

$(function () {
	if (updateData.length !== 0) {
		generalDetails.detailsPostId = updateData[0].post_id;

		generalDetails.detailsPostName = updateData[0].post_name;

		generalDetails.detailsMainPost = updateData[0].detailsMainPost;

		generalDetails.detailsbday = updateData[0].day;

		generalDetails.detailsmonth = updateData[0].month;

		generalDetails.detailsYear = updateData[0].year;

		generalDetails.detailsCategory = updateData[0].catagory;

		generalDetails.detailsSubCategory = updateData[0].detailsSubCategory;

		generalDetails.detailsGender = updateData[0].gender;

		generalDetails.detailsNonCreamyLayer =
			updateData[0].detailsNonCreamyLayer;

		generalDetails.detailsMarital = updateData[0].marital;

		generalDetails.detailsFather = updateData[0].fathers_name;

		generalDetails.detailsMother = updateData[0].mother_name;

		generalDetails.detailsSpouse = updateData[0].spouse_name;

		generalDetails.detailsAddress = updateData[0].address;

		generalDetails.detailsLineTwo = updateData[0].line_two;

		generalDetails.detailsLineThree = updateData[0].line_three;

		generalDetails.detailsDistrict = updateData[0].district;

		generalDetails.detailsTaluka = updateData[0].detailsTaluka;
		generalDetails.detailsState = updateData[0].state;

		generalDetails.detailsPin = updateData[0].pin_number;

		generalDetails.detailsChildWifeServicemanDied =
			updateData[0].detailsChildWifeServicemanDied;

		generalDetails.detailsDisability = updateData[0].detailsDisability;

		generalDetails.detailsDisabilityType =
			updateData[0].detailsDisabilityType;

		generalDetails.detailsDomicile = updateData[0].detailsDomicile;

		generalDetails.detailsEnglishLanguage =
			updateData[0].detailsEnglishLanguage;

		generalDetails.detailsEnglishLanguageRead =
			updateData[0].detailsEnglishLanguageRead;

		generalDetails.detailsEnglishLanguageSpeak =
			updateData[0].detailsEnglishLanguageSpeak;

		generalDetails.detailsEnglishLanguageWrite =
			updateData[0].detailsEnglishLanguageWrite;

		generalDetails.detailsExServiceman = updateData[0].detailsExServiceman;

		generalDetails.detailsExServicemanMonth =
			updateData[0].detailsExServicemanMonth;

		generalDetails.detailsExServicemanYear =
			updateData[0].detailsExServicemanYear;

		generalDetails.detailsFreedomFighterChild =
			updateData[0].detailsFreedomFighterChild;

		generalDetails.detailsJDBlackListed =
			updateData[0].detailsJDBlackListed;

		generalDetails.detailsJDCourtCaseFiled =
			updateData[0].detailsJDCourtCaseFiled;

		generalDetails.detailsJDPendingDisciplinaryActionByGov =
			updateData[0].detailsJDPendingDisciplinaryActionByGov;

		generalDetails.detailsJDPendingDisciplinaryOtherSimilarAction =
			updateData[0].detailsJDPendingDisciplinaryOtherSimilarAction;

		generalDetails.detailsJDPendingInCourt =
			updateData[0].detailsJDPendingInCourt;

		generalDetails.detailsMarathiLanguage =
			updateData[0].detailsMarathiLanguage;

		generalDetails.detailsMarathiLanguageRead =
			updateData[0].detailsMarathiLanguageRead;

		generalDetails.detailsMarathiLanguageSpeak =
			updateData[0].detailsMarathiLanguageSpeak;

		generalDetails.detailsMarathiLanguageWrite =
			updateData[0].detailsMarathiLanguageWrite;

		generalDetails.detailsMeritoriousSports =
			updateData[0].detailsMeritoriousSports;

		generalDetails.detailsNationality = updateData[0].detailsNationality;

		generalDetails.detailsOtherLanguage =
			updateData[0].detailsOtherLanguage;

		generalDetails.detailsOtherLanguageRead =
			updateData[0].detailsOtherLanguageRead;

		generalDetails.detailsOtherLanguageSpeak =
			updateData[0].detailsOtherLanguageSpeak;

		generalDetails.detailsOtherLanguageWrite =
			updateData[0].detailsOtherLanguageWrite;

		generalDetails.detailsProjectAffected =
			updateData[0].detailsProjectAffected;

		generalDetails.detailsReligion = updateData[0].detailsReligion;

		generalDetails.detailsEarthquakeAffected =
			updateData[0].detailsEarthquakeAffected;

		generalDetails.detailsSammanterText =
			updateData[0].detailsSammanterText;

		generalDetails.detailsSammanter = updateData[0].detailsSammanter;

		generalDetails.detailsExistingEmployee =
			updateData[0].detailsExistingEmployee;

		generalDetails.detailsExistingEmployeeDept =
			updateData[0].detailsExistingEmployeeDept;

		generalDetails.detailsExistingEmployeeDeptPost =
			updateData[0].detailsExistingEmployeeDeptPost;

		generalDetails.detailsExistingEmployeeYear =
			updateData[0].detailsExistingEmployeeYear;

		generalDetails.detailsExistingEmployeeMonth =
			updateData[0].detailsExistingEmployeeMonth;
		loadDetails();
	}

	$(".detailsMarital").on("click change", function (e) {
		var val = $(this).val();

		generalDetails.detailsMarital = val;

		if (val === "unmarried") {
			$("#detailsSpouse").val("-").prop("readonly", true);
		} else {
			$("#detailsSpouse").val("").prop("readonly", false);
		}

		$("#detailsSpouse").valid();
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

	$(".detailsGender").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsGender = val;
	});
	$(".detailsNonCreamyLayer").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsNonCreamyLayer = val;
	});

	$(document).on("click", ".detailsCategory", function (e) {
		var val = $(this).val();

		generalDetails.detailsCategory = val;

		// manageSammanter();
	});

	$("#detailsSubCategory").on("keyup blur", function (e) {
		var val = $(this).val();
		generalDetails.detailsSubCategory = val;
	});

	$("#detailsState").change(function (e) {
		var val = $(this).val();

		generalDetails.detailsState = val;
	});

	$(document).on("change", "#detailsSammanter", function (e) {
		var val = $(this).val();

		generalDetails.detailsSammanterText = $(
			"#detailsSammanter option:selected",
		).text();

		generalDetails.detailsSammanter = val;
		if (val == "2") {
			$("#detailsExServicemanTr").removeClass("d-none");
			generalDetails.detailsExServiceman = "Yes";
		} else {
			$("#detailsExServicemanTr").addClass("d-none");
			generalDetails.detailsExServiceman = "No";
		}
		$("#detailsExServicemanMonth").val(0);
		$("#detailsExServicemanYear").val(0);
	});

	$("#detailsReligion").change(function (e) {
		var val = $(this).val();

		generalDetails.detailsReligion = val;
	});

	$(".detailsNationality").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsNationality = val;
	});

	$(".detailsDomicile").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsDomicile = val;
	});

	$("#marathiRead").change(function (e) {
		var val = $(this).prop("checked");

		if (val == true) {
			generalDetails.detailsMarathiLanguageRead = 1;
		} else {
			generalDetails.detailsMarathiLanguageRead = 0;
		}
	});

	$("#marathiWrite").change(function (e) {
		var val = $(this).prop("checked");

		if (val == true) {
			generalDetails.detailsMarathiLanguageWrite = 1;
		} else {
			generalDetails.detailsMarathiLanguageWrite = 0;
		}
	});

	$("#marathiSpeak").change(function (e) {
		var val = $(this).prop("checked");

		if (val == true) {
			generalDetails.detailsMarathiLanguageSpeak = 1;
		} else {
			generalDetails.detailsMarathiLanguageSpeak = 0;
		}
	});

	$("#englishRead").change(function (e) {
		var val = $(this).prop("checked");

		if (val == true) {
			generalDetails.detailsEnglishLanguageRead = 1;
		} else {
			generalDetails.detailsEnglishLanguageRead = 0;
		}
	});

	$("#englishWrite").change(function (e) {
		var val = $(this).prop("checked");

		if (val == true) {
			generalDetails.detailsEnglishLanguageWrite = 1;
		} else {
			generalDetails.detailsEnglishLanguageWrite = 0;
		}
	});

	$("#englishSpeak").change(function (e) {
		var val = $(this).prop("checked");

		if (val == true) {
			generalDetails.detailsEnglishLanguageSpeak = 1;
		} else {
			generalDetails.detailsEnglishLanguageSpeak = 0;
		}
	});

	$("#detailsExistingEmployeeDept").on("keyup", function () {
		generalDetails.detailsExistingEmployeeDept = $(this).val();
	});

	$("#detailsExistingEmployeeDeptPost").on("keyup", function () {
		generalDetails.detailsExistingEmployeeDeptPost = $(this).val();
	});

	$("#detailsExistingEmployeeYear").on("keyup", function () {
		var value = $(this).val();

		value = Number(value.replace(/[^\d]/, ""));

		if (value > 99) {
			value = 99;
		}

		$(this).val(value);

		generalDetails.detailsExistingEmployeeYear = value;
	});

	$("#detailsExistingEmployeeMonth").on("keyup", function () {
		var value = $(this).val();

		value = Number(value.replace(/[^\d]/, ""));

		if (value > 12) {
			value = 12;
		}

		$(this).val(value);

		generalDetails.detailsExistingEmployeeMonth = value;
	});

	$("#detailsOtherLanguage").on("keyup blur", function () {
		var val = $(this).val();

		if (val === "") {
			$(".candidateDomicile").addClass("d-none");
		} else {
			$(".candidateDomicile").removeClass("d-none");
		}
	});

	$("#otherRead").change(function (e) {
		var val = $(this).prop("checked");

		if (val == true) {
			generalDetails.detailsOtherLanguageRead = 1;
		} else {
			generalDetails.detailsOtherLanguageRead = 0;
		}
	});

	$("#otherWrite").change(function (e) {
		var val = $(this).prop("checked");

		if (val == true) {
			generalDetails.detailsOtherLanguageWrite = 1;
		} else {
			generalDetails.detailsOtherLanguageWrite = 0;
		}
	});

	$("#otherSpeak").change(function (e) {
		var val = $(this).prop("checked");

		if (val == true) {
			generalDetails.detailsOtherLanguageSpeak = 1;
		} else {
			generalDetails.detailsOtherLanguageSpeak = 0;
		}
	});

	$(".detailsDisability").on("click change", function (e) {
		var val = $(this).val();

		generalDetails.detailsDisability = val;

		if (val == "Yes") {
			$("#detailsDisabilityType").prop("disabled", false);

			$("#detailsDisabilityTypeTr").removeClass("d-none").val("");
		} else {
			$("#detailsDisabilityType").prop("disabled", true).val("");

			$("#detailsDisabilityTypeTr").addClass("d-none");
		}
		generalDetails.detailsDisabilityType = "";
	});

	$("#detailsDisabilityType").on("change", function (e) {
		var val = $(this).val();

		generalDetails.detailsDisabilityType = val;
	});

	$("#detailsExistingEmployee").on("change", function (e) {
		var val = $(this).val();

		generalDetails.detailsExistingEmployee = val;

		if (val == "1") {
			$(".existenceEmployeeDetails").removeClass("d-none");
		} else {
			$(".existenceEmployeeDetails").addClass("d-none");
		}

		$("#detailsExistingEmployeeDept").val("");

		$("#detailsExistingEmployeeDeptPost").val("");

		$("#detailsExistingEmployeeYear").val(0);

		$("#detailsExistingEmployeeMonth").val(0);

		generalDetails.detailsExistingEmployeeDept = "";

		generalDetails.detailsExistingEmployeeDeptPost = "";

		generalDetails.detailsExistingEmployeeYear = 0;

		generalDetails.detailsExistingEmployeeMonth = 0;
	});

	$(".detailsExServiceman").on("click change", function (e) {
		var val = $(this).val();

		generalDetails.detailsExServiceman = val;

		if (val == "Yes") {
			$("#detailsExServicemanTr").removeClass("d-none").val("");
		} else {
			$("#detailsExServicemanTr").addClass("d-none");

			$("#detailsExServicemanYear").val("0");

			$("#detailsExServicemanMonth").val("0");
		}
	});

	$("#detailsExServicemanYear").keyup(function (e) {
		var val = Number($(this).val());

		if (val > 51) {
			generalDetails.detailsExServicemanYear = 50;

			$(this).val("50");
		} else {
			generalDetails.detailsExServicemanYear = val;
		}
	});

	$("#detailsExServicemanMonth").keyup(function (e) {
		var val = Number($(this).val());
		if (val > 12) {
			generalDetails.detailsExServicemanMonth = 12;

			$(this).val("12");
		} else {
			generalDetails.detailsExServicemanMonth = val;
		}
	});

	$(".detailsFreedomFighterChild").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsFreedomFighterChild = val;
	});

	$(".detailsProjectAffected").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsProjectAffected = val;
	});

	$(".detailsMeritoriousSports").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsMeritoriousSports = val;
	});

	$(".detailsChildWifeServicemanDied").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsChildWifeServicemanDied = val;
	});

	$(".detailsJDPendingInCourt").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsJDPendingInCourt = val;
	});

	$(".detailsJDPendingDisciplinaryOtherSimilarAction").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsJDPendingDisciplinaryOtherSimilarAction = val;
	});

	$(".detailsJDPendingDisciplinaryActionByGov").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsJDPendingDisciplinaryActionByGov = val;
	});

	$(".detailsJDCourtCaseFiled").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsJDCourtCaseFiled = val;
	});

	$(".detailsJDBlackListed").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsJDBlackListed = val;
	});

	$(".detailsEarthquakeAffected").click(function (e) {
		var val = $(this).val();

		generalDetails.detailsEarthquakeAffected = val;
	});

	/* $('#detailsPost').change(function(e){

        var val = $(this).val();

            generalDetails.detailsPostId = postList[val].id;

            generalDetails.detailsPostName = postList[val].name;

    });*/

	$("#verifyPersonalDetails").on("click", function (e) {
		e.preventDefault();
		validate;
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
	});

	var validate = $("#generalDetailsForm").validate({
		rules: {
			detailsFather: {
				required: true,
				lettersonly: true,
			},

			detailsMother: {
				required: true,

				lettersonly: true,
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
			},

			detailsAddress: {
				required: true,
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
				lettersonly: true,
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

			candidateSammnater: {
				required: true,

				min: 1,
			},

			candidateDetailsNonCreamyLayer: {
				required: true,
			},
			candidateSubCategory: {
				required: true,
			},
		},

		messages: {
			detailsPin: {
				required: "&nbsp;Enter Pin Code.",

				number: "&nbsp;Invalid Pin Code.",

				minlength: "&nbsp;Pin Code Must Be {0} Digits.",

				maxlength: "&nbsp;Pin Code Must Be At Least {0} Digits.",
			},

			detailsFather: {
				required: "&nbsp;Enter Father's Name.",
				lettersonly: "&nbsp;Invalid Father's Name.",
			},

			detailsMother: {
				required: "&nbsp;Enter Mother's Name.",

				lettersonly: "&nbsp;Invalid Mother's Name.",
			},

			candidateGender: {
				required: "&nbsp;Select Gender",
			},

			candidateMaritalStartus: {
				required: "&nbsp;select Marital Status.",
			},

			candidateCategory: {
				required: "&nbsp;select Category.",
			},

			candidateDetailsNonCreamyLayer: {
				required: "&nbsp;select Non Creamy Layer.",
			},
			detailsbday: {
				require: "&nbsp;select a Day.",

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
				lettersonly: "&nbsp;Invalid Spouse Name.",
			},

			detailsAddress: {
				required: "&nbsp;enter Address.",
			},

			detailsState: {
				required: "&nbsp;select State.",
			},

			detailsDistrict_1: {
				required: "&nbsp;Enter District Name.",

				lettersonly: "&nbsp;Invalid District Name.",
			},

			detailsDistrict: {
				required: "&nbsp;Enter District Name.",

				lettersonly: "&nbsp;Invalid District Name.",
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
				required: "&nbsp;Select The Option",
			},

			candidateSammnater: {
				required: "&nbspकृपया समान्तर आरक्षण निवडा",

				min: "&nbsp;कृपया समान्तर आरक्षण निवडा",
			},
			candidateSubCategory: {
				required: "&nbsp;Enter Sub Category",
			},
		},

		errorPlacement: function (error, element) {
			if (element.is(".detailsMarital")) {
				error.appendTo(element.parents(".candidateMaritalStartus"));
			} else {
				if (element.is(".detailsCategory")) {
					error.appendTo(element.parents(".categoryTypeMain"));
				} else {
					if (element.is(".birth_date")) {
						error.appendTo(element.parents(".birthMessage"));
					} else {
						if (element.is(".detailsGender")) {
							error.appendTo(element.parents(".candidateGender"));
						} else {
							if (element.is(".detailsNonCreamyLayer")) {
								error.appendTo(
									element.parents(
										".candidateDetailsNonCreamyLayer",
									),
								);
							} else {
								let e = $(element).parent("div").parent("td");
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

			if (element.is(".detailsSpouse"))
				error.appendTo(element.parents(".spouce-name-container"));
			if (element.is(".detailsMarathiLanguage"))
				error.appendTo(element.parents(".candidateMarathiLanguage"));

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
				error.appendTo(element.parents("#setDistInput"));
			}

			$("label[class='error']").addClass(
				"text-danger font-weight-bolder",
			);
		},
	});

	$("#submitPersonalDetails").click(function (e) {
		console.log(generalDetails, "-save details");
		validate;
		e.preventDefault();
		if (!$("#generalDetailsForm").valid()) {
			$("label[class='error']").addClass(
				"text-danger font-weight-bolder",
			);

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
			var $this = $("#submitPersonalDetails");

			getData(function (type) {
				if (type == false) {
					return false;
				}

				$this

					.prop("disabled", true)

					.html(
						`<i class="fa-solid fa-floppy-disk mr-2" aria-hidden="true"> Saving Details...   </i>`,
					);

				$.ajax({
					method: "post",

					url: "/save-general-details",

					data: generalDetails,
				})

					.done(function (data) {
						$this

							.prop("disabled", false)

							.html(
								`<i class="fa-solid fw-bold fa-floppy-disk mr-2" aria-hidden="true"> Submit  </i>`,
							);

						var json_data = data;

						if (json_data._call == 1) {
							switch (json_data.type) {
								case "add":
									generalDetails.cfi = json_data.form_id;

									alertjs.success(
										{
											t: "Personal Details Added Successfully",

											m: "",
										},

										function () {
											window.location.assign(
												"/education-details/" +
													generalDetails.regString,
											);
										},
									);

									break;

								default:
									alertjs.success(
										{
											t: "Personal Details Updated Successfully",

											m: "",
										},

										function () {
											window.location.assign(
												"/education-details/" +
													generalDetails.regString,
											);
										},
									);

									break;
							}
						}
					})

					.fail(function (error) {
						$this

							.prop("disabled", false)

							.html(
								`<i class="fa-solid fa-floppy-disk mr-2" aria-hidden="true"> Submit  </i>`,
							);

						alertjs.error(function () {
							console.log(error);
						});
					})

					.always(function () {
						console.log("Done");
					});
			});
		}
	});

	$("#detailsPost").change(function (e) {
		// manageSammanter();

		if ($(this).val() == "-1") {
			$(".card").addClass("d-none");

			return false;
		}

		var val = $(this).val();

		var main_post = $("#detailsMainPost").val();

		var subList = postList.filter(function (element) {
			return element.main_post_name == main_post && element.name == val;
		});

		if (subList.length == 0) {
			alertjs.warning(
				{
					t: "Warning",
					m: "Improper Selection ... try again.",
				},
				function () {},
			);
			$(this).val("-1");

			return false;
		}

		var send_data = { post_name: subList[0].id };

		$.ajax({
			method: "post",

			url: "/check-for-post-details",

			data: send_data,
		})

			.done(function (data) {
				var json_data = data;

				switch (json_data._call) {
					case 1:
						generalDetails.detailsPostId = subList[0].id;

						generalDetails.detailsPostName = subList[0].name;
						/* cast handling */
						generalDetails.detailsCategory = "";
						$(".card").removeClass("d-none");
						break;

					case 2:
						generalDetails.detailsPostId = "";

						generalDetails.detailsPostName = "";

						alertjs.warning(
							{
								t: "You have already applied for this post",

								m: "",
							},

							function () {
								$(".card").addClass("d-none");

								$("#detailsPost").val("-1");
							},
						);

						break;

					default:
						alertjs.warning(
							{
								t: "Session Expires Login Again.",

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
				alertjs.error(function () {
					console.log(error);
				});
			})

			.always(function () {
				console.log("Done");
			});
	});
});

function getData(callback) {
	generalDetails.detailsFather = $("#detailsFather").val();

	generalDetails.detailsMother = $("#detailsMother").val();

	generalDetails.detailsSpouse = $("#detailsSpouse").val();

	generalDetails.detailsLineTwo = $("#detailsLineTwo").val();

	generalDetails.detailsLineThree = $("#detailsLineThree").val();

	generalDetails.detailsAddress = $("#detailsAddress").val();

	generalDetails.detailsDistrict = $("#detailsDistrict").val();
	generalDetails.detailsTaluka = $("#detailsTaluka").val();

	generalDetails.detailsPin = $("#detailsPin").val();

	// generalDetails.detailsOtherLanguage = $('#detailsOtherLanguage').val()
	generalDetails.detailsOtherLanguage = "Hindi";

	generalDetails.detailsExServicemanYear = $(
		"#detailsExServicemanYear",
	).val();

	generalDetails.detailsExServicemanMonth = $(
		"#detailsExServicemanMonth",
	).val();

	var send_data = { post_name: generalDetails.detailsPostId };

	if (is_new == true) {
		$.ajax({
			method: "post",

			url: "/check-for-post-details",

			data: send_data,
		})

			.done(function (data) {
				var json_data = data;

				switch (json_data._call) {
					case 1:
						callback(true);

						break;

					case 2:
						alertjs.warning(
							{
								t: "You have already applied for this post.",

								m: "",
							},

							function () {
								$(".card").addClass("d-none");

								callback(false);
							},
						);

						break;

					default:
						alertjs.warning(
							{
								t: "Session Expires Login Again.",

								m: "",
							},

							function () {
								callback(false);

								window.location.replace("/");
							},
						);

						break;
				}
			})

			.fail(function (error) {
				alertjs.error(function () {
					console.log(error);

					callback(false);
				});
			})

			.always(function () {
				console.log("Done");

				callback(false);
			});
	} else {
		callback(true);
	}
}
