document.addEventListener("DOMContentLoaded", function () {
	const secretKey = "form-filling-secret-key"; // Key for encryption/decryption

	// let website = window.location.origin;
	// website += `/api/get-ht-details`;
	// website += `?f_id=${ht.id}&r_id=${ht.ca_reg_id}&slot=${slot.slot}`;
	// console.log(website);

	let candidateData = {
		f_id: ht.id,
		r_id: ht.ca_reg_id,
		slot: slot.slot,
		roll_no: ht.ca_roll_number
	};


	const encryptedString = encryptString(JSON.stringify(candidateData), secretKey);
	console.log(encryptedString, "==encryptedString==");

	// new QRCode(document.getElementById("qr-code"), JSON.stringify(candidateData));
	new QRCode(document.getElementById("qr-code"), encryptedString.toString());

	// Encrypt a string
	function encryptString(plainText, secretKey) {
		const ciphertext = CryptoJS.AES.encrypt(
			plainText,
			secretKey,
		).toString();
		return ciphertext;
	}

	// Decrypt a string
	function decryptString(ciphertext, secretKey) {
		const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
		const originalText = bytes.toString(CryptoJS.enc.Utf8); // Convert back to UTF-8 string
		return originalText;
	}
});
