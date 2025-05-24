var mysql = require("mysql2"); // node-mysql module
var myConnection = require("express-myconnection"), // express-myconnection module
	dbOptions = {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
		database: process.env.DB_DATABASE,
		multipleStatements: true,
		connectionLimit: 10,
	};

exports.myConnection = myConnection;
exports.dbOptions = dbOptions;
exports.mysql = mysql;
