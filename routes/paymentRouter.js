const paymentRouter = require("express").Router();
const { middleware } = require("../middlewares/middleware.js");
const fileUpload = require("express-fileupload");
const indexPaymentController = require("../application/controllers/payments/indexPaymentController.js");
const atomPgController = require("../application/controllers/atom-pg-controller/atomPgController.js");

paymentRouter.get(
	"/payment-page",
	middleware.checkForPoolConnection,
	middleware.setProcessData,
	middleware.redirectToHome,
	indexPaymentController.makePaymentView,
);

paymentRouter.post(
	"/payment/offline",

	middleware.checkForPoolConnection,
	middleware.setProcessData,
	middleware.redirectToHome,
	fileUpload(),
	indexPaymentController.makeOfflinePayment,
);

// for atom payment
paymentRouter.post(
	"/get-payment-details",
	middleware.checkForPoolConnection,
	middleware.setProcessData,
	middleware.redirectToHome,
	atomPgController.getPaymentDetails,
);

paymentRouter.post(
	"/verify-payment",
	middleware.checkForPoolConnection,
	atomPgController.verifyPayment,
);

paymentRouter.get(
	"/v1/transaction-status",
	middleware.checkForPoolConnection,
	atomPgController.transactionStatusV1,
);

paymentRouter.get(
	"/v2/transaction-status",
	middleware.checkForPoolConnection,
	atomPgController.transactionStatusV2,
);

module.exports = paymentRouter;
