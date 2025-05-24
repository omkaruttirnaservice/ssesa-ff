const dbBackupRouter = require("express").Router();
const { middleware } = require("../middlewares/middleware.js");
const {
	createDbBackup,
} = require("../application/controllers/dbBackupController.js");

dbBackupRouter.get(
	"/generate",
	middleware.checkForPoolConnection,
	createDbBackup,
);

module.exports = dbBackupRouter;
