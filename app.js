require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const db_connect = require("./application/config/db.connect"); // connection string
const cron = require("node-cron");
const morgan = require("morgan");
const { default: axios } = require("axios");
const errorHandler = require("./middlewares/errorMiddleware.js");
const PORT = process.env.PORT || 9000;

const {
	redisStore,
	connectRedis,
	redisClient,
} = require("./application/config/redisConnect.js");
const { infoLog, errorLog } = require("./application/config/logger.js");
const { isDevEnv } = require("./application/config/_responderSet.js");

const app = express();

app.use(cors());

app.use(
	session({
		store: redisStore,
		secret: "utirna_form_filling",
		resave: false,
		saveUninitialized: false,
	}),
);

app.use(
	db_connect.myConnection(db_connect.mysql, db_connect.dbOptions, "request"),
);

app.set("views", path.join(__dirname, "application/views"));
app.set("view engine", "pug");
app.use(function (req, res, next) {
	res.set(
		"Cache-Control",
		"no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0",
	);
	next();
});

app.use(express.json({ limit: "1024mb" }));

app.use(express.urlencoded({ extended: true, limit: "1024mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const morganFormat = ":method :url :status :response-time ms";

app.use(
	morgan(morganFormat, {
		stream: {
			write: message => {
				const logObject = {
					method: message.split(" ")[0],
					url: message.split(" ")[1],
					status: message.split(" ")[2],
					responseTime: message.split(" ")[3],
				};
				infoLog(logObject);
			},
		},
	}),
);

infoLog("Connecting To Redis");

redisClient.on("error", () => {
	errorLog("Error while connecting to Redis");
	process.exit(1);
});
redisClient.on("connect", () => {
	infoLog("Connected to Redis");
});

(() => connectRedis())();

// cron schedules
require("./schdules/schedules.js");

// router
app.use(require("./routes/index.js"));

app.use((req, res, next) => {
	errorLog(`ROUTE_NOT_FOUND: ${req.path}`);
});

app.use(errorHandler);



app.listen(process.env.PORT, () => {
	if (!isDevEnv())  {
		console.log("\x1b[43m\x1b[37m INFO : Running production build \x1b[0m")
	}
	console.log(`http://localhost:${PORT}`);
	infoLog(`Server started on ${PORT}`);
});
