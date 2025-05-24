const { default: axios } = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const mysqldump = require("mysqldump");
const { momentDates } = require("../config/_responderSet.js");
const indexController = require("./indexConroller.js");
const indexModel = require("../model/indexModel.js");
const ApiResponse = require("../config/ApiResponse.js");
const { infoLog } = require("../config/logger.js");
const asyncHandler = require("../config/asyncHandler.js");
exports.createDbBackup = asyncHandler(async (req, res) => {
	infoLog("Starting mysql dump");
	const file_name = `${process.env.DB_DATABASE}_${momentDates.getTimestamp().replaceAll(":", "_")}_backup.sql`;
	const file_path = `db-backups/${file_name}`;
	infoLog(`Mysql file path-> ${file_path}`);
	await mysqldump({
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
		},
		dumpToFile: file_path,
		compressFile: false,
	});

	infoLog("Completed dump");
	infoLog("Getting process data");

	const _processData = await indexModel.getProcessData(res.pool);
	const p = _processData[0];

	infoLog("Reading dump file from folder");
	const file = fs.readFileSync(file_path);

	infoLog("Creating form data");
	let formData = new FormData();
	formData.append("uploadImg", file, { filename: file_name });

	const imgType = "db_backup";
	formData.append("img_type", imgType);
	formData.append("process_name", p.name);
	formData.append("app_id", "_");
	formData.append("folderName", "db-backups");
	formData.append("fileExtension", ".sql");

	const url = `${process.env.INTERNAL_API_URL}/aws/upload`;
	infoLog(`Uploading to aws (calling internal API)-> ${url}`);
	const _resp = await axios.post(url, formData);
	infoLog(`After file upload response ${_resp}`);

	return res
		.status(200)
		.json(new ApiResponse(201, "Successfully uploaded db backup to aws"));
});
