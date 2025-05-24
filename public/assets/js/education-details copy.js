var educationDetails = {
	sscSpecialization: "SSC/10th",

	sscBoard: "",

	sscPassingYear: "-1",

	sscPercent: "",

	sscClass: "-1",

	hscSpecialization: "",

	hscBoard: "",

	hscyear: "-1",

	hscPercent: "",

	hscClass: "-1",

	gSpacialization: "",

	gBoard: "",

	gYear: "-1",

	gPercent: "",

	gClass: "-1",

	pgSpacialization: "",

	pgBoard: "",

	pgYear: "-1",

	pgPercent: "",

	pgClass: "-1",

	dSpacialization: "",

	dBoard: "",

	dYear: "-1",

	dPercentage: "",

	dClass: "-1",

	ccSpacialization: "",

	ccBoard: "-",

	ccYear: "-1",

	ccPercentage: "",

	ccClass: "-1",

	itiSpecialization: "",

	itiBoard: "",

	itiPassingYear: "-1",

	itiPercent: "",

	itiClass: "-1",

	otherInformationSpacialization: "",

	otherInformationBoard: "",

	otherInformationYear: "-1",

	otherInformationPercentage: "",

	otherInformationClass: "-1",

	expOrgName: "",

	expDesignation: "",

	expLocation: "",

	expServiceYear: "",
};

var itiSpecialization = [
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
];

var diplomaSpecialization = [
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
];

var pgSpecialization = [
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

	"M.C.A.",

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
];

var gSpecialization = [
	"Chartered Accountant",

	"AITP",

	"AMIE",

	"Armed Forces Graduation",

	"B.Pharma.	",

	"B.A.",

	"B.A.(Social Science",

	"B.A.A.",

	"B.A.B.Ed. Integrated",

	"B.A.M.S.",

	"B.A.S.L.P.",

	"B.Arch",

	"B.B.A.",

	"B.B.M.",

	"B.B.S.",

	"B.C.A.",

	"B.C.M.",

	"B.Com",

	"B.D.S.",

	"B.E.",

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
];

var ccSpecialization = [
	"Live Stock Supervisor",

	"2nd Class Wireman ship",

	"Architecture Draftsman",

	"ASSISTANT CIVIL ENGINEER",

	"Auxiliary Nurse Midwives",

	"CCC",

	"Certificate Of Competency As First Class Master",

	"Certificate Of Competency As Second Class Master",

	"Certificate Of Competency As First Class Engine Driver",

	"Certificate Of Competency As For License To Act As Engineer",

	"Civil Engineering Assistant",

	"Completion of 4 years Departmental Apprenticeship",

	"Construction Supervisor",

	"Dental Hygienist",

	"Dental Mechanic Course",

	"Divisional Officer Course from National Fire Service College, Nagpur.",

	"DOECC",

	"Draftsman (CIVIL)",

	"Fireman Course pass from State Fire Training Centre",

	"GCC - English 30 WPM",

	"GCC - English 35 WPM",

	"GCC - English 40 WPM",

	"GCC - English 50 WPM",

	"GCC - English 60 WPM",

	"GCC - Hindi 30 WPM",

	"GCC - Marathi 30 WPM",

	"GCC - Marathi 40 WPM",

	"GCC - Marathi 50 WPM",

	"GCC - Shorthand English 100 WPM",

	"GCC - Shorthand English 120 WPM",

	"GCC - Shorthand English 60 WPM",

	"GCC - Shorthand English 80 WPM",

	"GCC - Shorthand Marathi 100 WPM",

	"GCC - Shorthand Marathi 120 WPM",

	"GCC - Shorthand Marathi 60 WPM",

	"GCC - Shorthand Marathi 80 WPM",

	"Intermediate Drawing Grade Examination",

	"Library Science",

	"Maharashtra Technical Board Certificate English 40 WPM",

	"Maharashtra Technical Board Certificate Marathi 30 WPM",

	"MSCIT",

	"National Apprenticeship in printing",

	"Navigation Water Keeping Officer(NWKO) Near Coastal Voyage(NCV) Certificate",

	"Ophthalmic Assistant",

	"Other",

	"Post Graduate Certificate Course In Photo-Journalism",

	"Sea Going Engine Driver Certification As Marine Engineering Officer(MEO)",

	"Social Media or Digital Marketing Course",

	"Station Officer Course from any National Fire Service College",

	"Sub Fire Officer Course from National Fire Service College, Nagpur",

	"Sub Officer course passed from National Fire Service college, Nagpur",

	"Typography (Printing) granted by any recognized institution",

	"Wireman License Grade II prescribed by Public Works Department of the Government",

	"Wiremen License",
];

var university = [
	"Bharati Vidyapeeth, Pune",

	"Central Institute of Fisheries Education, Varsova, Mumbai",

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

	"State Board",

	"CBSE",

	"ICSE",

	"Others",

	"Institute of Chemical Technology, Nathalal Parekh Marg, Matunga, Mumbai",

	"MGM INSTITUTE OF HEALTH SCIENCES, NAVI MUMBAI",

	"Maharashtra Nursing Council,Mumbai",

	"Gondwana University",

	"Maharashtra State Examination Board Pune",
];

$(".year").html(`<option value='-1'>Select</option>`);

for (var i = 1975; i < 2022; i++) {
	$(".year").append(`<option value='${i}'>${i}</option>`);
}

$(".greadClass").append(`<option value='-1'> Select</option>

                        <option value='Distinction'> Distinction </option>

                        <option value='First Class'> First Class </option>

                        <option value='Higher Second Class'>Higher Second Class </option>

                        <option value='Second Class'> Second Class </option>

                        <option value='Pass Class'> Pass Class</option>`);

function setEduUpdateData() {
	$("#sscBoard").val(educationDetails.sscBoard);

	$("#sscPassingYear").val(educationDetails.sscPassingYear);

	$("#sscPercent").val(educationDetails.sscPercent);

	$("#sscClass").val(educationDetails.sscClass);

	$("#hscBoard").val(educationDetails.hscBoard);

	$("#hscyear").val(educationDetails.hscyear);

	$("#hscPercent").val(educationDetails.hscPercent);

	$("#hscClass").val(educationDetails.hscClass);

	$("#gSpacialization").val(educationDetails.gSpacialization);

	$("#gBoard").val(educationDetails.gBoard);

	$("#gYear").val(educationDetails.gYear);

	$("#gPercent").val(educationDetails.gPercent);

	$("#gClass").val(educationDetails.gClass);

	$("#pgSpacialization").val(educationDetails.pgSpacialization);

	$("#pgBoard").val(educationDetails.pgBoard);

	$("#pgYear").val(educationDetails.pgYear);

	$("#pgPercent").val(educationDetails.pgPercent);

	$("#pgClass").val(educationDetails.pgClass);

	$("#dSpacialization").val(educationDetails.dSpacialization);

	$("#dBoard").val(educationDetails.dBoard);

	$("#dYear").val(educationDetails.dYear);

	$("#dPercentage").val(educationDetails.dPercentage);

	$("#dClass").val(educationDetails.dClass);

	$("#ccSpacialization").val(educationDetails.ccSpacialization);

	$("#ccBoard").val(educationDetails.ccBoard);

	$("#ccYear").val(educationDetails.ccYear);

	$("#ccPercentage").val(educationDetails.ccPercentage);

	$("#ccClass").val(educationDetails.ccClass);

	$("#otherInformation").val(educationDetails.otherInformation);

	$("#expOrgName").val(educationDetails.expOrgName);

	$("#expDesignation").val(educationDetails.expDesignation);

	$("#expLocation").val(educationDetails.expLocation);

	$("#expServiceYear").val(educationDetails.expServiceYear);

	$("#sscSpecialization").val(educationDetails.sscSpecialization);

	$("#hscSpecialization").val(educationDetails.hscSpecialization);

	$("#itiSpecialization").val(educationDetails.itiSpecialization);

	$("#itiBoard").val(educationDetails.itiBoard);

	$("#itiPassingYear").val(educationDetails.itiPassingYear);

	$("#itiPercent").val(educationDetails.itiPercent);

	$("#itiClass").val(educationDetails.itiClass);

	$("#otherInformationSpacialization").val(
		educationDetails.otherInformationSpacialization,
	);

	$("#otherInformationBoard").val(educationDetails.otherInformationBoard);

	$("#otherInformationYear").val(educationDetails.otherInformationYear);

	$("#otherInformationPercentage").val(
		educationDetails.otherInformationPercentage,
	);

	$("#otherInformationClass").val(educationDetails.otherInformationClass);

	checkEducationDetailsOnLoad();
}
function printExtra() {
	if (addExtraQualification.length == 0) {
		$("#extraQualificationList").html("");
		return false;
	}
	var extraList = addExtraQualification
		.map(function (extra, index) {
			return `<tr>
            <th width="25%"><span class="text-primary">${extra.moreInformationSpacialization}</span></th>
            <td width="25%">${extra.moreInformationBoard}</td>
            <td width="25%">${extra.moreInformationYear}</td>
            <td width="10">${extra.moreInformationPercentage}</td>
            <td width="10%">${extra.moreInformationClass}</td>
            <td width="5%"><button class="btn btn-sm btn-danger extraRemove" data-id="${index}">Remove</button></td>
      </tr>`;
		})
		.join("");
	var header = `<tr class="text-danger"><th colspan="6" class="text-center">Other Qualification</th></tr>
                <tr class="text-primary">
                  <th width="25%"><span>Specialization</span></th>
                  <th width="25%">Board Detail</th>
                  <th width="25%">Passed Year</th>
                  <th width="10">Percentage</th>
                  <th width="10%">Class</th>
                  <th width="5%">Action</th></tr>`;
	$("#extraQualificationList").html(header + extraList);
}

function printExperienceList() {
	if (experienceList.length == 0) {
		$("#experienceList").html("");
		return false;
	}

	var extraList = experienceList
		.map(function (extra, index) {
			return `<tr>
            <th width="25%"><span class="text-primary">${extra.expOrgName}</span></th>
            <td width="25%">${extra.expDesignation}</td>
            <td width="25%">${extra.expLocation}</td>
            <td width="10">${extra.expServiceYear}</td>
            <td width="5%"><button class="btn btn-sm btn-danger expreneceRemove" data-id="${index}">Remove</button></td>
      </tr>`;
		})
		.join("");
	var header = `<tr class="text-danger"><th colspan="6" class="text-center">Work Experience</th></tr>
                <tr class="text-primary">
                  <th width="25%"><span>Organisation Name</span></th>
                  <th width="25%"><span>Designation</span></th>
                  <th width="25%">Location</th>
                  <th width="25%">Total Service Year</th>
                  <th width="5%">Action</th></tr>`;
	$("#experienceList").html(header + extraList);
}

$(function () {
	printExtra();
	printExperienceList();
	$(document).on("keyup", ".avoid-sp-char", function () {
		var text = $(this).val();
		text = text.replace(/[<>{}()@#$%^&*=+|;:"'/\\]/g, "");
		$(this).val(text);
	});
	$("#addExtraQualification").on("click", function () {
		var moreInformationSpacialization = $(
			"#moreInformationSpacialization",
		).val();
		var moreInformationBoard = $("#moreInformationBoard").val();
		var moreInformationYear = $("#moreInformationYear").val();
		var moreInformationPercentage = Number(
			$("#moreInformationPercentage").val(),
		);
		var moreInformationClass = $("#moreInformationClass").val();
		if (moreInformationSpacialization == "") {
			alertjs.warning(
				{
					t: "Warning",
					m: "enter specialization",
				},
				function () {},
			);
			$("#moreInformationSpacialization").focus();
			return false;
		}
		if (moreInformationBoard == "") {
			$("#moreInformationBoard").focus();
			alertjs.warning(
				{
					t: "Warning",
					m: "Enter Board Details",
				},
				function () {},
			);
			return false;
		}
		if (moreInformationYear == "-1") {
			$("#moreInformationYear").focus();
			alertjs.warning(
				{
					t: "Warning",
					m: "Select Year",
				},
				function () {},
			);
			return false;
		}
		if (
			isNaN(moreInformationPercentage) ||
			moreInformationPercentage == 0
		) {
			$("#moreInformationPercentage").focus();
			alertjs.warning(
				{
					t: "Warning",
					m: "add percentage",
				},
				function () {},
			);
			return false;
		}

		if (moreInformationClass == "-1") {
			$("#moreInformationClass").focus();
			alertjs.warning(
				{
					t: "Warning",
					m: "Select Class",
				},
				function () {},
			);
			return false;
		}

		var more = {
			moreInformationSpacialization: moreInformationSpacialization,
			moreInformationBoard: moreInformationBoard,
			moreInformationYear: moreInformationYear,
			moreInformationPercentage: moreInformationPercentage,
			moreInformationClass: moreInformationClass,
		};
		addExtraQualification.push(more);
		printExtra();
		$("#moreInformationSpacialization").val("");
		$("#moreInformationBoard").val("");
		$("#moreInformationYear").val("-1");
		$("#moreInformationPercentage").val("");
		$("#moreInformationClass").val(-1);
	});

	$("#expSave").on("click", function () {
		var expOrgName1 = $("#expOrgName1").val();
		var expDesignation1 = $("#expDesignation1").val();
		var expLocation1 = $("#expLocation1").val();
		var expServiceYear1 = $("#expServiceYear1").val();

		if (
			expOrgName1 == "" ||
			expDesignation1 == "" ||
			expLocation1 == "" ||
			expServiceYear1 == ""
		) {
			alertjs.warning(
				{
					t: "Warning",
					m: "Fill All Details",
				},
				function () {},
			);
			return false;
		}
		experienceList.push({
			expOrgName: expOrgName1,
			expDesignation: expDesignation1,
			expLocation: expLocation1,
			expServiceYear: expServiceYear1,
		});
		$("#expOrgName1").val("");
		$("#expDesignation1").val("");
		$("#expLocation1").val("");
		$("#expServiceYear1").val("");
		printExperienceList();
	});

	$(document).on("click", ".extraRemove", function () {
		var id = $(this).data("id");
		addExtraQualification.splice(id, 1);
		printExtra();
	});

	$(document).on("click", ".expreneceRemove", function () {
		var id = $(this).data("id");
		experienceList.splice(id, 1);
		printExperienceList();
	});

	itiSpecialization.forEach(function (value) {
		$("#itiSpecialization").append(
			`<option value='${value}'>${value}</option>`,
		);
	});

	diplomaSpecialization.forEach(function (value) {
		$("#dSpacialization").append(
			`<option value='${value}'>${value}</option>`,
		);
	});

	pgSpecialization.forEach(function (value) {
		$("#pgSpacialization").append(
			`<option value='${value}'>${value}</option>`,
		);
	});

	gSpecialization.forEach(function (value) {
		$("#gSpacialization").append(
			`<option value='${value}'>${value}</option>`,
		);
	});

	ccSpecialization.forEach(function (value) {
		$("#ccSpacialization").append(
			`<option value='${value}'>${value}</option>`,
		);
	});

	university.forEach(function (value) {
		$(".setUniversity").append(
			`<option value='${value}'>${value}</option>`,
		);
	});

	$(".setPresent").on("blur", function () {
		var value = Number($(this).val());

		console.log(value);

		if (value > 100) {
			$(this).val("100.00");
		} else {
			value = value.toFixed(2);

			$(this).val(value);
		}
	});

	$("#hscSpecialization").on("change", function () {
		var value = $(this).val();

		if (value === "") {
			$("#hscBoard").val("").prop("disabled", true);

			$("#hscyear").val("-1").prop("disabled", true);

			$("#hscPercent").val("").prop("disabled", true);

			$("#hscClass").val("-1").prop("disabled", true);

			educationDetails.hscBoard = "";

			educationDetails.hscyear = "-1";

			educationDetails.hscPercent = "";

			educationDetails.hscClass = "-1";
		} else {
			$("#hscBoard").prop("disabled", false);

			$("#hscyear").prop("disabled", false);

			$("#hscPercent").prop("disabled", false);

			$("#hscClass").prop("disabled", false);
		}
	});

	$("#itiSpecialization").on("change", function () {
		var value = $(this).val();

		if (value === "") {
			$("#itiBoard").val("").prop("disabled", true);

			$("#itiPassingYear").val("-1").prop("disabled", true);

			$("#itiPercent").val("").prop("disabled", true);

			$("#itiClass").val("-1").prop("disabled", true);

			educationDetails.itiBoard = "";

			educationDetails.itiClass = "-1";

			educationDetails.itiPassingYear = "-1";

			educationDetails.itiPercent = "";
		} else {
			$("#itiBoard").prop("disabled", false);

			$("#itiPassingYear").prop("disabled", false);

			$("#itiPercent").prop("disabled", false);

			$("#itiClass").prop("disabled", false);
		}
	});

	$("#dSpacialization").on("change", function () {
		var value = $(this).val();

		if (value === "") {
			$("#dBoard").val("").prop("disabled", true);

			$("#dYear").val("-1").prop("disabled", true);

			$("#dPercentage").val("").prop("disabled", true);

			$("#dClass").val("-1").prop("disabled", true);

			educationDetails.dBoard = "";

			educationDetails.dYear = "-1";

			educationDetails.dPercentage = "";

			educationDetails.dClass = "-1";
		} else {
			$("#dBoard").prop("disabled", false);

			$("#dYear").prop("disabled", false);

			$("#dPercentage").prop("disabled", false);

			$("#dClass").prop("disabled", false);
		}
	});

	$("#gSpacialization").on("change", function () {
		var value = $(this).val();

		if (value === "") {
			$("#gBoard").val("").prop("disabled", true);

			$("#gYear").val("-1").prop("disabled", true);

			$("#gPercent").val("").prop("disabled", true);

			$("#gClass").val("-1").prop("disabled", true);

			educationDetails.gBoard = "";

			educationDetails.gYear = "-1";

			educationDetails.gPercent = "";

			educationDetails.gClass = "-1";
		} else {
			$("#gBoard").prop("disabled", false);

			$("#gYear").prop("disabled", false);

			$("#gPercent").prop("disabled", false);

			$("#gClass").prop("disabled", false);
		}
	});

	$("#pgSpacialization").on("change", function () {
		var value = $(this).val();

		if (value === "") {
			$("#pgBoard").val("").prop("disabled", true);

			$("#pgYear").val("-1").prop("disabled", true);

			$("#pgPercent").val("").prop("disabled", true);

			$("#pgClass").val("-1").prop("disabled", true);

			educationDetails.pgBoard = "";

			educationDetails.pgYear = "-1";

			educationDetails.pgPercent = "";

			educationDetails.pgClass = "-1";
		} else {
			$("#pgBoard").prop("disabled", false);

			$("#pgYear").prop("disabled", false);

			$("#pgPercent").prop("disabled", false);

			$("#pgClass").prop("disabled", false);
		}
	});

	$("#ccSpacialization").on("change", function () {
		var value = $(this).val();

		if (value === "") {
			$("#ccYear").val("-1").prop("disabled", true);

			$("#ccPercentage").val("").prop("disabled", true);

			$("#ccClass").val("-1").prop("disabled", true);

			educationDetails.ccYear = "-1";

			educationDetails.ccPercentage = "";

			educationDetails.ccClass = "-1";
		} else {
			$("#ccYear").prop("disabled", false);

			$("#ccPercentage").prop("disabled", false);

			$("#ccClass").prop("disabled", false);
		}
	});

	$("#back").on("click", function () {
		window.location.assign("/user-details/" + regString);

		return false;
	});

	$("#ca_mt").on("click", function () {
		var val = $(this).prop("checked") == true ? 1 : 0;

		updateResult.ca_mt = val;
	});

	$("#ca_et").on("click", function () {
		var val = $(this).prop("checked") == true ? 1 : 0;

		updateResult.ca_et = val;
	});

	$("#ca_ht").on("click", function () {
		var val = $(this).prop("checked") == true ? 1 : 0;

		updateResult.ca_ht = val;
	});

	$("#ca_mf").on("click", function () {
		var val = $(this).prop("checked") == true ? 1 : 0;

		updateResult.ca_mf = val;
	});

	$("#ca_ef").on("click", function () {
		var val = $(this).prop("checked") == true ? 1 : 0;

		updateResult.ca_ef = val;
	});

	$("#ca_hf").on("click", function () {
		var val = $(this).prop("checked") == true ? 1 : 0;

		updateResult.ca_hf = val;
	});

	$("#ca_mt").prop("checked", updateResult.ca_mt);

	$("#ca_et").prop("checked", updateResult.ca_et);

	$("#ca_ht").prop("checked", updateResult.ca_ht);

	$("#ca_mf").prop("checked", updateResult.ca_mf);

	$("#ca_ef").prop("checked", updateResult.ca_ef);

	$("#ca_hf").prop("checked", updateResult.ca_hf);

	if (updateData) {
		educationDetails = updateData;

		setEduUpdateData();
	}

	$(".inputData").blur(function () {
		var id_name = $(this).prop("id");

		educationDetails[id_name] = $(this).val();
	});

	$(".inputData").change(function () {
		var id_name = $(this).prop("id");

		educationDetails[id_name] = $(this).val();
	});

	$("#verifyEducationalDetails").click(function () {
		validateEducationData(function (status) {
			if (status == true) {
				alertjs.success(
					{
						t: "Educational Details Verified",

						m: "Click On Submit To Save Details.",
					},

					function () {
						$("#submitEducationalDetails").removeClass("d-none");
					},
				);
			}
		});
	});

	$("#submitEducationalDetails").click(function () {
		validateEducationData(function (status) {
			if (status == false) {
				return false;
			}

			var sendData = {
				cri: regID,

				cfi: form_id,

				edu_data: JSON.stringify(educationDetails),

				ca_mt: updateResult.ca_mt,

				ca_et: updateResult.ca_et,

				ca_ht: updateResult.ca_ht,

				ca_mf: updateResult.ca_mf,

				ca_ef: updateResult.ca_ef,

				ca_hf: updateResult.ca_hf,

				extraQualification: JSON.stringify(addExtraQualification),
				experienceList: JSON.stringify(experienceList),
			};

			var $this = $("#submitEducationalDetails");

			$this

				.prop("disabled", true)

				.html(
					`<i class="fa fa-floppy-o mr-2" aria-hidden="true"> Saving Details...   </i>`,
				);

			$.ajax({
				method: "post",

				url: "/save-education-details",

				data: sendData,
			})

				.done(function (data) {
					$this

						.prop("disabled", false)

						.html(
							`<i class="fa fa-floppy-o mr-2" aria-hidden="true"> Submit  </i>`,
						);

					var json_data = data;

					if (json_data._call == 1) {
						alertjs.success(
							{
								t: "Educational Details Saved Successfully.",

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
					$this

						.prop("disabled", false)

						.html(
							`<i class="fa fa-floppy-o mr-2" aria-hidden="true"> Submit  </i>`,
						);

					alertjs.error(function () {
						console.log(error);
					});
				})

				.always(function () {
					$this

						.prop("disabled", false)

						.html(
							`<i class="fa fa-floppy-o mr-2" aria-hidden="true"> Submit  </i>`,
						);

					console.log("Done");
				});
		});
	});
});

function validateEducationData(callback) {
	var isTrue = true;

	if (educationDetails.sscBoard == "") {
		printWarning("Kindly fill your education details.");

		isTrue = false;

		return false;
	}

	if (educationDetails.sscBoard !== "") {
		if (educationDetails.sscPassingYear == "-1") {
			printWarning("Invalid SSC Passing Year.");

			isTrue = false;

			return false;
		}

		if (
			educationDetails.sscPercent == "" ||
			Number(educationDetails.sscPercent) > 100 ||
			Number(educationDetails.sscPercent) < 1
		) {
			printWarning(
				"SSC percentage details are invalid / percentage details need to be filled.",
			);

			isTrue = false;

			return false;
		} else {
			/*var p = Number(educationDetails.sscPercent);

      if (isNaN(p)) {

        printWarning("Invalid SSC Percentage.");

        isTrue = false;

        return false;

      }*/
		}

		if (educationDetails.sscClass == "-1") {
			printWarning("Invalid SSC Class.");

			isTrue = false;

			return false;
		}
	}

	if (educationDetails.hscSpecialization !== "") {
		if (educationDetails.hscBoard == "") {
			printWarning("Invalid HSC Board.");

			isTrue = false;

			return false;
		}

		if (educationDetails.hscyear == "-1") {
			printWarning("Invalid HSC Passing Year.");

			isTrue = false;

			return false;
		}

		if (
			educationDetails.hscPercent == "" ||
			Number(educationDetails.hscPercent) > 100 ||
			Number(educationDetails.hscPercent) < 1
		) {
			printWarning(
				"HSC percentage details are invalid / percentage details need to be filled.",
			);

			isTrue = false;

			return false;
		}

		if (educationDetails.hscClass == "-1") {
			printWarning("Invalid HSC Class.");

			isTrue = false;

			return false;
		}
	}

	if (educationDetails.itiSpecialization !== "") {
		if (educationDetails.itiBoard == "") {
			printWarning("Invalid ITI Board.");

			isTrue = false;

			return false;
		}

		if (educationDetails.itiPassingYear == "-1") {
			printWarning("Invalid ITI Passing Year.");

			isTrue = false;

			return false;
		}

		if (
			educationDetails.itiPercent == "" ||
			Number(educationDetails.itiPercent) > 100 ||
			Number(educationDetails.itiPercent) < 1
		) {
			printWarning(
				"ITI percentage details are invalid / percentage details need to be filled.",
			);

			isTrue = false;

			return false;
		}

		if (educationDetails.itiClass == "-1") {
			printWarning("Invalid ITI Class.");

			isTrue = false;

			return false;
		}
	}

	if (educationDetails.dSpacialization != "") {
		if (educationDetails.dBoard == "") {
			printWarning("Invalid Diploma Passing Board.");

			isTrue = false;

			return false;
		}

		if (educationDetails.dYear == "-1") {
			printWarning("Invalid Diploma Passing Year.");

			isTrue = false;

			return false;
		}

		if (
			educationDetails.dPercentage == "" ||
			Number(educationDetails.dPercentage) > 100 ||
			Number(educationDetails.dPercentage) < 1
		) {
			printWarning(
				"Diploma percentage details are invalid / percentage details need to be filled.",
			);

			isTrue = false;

			return false;
		}

		if (educationDetails.dClass == "-1") {
			printWarning("Invalid Diploma Class.");

			isTrue = false;

			return false;
		}
	}

	if (educationDetails.gSpacialization != "") {
		if (educationDetails.gBoard == "") {
			printWarning("Invalid Graduation Passing Board.");

			isTrue = false;

			return false;
		}

		if (educationDetails.gYear == "-1") {
			printWarning("Invalid Graduation Passing Year");

			isTrue = false;

			return false;
		}

		if (
			educationDetails.gPercent == "" ||
			Number(educationDetails.gPercent) > 100 ||
			Number(educationDetails.gPercent) < 1
		) {
			isTrue = false;

			printWarning(
				"Graduation percentage details are invalid / percentage details need to be filled.",
			);

			return false;
		}

		if (educationDetails.gClass == "-1") {
			isTrue = false;

			printWarning("Invalid Graduation Class");

			return false;
		}
	}

	if (educationDetails.pgSpacialization != "") {
		if (educationDetails.pgBoard == "") {
			printWarning("Invalid Post Graduation Passing Board.");

			return false;
		}

		if (educationDetails.pgYear == "-1") {
			printWarning("Invalid Post Graduation Passing Year.");

			isTrue = false;

			return false;
		}

		if (
			educationDetails.pgPercent == "" ||
			Number(educationDetails.pgPercent) > 100 ||
			Number(educationDetails.pgPercent) < 1
		) {
			printWarning(
				"Post Graduation percentage details are invalid / percentage details need to be filled.",
			);

			isTrue = false;

			return false;
		}

		if (educationDetails.pgClass == "-1") {
			printWarning("Invalid Post Graduation Class.");

			isTrue = false;

			return false;
		}
	}

	if (educationDetails.ccSpacialization != "") {
		if (educationDetails.ccBoard == "") {
			printWarning("Invalid Computer Certificate Board.");

			isTrue = false;

			return false;
		}

		if (educationDetails.ccYear == "-1") {
			printWarning("Invalid Computer Certificate Passing Year.");

			isTrue = false;

			return false;
		}

		if (
			educationDetails.ccPercentage == "" ||
			Number(educationDetails.ccPercentage) > 100 ||
			Number(educationDetails.ccPercentage) < 1
		) {
			printWarning(
				"Certificate percentage details are invalid / percentage details need to be filled.",
			);

			isTrue = false;

			return false;
		}

		if (educationDetails.ccClass == "-1") {
			printWarning("Invalid Computer Certificate Class.");

			isTrue = false;

			return false;
		}
	}

	if (educationDetails.otherInformationSpacialization != "") {
		if (educationDetails.otherInformationBoard == "") {
			printWarning("Invalid Other Qualification Board.");

			isTrue = false;

			return false;
		}

		if (educationDetails.otherInformationYear == "-1") {
			printWarning("Invalid Other Qualification Passing Year.");

			isTrue = false;

			return false;
		}

		if (
			educationDetails.otherInformationPercentage == "" ||
			Number(educationDetails.otherInformationPercentage) > 100 ||
			Number(educationDetails.otherInformationPercentage) < 1
		) {
			printWarning(
				"Other Qualification percentage details are invalid / percentage details need to be filled.",
			);

			isTrue = false;

			return false;
		}

		if (educationDetails.otherInformationClass == "-1") {
			printWarning("Invalid Other Qualification Class.");

			isTrue = false;

			return false;
		}
	}

	callback(isTrue);
}

function printWarning(m) {
	alertjs.warning(
		{
			t: "Educational Details Warning !!!",

			m: m,
		},

		function () {},
	);
}

function checkEducationDetailsOnLoad() {
	var value = $("#hscSpecialization").val();

	if (value === "") {
		$("#hscBoard").val("").prop("disabled", true);

		$("#hscyear").val("-1").prop("disabled", true);

		$("#hscPercent").val("").prop("disabled", true);

		$("#hscClass").val("-1").prop("disabled", true);
	} else {
		$("#hscBoard").prop("disabled", false);

		$("#hscyear").prop("disabled", false);

		$("#hscPercent").prop("disabled", false);

		$("#hscClass").prop("disabled", false);
	}

	var value = $("#itiSpecialization").val();

	if (value === "") {
		$("#itiBoard").val("").prop("disabled", true);

		$("#itiPassingYear").val("-1").prop("disabled", true);

		$("#itiPercent").val("").prop("disabled", true);

		$("#itiClass").val("-1").prop("disabled", true);
	} else {
		$("#itiBoard").prop("disabled", false);

		$("#itiPassingYear").prop("disabled", false);

		$("#itiPercent").prop("disabled", false);

		$("#itiClass").prop("disabled", false);
	}

	var value = $("#dSpacialization").val();

	if (value === "") {
		$("#dBoard").val("").prop("disabled", true);

		$("#dYear").val("-1").prop("disabled", true);

		$("#dPercentage").val("").prop("disabled", true);

		$("#dClass").val("-1").prop("disabled", true);
	} else {
		$("#dBoard").prop("disabled", false);

		$("#dYear").prop("disabled", false);

		$("#dPercentage").prop("disabled", false);

		$("#dClass").prop("disabled", false);
	}

	var value = $("#gSpacialization").val();

	if (value === "") {
		$("#gBoard").val("").prop("disabled", true);

		$("#gYear").val("-1").prop("disabled", true);

		$("#gPercent").val("").prop("disabled", true);

		$("#gClass").val("-1").prop("disabled", true);
	} else {
		$("#gBoard").prop("disabled", false);

		$("#gYear").prop("disabled", false);

		$("#gPercent").prop("disabled", false);

		$("#gClass").prop("disabled", false);
	}

	var value = $("#pgSpacialization").val();

	if (value === "") {
		$("#pgBoard").val("").prop("disabled", true);

		$("#pgYear").val("-1").prop("disabled", true);

		$("#pgPercent").val("").prop("disabled", true);

		$("#pgClass").val("-1").prop("disabled", true);
	} else {
		$("#pgBoard").prop("disabled", false);

		$("#pgYear").prop("disabled", false);

		$("#pgPercent").prop("disabled", false);

		$("#pgClass").prop("disabled", false);
	}

	var value = $("#ccSpacialization").val();

	if (value === "") {
		$("#ccYear").val("-1").prop("disabled", true);

		$("#ccPercentage").val("").prop("disabled", true);

		$("#ccClass").val("-1").prop("disabled", true);
	} else {
		$("#ccYear").prop("disabled", false);

		$("#ccPercentage").prop("disabled", false);

		$("#ccClass").prop("disabled", false);
	}

	var value = $("#otherInformationSpacialization").val();

	if (value === "") {
		$("#otherInformationBoard").val("").prop("disabled", true);

		$("#otherInformationYear").val("-1").prop("disabled", true);

		$("#otherInformationPercentage").val("").prop("disabled", true);

		$("#otherInformationClass").val("-1").prop("disabled", true);
	} else {
		$("#otherInformationBoard").prop("disabled", false);

		$("#otherInformationYear").prop("disabled", false);

		$("#otherInformationPercentage").prop("disabled", false);

		$("#otherInformationPercentage").prop("disabled", false);
	}
}

$("#otherInformationSpacialization").on("keyup", function () {
	var value = $("#otherInformationSpacialization").val();

	if (value === "") {
		$("#otherInformationBoard").val("").prop("disabled", true);

		$("#otherInformationYear").val("-1").prop("disabled", true);

		$("#otherInformationPercentage").val("").prop("disabled", true);

		$("#otherInformationClass").val("-1").prop("disabled", true);

		educationDetails.otherInformationBoard = "";

		educationDetails.otherInformationPercentage = "";

		educationDetails.otherInformationClass = "-1";

		educationDetails.otherInformationYear = "-1";
	} else {
		$("#otherInformationBoard").prop("disabled", false);

		$("#otherInformationYear").prop("disabled", false);

		$("#otherInformationPercentage").prop("disabled", false);

		$("#otherInformationClass").prop("disabled", false);
	}
});
