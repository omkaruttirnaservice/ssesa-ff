module.exports.sms = {
	regSMS: function ({ username, password }) {
		return `Dear Applicant, Your registration and payment for recruitment examination is successful. Your login details are as Username:: ${username} Password:: ${password} Do not share the credentials. UTRLLP`;
	},

	newRegistrationSMS: function ({ username, password }) {
		// return `Dear Applicant, Your registration and payment for recruitment examination is successful. Your login details are as Username:: ${username} Password:: ${password} Do not share the credentials. UTRLLP`;
		// return `Dear Applicant, Your registration and payment for recruitment examination is successful. Your login details are as Username:: ${username} Password:: ${password} Do not share the credentials. UTRLLP`;

		return `Dear Applicant, Your registration for recruitment examination is successful. Your login details are as Username:: ${username} Password:: ${password} Do not share the credentials. UTRLLP`
	},
};
