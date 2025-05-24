// const tooltipTriggerList = document.querySelectorAll(
// 	'[data-bs-toggle="tooltip"]'
// )

var university = ["State Board", "CBSE", "ICSE", "Other"];

var university_list_for_diploma_and_graduation = [
	"State Board",
	"CBSE",
	"ICSE",
	"Bharati Vidyapeeth, Pune",
	"Indian Institute of Banking and Finance (IIBF)",
	"Central Institute of Fisheries Education, Varsova, Mumbai",
	"Maharashtra Knowledge Corporation Limited (MKCL)",

	"D.Y.Patil Education Society, Kolhapur",

	"Datta Meghe Institute of Medical Sciences, Nagpur",

	"Deccan College Post Graduate and Research Institute, Pune",

	"Dr. Babasaheb Ambedkar Marathwada University, Aurangabad",

	"Dr. Babasaheb Ambedkar Technological University, Lonere, Raigad",

	"Dr. D.Y.Patil Vidyapeeth, Pimpri, Pune",

	"Dr. Panjabrao Deshmukh Krishi Vidyapeeth, Krishi Nagar, Akola",

	"Gokhale Institute of Politics & Economics, Shivajinagar, Pune",

	"Homi Bhabha National Institute, Bhabha Atomic Research Centre, Mumbai",

	"Indian Institute of Technology Mumbai, Powai, Mumbai",

	"Indira Gandhi Institute of Development Research, Mumbai",

	"Institute of Armament Technology, Girinagar, Pune",

	"International Institute for Population Sciences, Govandi Station Road, Deonar, Mumbai",

	"Kavikulguru Kalidas Sanskrit Vishwavidyalaya, Ramtek, Nagpur",

	"Konkan Krishi Vidyapeeth, Dapoli, Ratnagiri",

	"Krishna Institute of Medical Sciences, Karad, Satara.",

	"Maharashtra Animal and Fishery Sciences University, Seminary Hills, Nagpur",

	"Maharashtra University of Health Sciences, Gangapur Road, Anandvali, Nasik",

	"Mahatma Gandhi Antarrashtriya Hindi Vishwavidyalaya, Wardha",

	"Mahatma Phule Krishi Vidyapeeth, Rahuri, Ahmednagar",

	"Marathwada Krishi Vidyapeeth, Parbhani",

	"Punyashlok Ahilyadevi Holkar Solapur University, Solapur",

	"Rashtrasant Tukadoji Maharaj Nagpur University, Nagpur",

	"Narsee Monjee Institute of Management Studies, Mumbai",

	"North Maharashtra University, Jalgaon",

	"Padmashree Dr. D.Y.Patil Vidyapeeth, Navi Mumbai",

	"Pravara Institute of Medical Sciences, Ahmednagar",

	"Sant Gadge Baba Amravati University, Amravati",

	"Savitribai Phule Pune University, Pune",

	"Shivaji University, Vidyanagar, Kolhapur",

	"S.N.D.T. Womens University, Mumbai",

	"Swami Ramanand Teerth Marathwada University, Nanded",

	"Symbiosis International Education Centre, Pune",

	"Tata Institute of Fundamental Research, Homi Bhabha Road, Mumbai",

	"Tata Institute of Social Sciences, Mumbai",

	"Tilak Maharashtra Vidyapeeth, Gultekadi, Pune",

	"University of Mumbai, Mumbai",

	"Visvesvaraya National Institute of Technology, Nagpur",

	"Yashwant Rao Chavan Maharashtra Open University, Dyangangotri,Nashik",

	"AMIE",

	"UGC",

	"IME",

	"Town Planning Institute, London",

	"IIT Chennai",

	"Fellowship of College of Physicians and Surgeons Mumbai",

	"Maharashtra State Board of Technical Education",

	"VAMNICOM",

	"VJTI",

	"AMAESI",

	"ICWAI",

	"Institute of Chemical Technology, Nathalal Parekh Marg, Matunga, Mumbai",

	"MGM INSTITUTE OF HEALTH SCIENCES, NAVI MUMBAI",

	"Maharashtra Nursing Council,Mumbai",

	"Gondwana University",

	"Maharashtra State Examination Board Pune",
	"Other",
];
var listOf = {
	//diplomaSpecialization
	diploama_specilization: [
		"Art Teacher Diploma",

		"D. Lib",

		"Advanced Leather Goods and Footwear Manufacture",

		"Agricultural Science",

		"Animation",

		"Applied Art",

		"Applied Geology",

		"Architecture",

		"Architecture Assistantship",

		"Automobile Engineering",

		"Auxiliary Nurse Midwifery",

		"Chemical Engineering",

		"Chemical Technology",

		"Civil & Rural Engineering",

		"Civil Engineering",

		"Civil Engineering (Sand-witch Pattern)",

		"Civil Engineering and Rural Construction",

		"Computer Engineering",

		"Computer Engineering (Ind./Int.)",

		"Computer Technology",

		"Construction Technology",

		"D.Ed",

		"D.T.Ed",

		"Digital Electronics",

		"Diploma in Nursing",

		"Drawing and Painting",

		"Dress Designing Manufacturing",

		"Electrical Engineering",

		"Electrical Power System",

		"Electronics",

		"Electronics and Communication",

		"Electronics and Communication Engineering (Industry Integrated)",

		"Electronics and Radio Engineering",

		"Electronics and Tele-communication Engineering",

		"Electronics and Video Engineering",

		"Electronics Engineering",

		"Electronics Engineering (Industry Integrated)",

		"Environmental",

		"Fabrication & Erection Engineering",

		"Fabrication Tech. & Erection Engineering (Sand-witch Pattern)",

		"Fabrication Technology",

		"Fashion and Clothing Technology",

		"Fine Arts",

		"Fire Safety and Industrial Environmental Engineering",

		"Food Technology",

		"Garment Technology",

		"General Nursing and Midwifery",

		"Geology",

		"Hotel Management and Catering Technology",

		"Industrial Electronics",

		"Industrial Electronics (Sand-witch Pattern)",

		"Information Technology",

		"Instrumentation",

		"Instrumentation and Control",

		"Knitting Technology",

		"Leather Goods and Footwear Tech.",

		"Leather Technology",

		"Library Science",

		"LiveStock Management & Dairy Production",

		"Local Government Service Diploma (L.G.S.)",

		"Machine Tools and Maintenance Engineering",

		"Man-made Fiber Manufacture",

		"Man-made Textile Chemistry",

		"Man-made Textile Technology",

		"Marine Engineering",

		"Mass Communication and Journalism",

		"Mechanical Engineering",

		"Mechanical Engineering (Industry Integrated)",

		"Mechanical Engineering (Sand-witch Pattern)",

		"Medical Electronics",

		"Medical Laboratory Technology",

		"Metallurgy",

		"Mine Engineering",

		"Mining & Mine Surveying",

		"Music",

		"Optometry",

		"Packaging Technology",

		"Pharmacy",

		"Plant Engineering",

		"Plastic Engineering",

		"Printing Technology",

		"Printing Technology In Letterpress Printing",

		"Printing Technology In offset",

		"Production Engineering",

		"Production Technology",

		"Production Technology (Sand-witch Pattern)",

		"Rural Engineering",

		"Rural Reconstruction",

		"Sculpture and Modeling",

		"Surface Coating Technology",

		"Tailoring and Cutting",

		"Textile Manufactures",

		"Textile Technology",

		"Transportation",

		"Travel and Tourism",
		"Other",
	],

	//itiSpecialization
	iti_specilization: [
		"Advanced Leather Goods and Footwear Manufacture",
		"Agricultural Science",
		"Agriculture",
		"Applied Art",
		"Applied Geology",

		"Architecture",

		"Architecture Assistantship",

		"Automobile Engineering",

		"Boiler Attendant",

		"Carpenter",

		"Catering",

		"Chemical Engineering",

		"Chemical Laboratory",

		"Chemical Technology",

		"Civil & Rural Engineering",

		"Civil Engineering",

		"Civil Engineering (Sand-witch Pattern",

		"Computer Engineering",

		"Computer Engineering (Ind./Int.)",

		"Computer Hardware",

		"Computer Science",

		"Computer Technology",

		"Construction Technology",

		"Crane Operator",

		"Diesel Mechanic",

		"Digital Electronics",

		"Drawing and Painting",

		"Dress Designing Manufacturing",

		"Electrical",

		"Electrical Power System",

		"Electrician",

		"Electronics",

		"Electronics & Comm.",

		"Electronics & Tele Comm.",

		"Electronics and Communication Engineering (Industry Integrated",

		"Electronics and Video Engineering",

		"Electronics Engineering",

		"Electronics Engineering (Industry Integrated)",

		"Electronics Mechanic",

		"Fabrication & Erection Engineering",

		"Fabrication Tech. & Erection Engineering (Sand-witch Pattern)",

		"Fabrication Technology",

		"Fashion and Clothing Technology",

		"Fire Safety and Industrial Environmental Engineering",

		"FITTER",

		"Food Technology",

		"Garment Technology",

		"Geology",

		"Hospital Administration",

		"Hotel Management and Catering Technology",

		"Industrial Electronics",

		"Industrial Electronics (Sand-witch Pattern)",

		"Industrial Safety",

		"Information Technology",

		"Information Technology and Electronic Systems Maintenance",

		"Instrumentation",

		"Instrumentation and Control",

		"Instrumentation Engineering",

		"Instrument-Mechanic",

		"Knitting Technology",

		"Laboratory",

		"Laboratory – Technician",

		"Leather Goods and Footwear Tech.",

		"Leather Technology",

		"Library",

		"Library Science",

		"Machine Tools and Maintenance Engineering",

		"Machinist",

		"Man-made Fiber Manufacture",

		"Man-made Textile Chemistry",

		"Man-made Textile Technology",

		"Marine Engineering",

		"Mason",

		"Mechanic cum Dozer Operator",

		"Mechanic Radio and Television",

		"Mechanical Draughtsman",

		"Mechanical Engineering",

		"Mechanical Engineering (Industry Integrated)",

		"Mechanical Engineering (Sand-witch Pattern)",

		"Mechanic-cum-Operator Electronic Communication System",

		"Medical Electronics",

		"Medical Lab Technician",

		"Medical Laboratory Technology",

		"Metallurgy",

		"Mine Engineering",

		"Mining & Mine Surveying",

		"Motor mechanic",

		"Nursing",

		"Nursing & Mid-wifery (3 Years Course",

		"Packaging Technology",

		"Painter",

		"Pharmacy",

		"Plant Engineering",

		"Plastic Engineering",

		"Printing Technology",

		"Printing Technology In Letterpress Printing.",

		"Printing Technology In offset",

		"Process",

		"Process/Plant Operator",

		"Production Engineering",

		"Production Technology",

		"Production Technology (Sand-witch Pattern)",

		"Refrigerator and AC Mechanic",

		"Safety",

		"Sculpture and Modeling",

		"Sheet Metal",

		"Surface Coating Technology",

		"Textile Manufactures",

		"Textile Technology",

		"Travel and Tourism",

		"Turner",

		"Welder",

		"Wireless Mechanic cum Operator",

		"Wireman",

		"Other",
	],

	//graduation Specialization
	graduation_specilization: [
		"B.Com - Finanace",
		"B.Com - Banking",
		"B.Com - Marketing",
		"B.Com",
		"C.A.",
		"C.S.",
		"I.C.W.A",
		"Chartered Accountant",

		"AITP",

		"AMIE",

		"Armed Forces Graduation",

		"B.Pharma.",

		"B.A.",

		"B.A.(Social Science",

		"B.A.A.",

		"B.A.B.Ed. Integrated",
		"B.A.F.",
		"B.A.M.S.",

		"B.A.S.L.P.",

		"B.Arch",

		"B.B.A.",
		"B.B.I.",

		"B.B.M.",

		"B.B.S.",

		"B.C.A.",

		"B.C.M.",

		"B.D.S.",

		"B.E.",

		"B.E.-Computer/I.T.",
		"B.E.-Electronics & Telecommunication",

		"B.Ed.",

		"B.F.A.",

		"B.F.Sc.",

		"B.H.M.S",

		"B.Hotel Management",

		"B.L.S. LL.B",

		"B.Lib",

		"B.M.S.",

		"B.O.Th.",

		"B.P.E.(Bachelor of Physical Education",

		"B.P.Ed.",

		"B.P.M.T.",

		"B.P.O.",

		"B.P.T.",

		"B.P.Th.",

		"B.S.L.L.B.",

		"B.S.L.L.L.B.",

		"B.Sc",
		"B.Sc - I.T.",

		"B.Sc (Agriculture)",

		"B.Sc(Tech)",

		"B.Sc. HLS",

		"B.Tech Agri.",

		"B.Tech.",

		"B.Tech. Dairy Technology",

		"B.U.M.S.",

		"B.V.Sc.",

		"B.V.Sc. A.H.",

		"B.Voc(Bachelor of Vocation)",

		"Bachelor of Communication and Journalism(BCJ)",

		"Bachelor of Fashion Design",

		"Bachelor of Hotel Management & Catering Technology",

		"Bachelor of Journalism",

		"Bachelor of Journalism and Mass Communication(BJMC)",

		"Bachelor of Mass Communication",

		"Bachelor of Mass Media (BMM)",

		"Bachelor of Social Law (B.S.L.)",

		"Bachelor of Social Legislation (B.S.L.)",

		"BCS",

		"BLS",

		"BSW",

		"Dance",

		"Institution of Cost and Works Accounts of India(ICWAI)",

		"L.L.B.",

		"M.B.B.S.",

		"Music",

		"Optometry",

		"Singing",

		"Other",
	],
	//post graduation Specialization
	post_graduation_specilization: [
		"M.Com - Finanace",
		"M.Com - Banking",
		"M.Com - Marketing",
		"M.Com",
		"MBA - Finanace",
		"MBA - Banking",
		"MBA - Marketing",
		"M.Economics",
		"MBA - Finance (Full Time)",
		"M.C.A.",
		"A.M",

		"D.M.",

		"D.N.B.",

		"D.Sc.",

		"L.L.M.",

		"M. Com.",

		"M. Pharma.",

		"M.A.",

		"M.A. Education",

		"M.A. -M.S.W.",

		"M.A.S.L.P.",

		"M.Arch.",

		"M.B.A.",

		"M.Ch.",

		"M.D.",

		"M.D.S.",

		"M.E.",

		"M.Ed.",

		"M.F.A.",

		"M.J.",

		"M.J.M.C",

		"M.Lib",

		"M.Lib.Sci.",

		"M.P.Ed.",

		"M.P.T.",

		"M.P.Th.",

		"M.Pharmacy",

		"M.S.",

		"M.S. Unani",

		"M.S.W.",

		"M.S.W. – Mgmt",

		"M.Sc.",

		"M.Sc. (Agri.)",

		"M.Sc. (Tech.)",

		"M.Sc.(Nursing)",

		"M.Tech (Agri.)",

		"M.Tech.",

		"M.Tech. (Agri.)",

		"M.V.Sc",

		"Master in Business Management(M.B.M)",

		"Master in Business Studies (M.B.S)",

		"Master in Management Services (M.M.S)",

		"Master in Public Health",

		"Master of Communication and Journalism(MCJ)",

		"Master of Computer Management",

		"MASTER OF COMPUTER MANAGEMENT",

		"Master of Planning in Infrastructure Planning & Management",

		"Masters in Personal management (MPM)",

		"MLS",

		"MSc.Tech.",

		"Town Planning",

		"Town Planning or Equivalent From Relevant Recognized Institute",

		"Urban Planning",

		"Other",
	],
	//computer certification Specialization
	computer_certification_specilization: ["MSCIT", "CCC", "OTHER"],

	// professional qualification specilization
	professional_qualification_specilization: [
		"CCISO",
		"CISM",
		"CCISO",
		"CISA",
		"JAIIB",
		"CAIIB",
		"G.D.C&A",
		"Diploma in Co-Operative Business Management",
		"Diploma in Co-Operative Management",
		"Institute of Banking & Training (IIBF)",
		"Other",
	],

	// typing specilization list
	// list_9: ['Above @ 40 W.P.M. (English)', 'Above @ 30 W.P.M. (Marathi)'],
};

const TENTH_DETAILS = {
	specilization: ["SSC/10th"],
	institue: ["State Board", "CBSE", "ICSE", "Other"],
};

const TWELVETH_DETAILS = {
	specilization: ["HSC/12th"],
	institue: ["State Board", "CBSE", "ICSE", "Other"],
};

const DIPLOMA_DETAILS = {
	specilization: [...listOf.diploama_specilization],
	institue: [...university_list_for_diploma_and_graduation],
};

const ITI_DETAILS = {
	specilization: [...listOf.iti_specilization],
	institue: [...university_list_for_diploma_and_graduation],
};

const GRADUATION_DETAILS = {
	specilization: [...listOf.graduation_specilization],
	institue: [...university_list_for_diploma_and_graduation],
};

const POST_GRADUATION_DETAILS = {
	specilization: [...listOf.post_graduation_specilization],
	institue: [...university_list_for_diploma_and_graduation],
};

const COMPUTER_CERTIFICATION_DETAILS = {
	specilization: [...listOf.computer_certification_specilization],
	institue: [...university_list_for_diploma_and_graduation],
};

const PROFESSIONAL_CERTIFICATION_DETAILS = {
	specilization: [...listOf.professional_qualification_specilization],
	institue: [...university_list_for_diploma_and_graduation],
};

const TYPING_SPECILIZATION_DETAILS = {
	specilization: [
		"Above @ 40 W.P.M. (English)",
		"Above @ 30 W.P.M. (Marathi)",
		"Other",
	],
	institue: [
		"GOVERNMENT CERTIFICATE IN COMPUTER TYPING BASIC COURSE",
		"Other",
	],
};
const SSC_10TH = 1;
const HSC_12TH = 2;
const DIPLOMA = 3;
const ITI = 4;
const GRADUATION = 5;
const POST_GRADUATION = 6;
const COMPUTER_CERTIFICATION = 7;
const PROFESSIONAL_QUALIFICATION = 8;
const OTHER = 9;
const TYPING_CERTIFICATION = 10;

const month = [
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

(function () {
	// set qualification options dropdown qulification
	let qualification = [..._eduTypes];
	let option = qualification
		.map(function (qualify) {
			return `<option value="${qualify.id}">${qualify.edu_name}</option>`;
		})
		.join("");
	option = `<option value="">---Select Education---</option>` + option;
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
$("#newEducation").validate({
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
		eduMarksOutOf: {
			required: true,
			number: true,
		},
		eduMarksGain: {
			required: true,
			number: true,
		},

		eduClass: {
			required: true,
		},
	},

	messages: {
		eduSpecialization: {
			required: "Select Specialization",
		},
		eduUniversity: {
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

		eduClass: {
			required: "Select Class",
		},
	},

	errorPlacement: function (error, element) {
		let e = $(element).parent("div");
		error.appendTo(e);
		// error.insertAfter(element);

		$("label[class='error']").addClass("text-danger font-weight-bolder");
	},
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
			handle_other_university_selection_for_manual_percentge_input();
		} else {
			is_other_selected_university = false;
			$(".manual-school-university-input").addClass("d-none");
			handle_other_university_selection_for_manual_percentge_input();
		}
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

let newMonth = month
	.map(function (m) {
		return `<option value="${m}">${m}</option>`;
	})
	.join("");
newMonth = `<option value="">--- Select ---</option>` + newMonth;
$("#newMonth,#newOtherMonth").html(newMonth);
let date = new Date();
date = date.getFullYear();
for (let index = 1980; index <= date; index++) {
	$("#newYear,#newOtherYear").append(
		`<option value="${index}">${index}</option>`,
	);
}

function setGrades() {
	const grades = ["Distinction", "First Class", "Second Class", "Pass Class"];
	let gradesHtml = grades.map(grade => {
		return `<option value='${grade}'>${grade}</option>`;
	});
	gradesHtml = `<option value=''>--- Select ---</option>` + gradesHtml;
	$(".greadClass").html(gradesHtml);
}

$("#qualificationList").on("change", function () {
	let selected_qualification_for_details_add = +$(this).val();
	console.log(selected_qualification_for_details_add, "-+");

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
	specilization_list_dropdown =
		`<label for="" class="input-label-title">Course</label>` +
		`<br/>` +
		`<label for="" class="input-label-title">(कोर्स)</label>` +
		`<select class='form-input form-control input-element input-sm' id='newSpecialization' name="eduSpecialization" >` +
		`<option value='-1'>-- Select --</option>` +
		specilization_list_dropdown +
		`</select>` +
		`<input class='input-element input-sm d-none mt-3 manual-specilization-input' type='text' placeholder='Enter Specilization'/>`;

	$(".edu-specilization-dropdown").html(specilization_list_dropdown);
}

function make_institue_dropdown(institute_list) {
	let institute_list_dropdown = institute_list.map(institute_name => {
		return `<option value='${institute_name}'>${institute_name}</option>`;
	});
	institute_list_dropdown =
		`<label for="" class="input-label-title">Board / University</label>` +
		`<br/>` +
		`<label for="" class="input-label-title">(बोर्ड/विद्यापीठ)</label>` +
		`<select class='form-input form-control input-element input-sm' id='newUniversity' name="eduUniversity" >` +
		`<option value='-1'>-- Select --</option>` +
		institute_list_dropdown +
		`</select>` +
		`<input class='input-element input-sm d-none mt-3 manual-school-university-input' type='text' placeholder='Board/University Name'/>`;

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
		$("#newQualification .modal-title").html("SSC_10TH");

		make_specilization_dropdown(TENTH_DETAILS.specilization);
		make_institue_dropdown(TENTH_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === HSC_12TH) {
		$("#newQualification").modal("show");
		$("#newQualification .modal-title").html("HSC_12TH");

		make_specilization_dropdown(TWELVETH_DETAILS.specilization);
		make_institue_dropdown(TWELVETH_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === DIPLOMA) {
		$("#newQualification").modal("show");
		$("#newQualification .modal-title").html("DIPLOMA");

		make_specilization_dropdown(DIPLOMA_DETAILS.specilization);
		make_institue_dropdown(DIPLOMA_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === ITI) {
		$("#newQualification").modal("show");
		$("#newQualification .modal-title").html("ITI");

		make_specilization_dropdown(ITI_DETAILS.specilization);
		make_institue_dropdown(ITI_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === GRADUATION) {
		$("#newQualification").modal("show");
		$("#newQualification .modal-title").html("GRADUATION");

		make_specilization_dropdown(GRADUATION_DETAILS.specilization);
		make_institue_dropdown(GRADUATION_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === POST_GRADUATION) {
		$("#newQualification").modal("show");
		$("#newQualification .modal-title").html("POST_GRADUATION");

		make_specilization_dropdown(POST_GRADUATION_DETAILS.specilization);
		make_institue_dropdown(POST_GRADUATION_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === COMPUTER_CERTIFICATION) {
		$("#newQualification").modal("show");
		$("#newQualification .modal-title").html("COMPUTER_CERTIFICATION");

		make_specilization_dropdown(
			COMPUTER_CERTIFICATION_DETAILS.specilization,
		);
		make_institue_dropdown(COMPUTER_CERTIFICATION_DETAILS.institue);
	}

	if (
		+qualification_selected_for_add_details === PROFESSIONAL_QUALIFICATION
	) {
		$("#newQualification").modal("show");
		$("#newQualification .modal-title").html("PROFESSIONAL_QUALIFICATION");

		make_specilization_dropdown(
			PROFESSIONAL_CERTIFICATION_DETAILS.specilization,
		);
		make_institue_dropdown(PROFESSIONAL_CERTIFICATION_DETAILS.institue);
	}

	if (+qualification_selected_for_add_details === OTHER) {
		$("#newOtherQualification").modal("show");
		$("#newOtherQualification .modal-title").html("Other Qualification");
	}

	if (+qualification_selected_for_add_details === TYPING_CERTIFICATION) {
		$("#newQualification").modal("show");
		$("#newQualification .modal-title").html("Typing certification");

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
		let _formData = {};
		formData.forEach(function (obj) {
			_formData[obj.name] = obj.value;
		});
		// if (isFound.id === 5) {
		// 	let value = Number($('#percent').val())
		// 	if (value < 50) {
		// 		alertjs.warning(
		// 			{
		// 				t: 'Warning',
		// 				m: 'Minimum 50% are mandatory in Graduation.',
		// 			},
		// 			function () {}
		// 		)
		// 		return false
		// 	}

		// 	if ($('#graduationCheckBox').prop('checked') === false) {
		// 		alertjs.warning(
		// 			{
		// 				t: 'Warning',
		// 				m: 'It is mandatory to complete the Graduation in First Attempt.',
		// 			},
		// 			function () {}
		// 		)
		// 		return false
		// 	}
		// }
		_formData["id"] = Number(isFound.id);
		_formData["name"] = isFound.name;

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

					m: "Education details added successfully.",
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
	$(".manual-school-university-input").addClass("d-none");
	$(".manual-specilization-input").addClass("d-none");
	is_other_selected_university = false;
	is_other_selected_specilization = false;
});

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
	let tr = "";
	if (list.length === 0) {
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
                    <td class='input-label-title'>${li.name}</td>
                    <td class='input-label-title'>${li.eduSpecialization}</td>
                    <td class='input-label-title' class="word">${
						li.eduUniversity
					}</td>
                    <td class='input-label-title'>${
						li.eduPercent === "" ? "-" : li.eduPercent + " %"
					} </td>
                    <td class='input-label-title'>${li.eduClass}</td>
                    <td class='input-label-title'>${
						li.eduMonth
					} ${li.eduYear}</td>
                    <td class="small input-label-title">
                      <button class="remove-education btn btn-danger" data-id=${index} data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Delete">
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>`;
			})
			.join("");
	}
	$("#educationTbody").html(tr);

	const __tooltipList = $('[data-bs-toggle="tooltip"]');

	console.log(__tooltipList);
	const tooltipList = [...__tooltipList].map(
		tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl),
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
	// check 10th
	if (postDetails.post_tenth === 1) {
		let isFound = checkForData(1);
		if (!isFound) {
			alertjs.warning(
				{
					t: "Warning",
					m: "SSC/10th is compulsory for this post.",
				},
				function () {},
			);
			return false;
		}
	}

	// check gd
	if (postDetails.post_graduation === 1) {
		let isFound = checkForData(5);
		if (!isFound) {
			alertjs.warning(
				{
					t: "Warning",
					m: "Graduation is compulsory for this post.",
				},
				function () {},
			);
			return false;
		} else {
			let isFound = checkForData(2);
			let isFound_1 = checkForData(3);
			if (isFound === true || isFound_1 == true) {
			} else {
				alertjs.warning(
					{
						t: "Warning",
						m: "add HSC/12th or Diploma Qualification",
					},
					function () {},
				);
				return false;
			}
		}
	}

	if (postDetails.post_com_citification === 1) {
		let isFound = checkForData(7);
		if (!isFound) {
			alertjs.warning(
				{
					t: "Warning",
					m: "Computer certification course is compulsory for this post.",
				},
				function () {},
			);
			return false;
		}
	}
	upload_candiate_education_data();

	// check_education_qualification_criteria(
	// 	saveQualificationList,
	// 	(status, allowedList) => {
	// 		console.log(status)
	// 		if (!status) {
	// 			console.log(allowedList,'allowed list')
	// 			if (allowedList.length > 0) {
	// 				printAllowedQualificationTable(allowedList)
	// 				$('#allowed-qualification-list-modal').modal('show')
	// 			}
	// 			// alertjs.warning(
	// 			// 	{
	// 			// 		t: 'Following qualifications are allowed.',
	// 			// 		m: allowedList,
	// 			// 	},
	// 			// 	() => {}
	// 			// )
	// 			return false
	// 		} else {
	// 			upload_candiate_education_data()
	// 		}
	// 	}
	// )
});

// function printAllowedQualificationTable(list) {
// 	let _tr = list.map((el, i) => {
// 		return `<tr>
// 				<td>${i + 1}</td>
// 				<td>${el}</td>
// 			</tr>`
// 	})
// 	$('.allowd-qualification-list-table-body').html(_tr)
// }

function check_is_allow_to_skip_experience(qualificationList) {
	let candidatesSelectedPost = postDetails.name;
	const allowdPostForSkipExperience = ["शाखा व्यवस्थापक"];
	if (!allowdPostForSkipExperience.includes(candidatesSelectedPost)) {
		return false;
	}

	let checkFor = GRADUATION;
	let allowdQualificationForSkipExperience = ["C.A.", "C.S.", "I.C.W.A"]; // these are for post of शाखा व्यवस्थापक

	let graduationQualification = qualificationList.filter(qualification => {
		if (qualification.id === checkFor) {
			return qualification;
		}
	});
	let candiatesSpecilization = graduationQualification[0].eduSpecialization;

	if (allowdQualificationForSkipExperience.includes(candiatesSpecilization)) {
		return true;
	}
	return false;
}

function upload_candiate_education_data() {
	var sendData = {
		cri: regID,
		cfi: form_id,
		edu_data: JSON.stringify(saveQualificationList),
	};
	// var $this = $('#saveEducationDetails')
	let saveEducationDetailsBtn = $("#saveEducationDetails");

	saveEducationDetailsBtn
		.prop("disabled", true)
		.html(
			`<i class="fa-solid fa-floppy-disk mr-2" aria-hidden="true"></i> Saving Details...   `,
		);
	$.ajax({
		method: "post",
		url: "/save-education-details",
		data: sendData,
	})
		.done(function (data) {
			saveEducationDetailsBtn
				.prop("disabled", false)
				.html(
					`<i class="fa-solid fa-floppy-disk mr-2" aria-hidden="true"></i> Submit`,
				);

			if (data._call == 1) {
				alertjs.success(
					{
						t: "Education details added successfully.",
						m: "",
					},
					function () {
						// console.log(saveQualificationList, 'qualification list');
						// const is_allowed_skip_experience = check_is_allow_to_skip_experience(saveQualificationList);
						// if (is_allowed_skip_experience) {
						// window.location.assign(`/experience-details/${regString}?skipExp=true`);
						// } else {
						window.location.assign(
							`/experience-details/${regString}`,
						);
						// }
						// window.location.assign('/experience-details/' + regString)
					},
				);
			}
		})
		.fail(function (error) {
			saveEducationDetailsBtn
				.prop("disabled", false)
				.html(
					`<i class="fa-solid fa-floppy-disk mr-2" aria-hidden="true">Submit</i>`,
				);
			alertjs.error(function () {
				console.log(error.message);
			});
		})
		.always(function () {
			saveEducationDetailsBtn
				.prop("disabled", false)
				.html(
					`<i class="fa-solid fa-floppy-disk mr-2" aria-hidden="true">Submit</i>`,
				);
		});
}

function check_education_qualification_criteria(saveQualificationList, cb) {
	let is_graduation_details_filled = false;
	let candiate_filled_graduation = "";

	let is_post_graduation_details_filled = false;
	let candiate_filled_post_graduation = "";

	let is_typist_details_filled = false;
	let candidate_filled_typing_details = "";

	for (let i = 0; i < saveQualificationList.length; i++) {
		let qualification = saveQualificationList[i];
		if (qualification.id === 5) {
			is_graduation_details_filled = true;
			candiate_filled_graduation = qualification.eduSpecialization;
		}

		if (qualification.id === 6) {
			is_post_graduation_details_filled = true;
			candiate_filled_post_graduation = qualification.eduSpecialization;
		}

		if (qualification.id === 10) {
			is_typist_details_filled = true;
			candidate_filled_typing_details = qualification.eduSpecialization;
		}
	}

	if (is_graduation_details_filled || is_post_graduation_details_filled) {
		const postAllowEducationList =
			postDetails.post_education_criteria.split(",");

		let isCandiatesQualifictionAllowed = false;
		if (postAllowEducationList[0] !== "-") {
			// check for graduation qualifications
			for (let i = 0; i < postAllowEducationList.length; i++) {
				let currentQualification =
					postAllowEducationList[i].toLowerCase();
				let candiate_filled_grad =
					candiate_filled_graduation.toLowerCase();

				// if ( postAllowEducationList[i].toLowerCase() === candiate_filled_graduation.toLowerCase()) {
				if (currentQualification === candiate_filled_grad) {
					isCandiatesQualifictionAllowed = true;
				}
			}

			if (!isCandiatesQualifictionAllowed) {
				// check for post graduation qualifcations
				for (let i = 0; i < postAllowEducationList.length; i++) {
					let currentQualification =
						postAllowEducationList[i].toLowerCase();
					let candiate_filled_post_grad =
						candiate_filled_post_graduation.toLowerCase();

					if (currentQualification === candiate_filled_post_grad) {
						isCandiatesQualifictionAllowed = true;
					}
				}
			}

			// check for typist qualification details
			let applied_post_id = +postDetails.id;
			// i.e. candiate has applied for typist post
			if (applied_post_id === 31) {
				isCandiatesQualifictionAllowed = false;

				for (let i = 0; i < postAllowEducationList.length; i++) {
					let currentQualification =
						postAllowEducationList[i].toLowerCase();
					let candiate_filled_typing =
						candidate_filled_typing_details.toLowerCase();

					if (currentQualification === candiate_filled_typing) {
						isCandiatesQualifictionAllowed = true;
					}
				}
			}

			if (isCandiatesQualifictionAllowed) {
				cb(true, postAllowEducationList);
			} else {
				cb(false, postAllowEducationList);
			}
		} else {
			cb(true, postAllowEducationList);
		}
	}
}

function checkForData(id) {
	let isFound = saveQualificationList.find(function (qualification) {
		return Number(qualification.id) === Number(id);
	});
	if (isFound !== undefined) {
		return true;
	} else {
		return false;
	}
}
