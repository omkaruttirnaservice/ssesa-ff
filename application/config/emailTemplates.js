module.exports.paymentPending = (details = {}) => ({
	subject: "Regarding Payment For दि जालना पिपल्स को-ऑप. बँक लि., जालना",
	html: `<p>Dear candidate,<p><br>
        <p style="color:#1c7107;">With reference to our advertisement for the post of Trainee Clerk in Amravati Mandal, Loksatta & Lokmat newspapers on July 06, 2023 and your response to the same through application, you are hereby requested to kindly remit the requisite fee of Rs. 944/- through NEFT/RTGS/GPAY or Phone Pay at below mentioned payment details on or before July 20, 2023:</p><br>
        <p>Bank Account Name: <strong>The Maharashtra Urban Co-operative Banks Federation Ltd.</strong><br/>
        Bank Name: <strong>UCO Bank,  Wadala Branch,  Mumbai – 400031</strong><br/>
        Saving A/c No.: <strong>09780110032961</strong><br/>
        IFSC Code: <strong>UCBA0000978</strong></p>`,
});

module.exports.registrationDone = (details = {}) => ({
	subject: "दि जालना पिपल्स को-ऑप. बँक लि., जालना Recruitment Process",
	html: `<span>Hello, </span><br/>
          <span>Greetings of the day!</span>
          <p>Dear ${details.ub_first_name} ${details.ub_middle_name} ${details.ub_last_name},<p><br>
          <p style="color:#1c7107;">Your registration  for दि जालना पिपल्स को-ऑप. बँक लि., जालना recruitment is successful.</p><br>
          <p>
          Your login details are as<br/>
          Username::<strong>${details.r_id}</strong><br/>
          Password::<strong>${details.ub_password}</strong><br/>
          <strong><mark>Do not share the credentials.</mark></strong><br/></p>
          <p><i>Note: This is a system generated email.</i></p>
          <p>Thanks & Regards,<br/>
          HELP MUCBF TEAM<br/>
          CONTACT NO ::+91-782080844</p>`,
});

module.exports.candidateGuidelines = (details = {}) => ({
	subject: "दि जालना पिपल्स को-ऑप. बँक लि., जालना EXAMINATION GUIDELINES",
	html: `<span>Good Afternoon, </span><br/>
          <span>Greetings of the day!</span>
          <p>The following important guidelines related to examination are mentioned on the website:<p><br>
          <p style="color:#1c7107;"><b>1. Important Instructions For Candidates.</b></p><br>
          <p style="color:#1c7107;"><b>2. Valid Candidate List.</b></p><br>
          <p>Kindly visit the official website <a style="color:red" href="https://www.abhinandan.mucbf.in/" target="_bank">www.abhinandan.mucbf.in</a> for more details.
          <br/>
          HELP MUCBF TEAM<br/>
          CONTACT NO ::+91-782080844</p>`,
});
