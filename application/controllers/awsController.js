const s3 = require("../config/awsConfig/aws");
const path = require("path");

const fileDirs = require("../config/awsConfig/filePaths.js");
const awsKeys = require("../config/awsConfig/awsKeys.js");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { momentDates } = require("../config/_responderSet");
const ApiResponse = require("../config/ApiResponse.js");
const { infoLog } = require("../config/logger.js");

const awsController = {
	uploadFile: async (req, res) => {
		try {
			console.log("=File upload started.===");

			const uploadImg = req.files.uploadImg;
			console.log(uploadImg, "==uploadImg==");
			if (!req.files || !uploadImg) {
				return res.status(400).json({
					success: false,
					message: "Upload the file or user image",
				});
			}

			let {
				process_name,
				app_id,
				img_type,
				folderName,
				fileExtension = "jpeg",
			} = req.body;

			folderName = `${process_name}/${folderName}`;

			const currentTimestamp = momentDates.getTimestamp();

			const imageName = `${process_name}_${img_type}_${app_id}_${currentTimestamp}`;

			const fileName = `${folderName}/${imageName}.${fileExtension}`;

			const uploadParams = {
				Bucket: awsKeys.bucketName,
				Key: fileName,
				Body: uploadImg.data,
				ContentType: uploadImg.mimetype,
			};

			const command = new PutObjectCommand(uploadParams);

			const awsFileUploadResponse = await s3.send(command);
			console.log(awsFileUploadResponse, "==awsFileUploadResponse==");
			console.log("=File upload completed.===");

			infoLog(`FILE_UPLOAD_SUCCESSFUL => ${fileName}`);

			return res.json(
				new ApiResponse(201, true, "File uploaded successfully.", {
					fileName,
				}),
			);
		} catch (err) {
			console.log(err, "==err==");
			return res.status(500).json({
				success: false,
				message: "Error while uploading the file",
				error: err.message,
			});
		}
	},

	uploadFile_2: async (req, res) => {
		try {
			console.log("=File upload started.===");

			const uploadImg = req.files.uploadImg;
			if (!req.files || !uploadImg) {
				return res.status(400).json({
					success: false,
					message: "Upload the file or user image",
				});
			}

			let { process_name, app_id, img_type, folderName } = req.body;

			folderName = `${process_name}/${folderName}`;

			const currentTimestamp = momentDates.getTimestamp();

			const fileExtension = `jpeg`; // or map mimetype to an extension if needed

			const imageName = `${process_name}_${img_type}_${app_id}_${currentTimestamp}`;

			const fileName = `${folderName}/${imageName}.${fileExtension}`;

			const uploadParams = {
				Bucket: awsKeys.bucketName,
				Key: fileName,
				Body: uploadImg.data,
				ContentType: uploadImg.mimetype,
			};

			const command = new PutObjectCommand(uploadParams);

			const awsFileUploadResponse = await s3.send(command);
			// console.log(awsFileUploadResponse, "==awsFileUploadResponse==");
			// console.log("=File upload completed.===");

			return { fileName };
		} catch (err) {
			console.log(err, "==err==");
			return res.status(500).json({
				success: false,
				message: "Error while uploading the file",
				error: err.message,
			});
		}
	},

	deleteFile_2: async delete_file_name => {
		return new Promise(async (resolve, reject) => {
			const deleteParams = {
				Bucket: awsKeys.bucketName, // The bucket name where the file is stored
				Key: delete_file_name, // The full path (key) of the file in the bucket
			};

			const command = new DeleteObjectCommand(deleteParams);
			const deleteResponse = await s3.send(command);
			resolve(deleteResponse);
		});
	},

	deleteFile: async (req, res) => {
		try {
			const { delete_file_name } = req.body;

			if (!delete_file_name) {
				return res.status(400).json({
					success: false,
					message: "File name (key) is required for deletion",
				});
			}

			const deleteParams = {
				Bucket: awsKeys.bucketName, // The bucket name where the file is stored
				Key: delete_file_name, // The full path (key) of the file in the bucket
			};

			const command = new DeleteObjectCommand(deleteParams);
			const deleteResponse = await s3.send(command);

			return res.json({
				success: true,
				message: `File deleted successfully from ${awsKeys.bucketName} with name: ${delete_file_name}`,
				response: deleteResponse,
			});
		} catch (err) {
			console.error(`Error while deleting the file: ${err.message}`);
			return res.status(500).json({
				success: false,
				message: "Error while deleting the file",
				error: err.message,
			});
		}
	},
};

module.exports = awsController;
