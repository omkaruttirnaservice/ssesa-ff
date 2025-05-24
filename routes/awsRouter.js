const awsRouter = require("express").Router();
const fileUpload = require("express-fileupload");
const {
	uploadFile,
	deleteFile,
	uploadFile_2,
} = require("../application/controllers/awsController");

awsRouter.post("/upload", fileUpload(), uploadFile);

awsRouter.delete("/delete", deleteFile);

module.exports = awsRouter;
