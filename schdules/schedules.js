require("dotenv").config();
const { default: axios } = require("axios");
const cron = require("node-cron");
const { infoLog } = require("../application/config/logger.js");

const sendSummaryCron = () => {
	// axios.get(`${process.env.INTERNAL_API_URL}/summary/get`);
};

cron.schedule("0 17 * * *", sendSummaryCron);

const getDbBackup = () => {
	infoLog("Generating db backup...");
	axios.get(`${process.env.INTERNAL_API_URL}/db-backup/generate`);
};

// cron.schedule("*/10 * * * * *", getDbBackup);
