const summaryRouter = require("express").Router();
const { middleware } = require("../middlewares/middleware.js");
const candidateCountSummaryController = require("../application/controllers/candidateCountSummaryController.js");

summaryRouter.get(
	"/get",
	middleware.checkForPoolConnection,
	candidateCountSummaryController._getAllSummary,
);

module.exports = summaryRouter;
