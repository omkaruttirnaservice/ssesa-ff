var nodemailer = require("nodemailer");
let { google } = require("googleapis");
let CLIENT_ID = "";
let CLIENT_SECRET = "";
let REDIRECT_URI = "";
let REFRESH_TOKEN = "";
const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI,
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
module.exports = {
	sendEmailGmailPromise: async function (email, context) {
		try {
			const accessToken = await oAuth2Client.getAccessToken();
			var transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					type: "OAuth2",
					user: "noreply.jalna.mucbfexam@gmail.com",
					clientId: CLIENT_ID,
					clientSecret: CLIENT_SECRET,
					refreshToken: REFRESH_TOKEN,
					accessToken: accessToken,
				},
			});

			var mailOptions = {
				from: "help.mucbfexam@gmail.com",
				to: email,
				subject: context.subject,
				html: context.html,
			};
			const info = await transporter.sendMail(mailOptions);
			return Promise.resolve({ cal: info.response });
		} catch (error) {
			return Promise.reject({ cal: error });
		}
	},
};
