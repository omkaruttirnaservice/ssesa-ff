const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

const emailController = {
	sendEmailView: function (req, res) {
		console.log("email view rendering");
		res.render("master/email/emailPage.pug", {
			_user: req.session.User,
			pageTitle: "Send e-Mail",
		});
	},

	sendRegistrationEmail: data => {
		let transporter = getEmailTransporter();
		const mailOptions = {
			from: process.env.NODE_MAILER_EID,
			to: data.email,
			subject: `SZNSBAL Recruitment Process`,
			html: `<p> Dear ${data.ub_first_name} ${data.ub_middle_name} ${data.ub_last_name},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
					Your registration for SZNSBAL recruitment is done successfully.
					Your login details are as, <br> 
					UserName: <strong>${data.r_id} </strong> <br> 
					Password: <strong>${data.ub_password} </strong> <br>
					Do not share the credentials.<br>Thank you.</p>`,
		};

		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log(info);
			}
		});
	},

	sendSummaryEmail: data => {
		let transporter = getEmailTransporter();
		const mailOptions = {
			from: process.env.NODE_MAILER_EID,
			to: data.email,
			subject: `${data.process_code} summary.`,
			html: `

						<p style="font-style: italic;">Date : ${new Date().toLocaleDateString("IN")}</p>
						<p style="font-style: italic;">Time : ${new Date().toLocaleTimeString()}</p>

						<p>Total Registration : ${data.total_registrations}</p>
						<p>Total Applications : ${data.application_status.application_count}</p>
						<p> Total Preview Done : ${data.application_status.preview_done_count} </p>
						<p> Total Payment : ${data.application_status.payment_done_count} </p>
						
					`,
		};

		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log(info);
			}
		});
	},
};

const getEmailTransporter = () => {
	const transporter = nodemailer.createTransport({
		service: "Gmail",
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env.NODE_MAILER_EID,
			pass: process.env.NODE_MAILER_KEY,
		},
	});
	return transporter;
};

module.exports = emailController;

// <p> Total General Details Done : ${
// 	data.application_status.general_details_done_count
// } </p>
// <p> Total Document Details Done : ${
// 	data.application_status.document_details_done_count
// } </p>
