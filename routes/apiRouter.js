const router = require("express").Router();
const { middleware } = require("../middlewares/middleware.js");
const fileUpload = require("express-fileupload");
const {
	studentsDataController,
	homepageController,
	nodeDetailsController,
} = require("../application/controllers/apiController.js");

// get process data
router.get(
	"/get-process-data",
	middleware.checkForPoolConnection,
	homepageController.getProcessData,
);

// students data api's

router.post(
	"/student-data/data",
	middleware.checkForPoolConnection,
	studentsDataController.getStudentsData,
);

router.post(
	"/student-data/download/photo-sign",
	middleware.checkForPoolConnection,
	studentsDataController.downloadPhotos,
);

// these routes are used in question-paper-generation panel
router.get(
	"/student-data/data-download",
	middleware.checkForPoolConnection,
	studentsDataController.getStudentsDataDownload,
);

router.get(
	"/student-data/download-photo-sign",
	middleware.checkForPoolConnection,
	studentsDataController.downloadPhotosSign,
);

router.post(
	"/student-data/download-photo-sign-aws",
	middleware.checkForPoolConnection,
	studentsDataController.downloadPhotosSignAws,
);

// get centers list
router.get(
	"/student-data/download-centers-list",
	middleware.checkForPoolConnection,
	studentsDataController.downloadCentersList,
);

// answer key and question paper
router.post(
	"/save-published-test-details",
	middleware.checkForPoolConnection,
	studentsDataController.savePublishedTestDetails,
);

// This is to get hallticket details for qr mobile app
router.post(
	"/get-ht-details",
	middleware.checkForPoolConnection,
	studentsDataController.getHtDetails,
);

router.get(
	"/get-ht-details-by-roll-no",
	middleware.checkForPoolConnection,
	studentsDataController.getHtDetailsByRollNumber,
);


router.post(
	"/save-approval-details",
	fileUpload(),
	middleware.checkForPoolConnection,
	middleware.setProcessData,
	studentsDataController.saveApprovalDetails,
);

// api for login from qr code scan application
router.post(
	"/login",
	middleware.checkForPoolConnection,
	studentsDataController.login,
);

// api for getting slots and center list for QR app
router.get(
	"/get-allotment-info",
	middleware.checkForPoolConnection,
	studentsDataController.getAllotmentInfo,
);

// api for getting attendance count for QR app
router.get(
	"/get-attendance-count/:slot",
	middleware.checkForPoolConnection,
	studentsDataController.getAttendanceCount,
);


// getting post list for question-paper-generation panel

router.get(
	"/posts-list",
	middleware.checkForPoolConnection,
	studentsDataController.getPostList,
);

// this gets the list of all exams centers and exam servers to the exam panel for request login
router.get(
	"/get-exam-server-and-centers-list",
	middleware.checkForPoolConnection,
	studentsDataController.getExamServerAndCentersList,
);

// This gets the login details of the server (request will come from exam panel)
router.get(
	"/get-server-login-details",
	middleware.checkForPoolConnection,
	studentsDataController.getServerLoginDetails,
);

// save node details
// This api will be called from exam panel
router.post(
	"/save-estimation-node-details",
	middleware.checkForPoolConnection,
	nodeDetailsController.saveEstimationNodeDetails,
);
// get node_details as per server number
// This api will be called from exam panel
router.get(
	"/get-node-details-by-server-id",
	middleware.checkForPoolConnection,
	nodeDetailsController.getNodeDetailsByServerId,
);

module.exports = router;
