var Razorpay = require("razorpay");
let instance = new Razorpay({
	key_id: "rzp_test_VZlpN0aNeHEBOL", // your `KEY_ID`
	key_secret: "oA0ygiaELrNyziKLoYLchCy9", // your `KEY_SECRET`
});
module.exports = instance;
