import { impDatesConstants } from "./client_constants.js";
import {
	_hideLoader,
	_showLoader,
	alertjs,
	checkProcessDates,
} from "./common.js";

$(function () {
	(function () {
		let paymentTimer = $("#payment-timer");
		let minutes = 2;
		let seconds = 0;
		setTime(minutes, seconds);

		let interval = setInterval(() => {
			setTime(minutes, seconds);
			if (minutes === 0 && seconds === 0) {
				clearInterval(interval);
			} else if (seconds === 0 && minutes !== 0) {
				minutes--;
				seconds = 59;
			} else if (seconds !== 0) {
				seconds--;
			}
		}, 1000);

		function setTime(minutes, seconds) {
			if (minutes === 0 && seconds === 0) {
				window.location.replace("/logout");
			}
			if (minutes <= 9) {
				minutes = "0" + minutes;
			}
			if (seconds <= 9) {
				seconds = "0" + seconds;
			}
			paymentTimer.html(`${minutes} : ${seconds}`);
		}
	})();

	$("#makePayment").click(async function (e) {
		$("#makePayment").attr("disabled", true);
		_showLoader();
		try {
			await checkProcessDates(impDatesConstants.pPaymentEndDate);
			await makePayment();
		} catch (error) {
			alertjs.warning(
				{
					t: "Warning",
					m:
						error?.message ||
						"Unable to process payments try again later",
				},

				function () {},
			);
		} finally {
			$("#makePayment").attr("disabled", false);
			_hideLoader();
		}
	});

	const makePayment = async () => {
		try {
			let _tokenRes = await fetch("/get-payment-details", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userDetails: { ...userDetails, r_id: regID, f_id: form_id },
				}),
			});
			let _data = await _tokenRes.json();

			if (!_tokenRes.ok) {
				throw new Error(
					_data?.usrMsg ||
						"Unable to process payments try again later",
				);
			}

			console.log(_data, "==_data==");

			addPaymentScript();
			openPay(_data.data, userDetails);
		} catch (error) {
			throw new Error(error?.message || "Please try again later");
		}
	};

	function addPaymentScript() {
		let cdnScript = document.createElement("script");
		cdnScript.setAttribute(
			"src",
			"https://psa.atomtech.in/staticdata/ots/js/atomcheckout.js",
		);
		document.head.appendChild(cdnScript);
	}

	function openPay({ token, merchId }, userDetails) {
		const options = {
			atomTokenId: token,
			merchId: merchId,
			custEmail: userDetails.email,
			custMobile: userDetails.contact,
			returnUrl: `${p.p_form_filling_site}/verify-payment`,
		};
		let atom = new AtomPaynetz(options, "uat");
	}

	// recheck payment status
	$(document).on("click", ".recheck-payment", async function () {
		let paymentDetails = $(this).attr("data-details");

		paymentDetails = JSON.parse(paymentDetails);

		// const userTxnDetails = {
		// 	merch_trans_id: 'Invoicelzxwzbz0',
		// 	merchTxnDate: '2024-08-17',
		// 	amount: '1.00',
		// };

		recheckPayment(paymentDetails);
	});

	(async function () {
		let successPaymentCount = 0;
		let paymentContainer = $("#payment-container");
		let processingContainer = $("#processing-container");
		let previewApplicationBtnContainer = $(
			"#preview-application-btn-container",
		);

		if (previous_pay_list.length === 0) {
			paymentContainer.removeClass("d-none");
			processingContainer.addClass("d-none");
			previewApplicationBtnContainer.addClass("d-none");
		} else if (previous_pay_list.length > 0) {
			paymentContainer.addClass("d-none");
			processingContainer.removeClass("d-none");
			previewApplicationBtnContainer.addClass("d-none");

			for (let i = 0; i < previous_pay_list.length; i++) {
				let currentPayment = previous_pay_list[i];

				if (currentPayment.pay_status_code === "OTS_0000") {
					successPaymentCount++;
					continue;
				}

				const isPaymentSuccessful = await recheckPayment(
					currentPayment,
					i,
				);
				if (isPaymentSuccessful) successPaymentCount++;
			}

			if (successPaymentCount > 0) {
				paymentContainer.addClass("d-none");
				processingContainer.addClass("d-none");
				previewApplicationBtnContainer.removeClass("d-none");
				let timeOut = 2;
				let interval = setInterval(() => {
					if (timeOut === 0) {
						const url = `/application?r=${regID}&f=${form_id}`;
						// $("#view-application-btn").attr("href", url);
						// window.location.assign(url);
						clearInterval(interval);
					}
					$("#opening-in").html(` : ${timeOut}`);
					timeOut--;
				}, 1000);
			}

			if (successPaymentCount === 0) {
				paymentContainer.removeClass("d-none");
				processingContainer.addClass("d-none");
				previewApplicationBtnContainer.addClass("d-none");
			}
		}
	})();

	async function recheckPayment(paymentDetails, idx) {
		if (!paymentDetails) return;

		let URL = `/v2/transaction-status?merch_trans_id=${paymentDetails.pay_merch_txn_id}&merchTxnDate=${paymentDetails.payStartDate}&amount=${paymentDetails.pay_amount}`;
		let currentPaymentStatusDiv = $(`.payment-status-${idx}`);

		currentPaymentStatusDiv.html(`<p>Loading...</p>`);

		try {
			let _res = await fetch(URL);
			let _data = await _res.json();
			console.log(_data, "-data");

			if (_data.call == 0) {
				currentPaymentStatusDiv.html(
					`<button class="c-button c-btn-danger">Failed</button>`,
				);
				return false;
			}
			if (_data.call == 1) {
				currentPaymentStatusDiv.html(
					`<button class="c-button c-btn-success">Success</button>`,
				);
				return true;
			}
			return false;
		} catch (error) {
			window.location.href = "/home";
		}
	}

	// =======================
	function readURL(input, id, _this, max_size, img_of, event) {
		$("#" + id).attr("src", "");
		if (input.files && input.files[0]) {
			const media_file = input.files[0]; // event is from the <input> event
			const filename = media_file.name;
			let last_dot = filename.lastIndexOf(".");
			let ext = filename.slice(last_dot + 1);
			let name = filename.slice(0, last_dot);
			if (
				ext == "jpeg" ||
				ext == "jpg" ||
				ext == "JPEG" ||
				ext == "JPG"
			) {
				var fileSize = (input.files[0].size / 1024).toFixed(2);
				if (fileSize < max_size && fileSize > 49) {
					var reader = new FileReader();
					reader.onload = function (e) {
						$("#" + id).attr("src", e.target.result);
					};
					reader.readAsDataURL(input.files[0]);
					var myModal = new bootstrap.Modal(
						document.getElementById("transactionModal"),
						{
							keyboard: false,
							backdrop: "static",
						},
					);
					myModal.show();
				} else {
					alertjs.warning(
						{
							t: `${img_of} must be less than ${Math.round(
								(max_size / 1024).toFixed(2),
							)} mb and greater than 50 kb`,
							m: `Current File Size is: ${(
								fileSize / 1024
							).toFixed(2)} mb i.e. ${fileSize} kb`,
						},
						function () {
							$(_this).val("");
						},
					);
				}
			} else {
				alertjs.warning(
					{
						t: img_of + " must be in JPEG or JPG format",
						m: "",
					},
					function () {
						$(_this).val("");
					},
				);
			}
		} else {
		}
	}
	$("#transactionFile").change(function (e) {
		readURL(this, "img-transaction", $(this), 1024, "Payment Receipt", e);
	});

	$(".num").on("keyup", function () {
		var $input = $(this);
		$input.val($input.val().replace(/[^\d]+/g, ""));
	});
	$("#challanDate").datepicker({
		dateFormat: "dd-mm-yy",
		minDate: new Date(2023, 6, 4),
		maxDate: new Date(),
	});
	$("#challanDate").keypress(function (e) {
		return false;
	});
	$("#challanDate").keydown(function (e) {
		return false;
	});

	$("#paymentAgreement").click(function (e) {
		var checked = $(this).prop("checked");
		console.log(1);
		if (checked == true) {
			$(this).prop("disabled", true);
			$("#makePayment").removeClass("d-none");
		}
	});

	$("#makePaymentDemo").click(function (e) {
		var date = $("#challanDate").datepicker("getDate");
		var challanTID = $("#challanTransactionId").val();
		var challanCTID = $("#challanConfirmTransactionId").val();

		var transactionID = $("#challanTransactionId2").val();
		var transactionCID = $("#challanConfirmTransactionId2").val();

		var challanConfirm = $("#challanConfirm").prop("checked");
		var photo = $("#transactionFile").prop("files");

		if (date == null) {
			alertjs.warning(
				{
					t: "Warning",
					m: "Select Transaction Deposit Date",
				},
				function () {
					$("#challanDate").focus();
				},
			);
			return false;
		}

		// transactionCID

		if (challanTID == "" && transactionID == "") {
			alertjs.warning(
				{
					t: "Warning",
					m: "Enter Transaction ID Or UTR Number",
				},
				function () {
					$("#challanTransactionId").focus();
				},
			);
			return false;
		}

		if (challanTID !== "") {
			if (challanTID !== challanCTID) {
				alertjs.warning(
					{
						t: "Warning",
						m: "UTR Number And Confirm UTR Number doesn't Match",
					},
					function () {
						$("#challanTransactionId").focus();
					},
				);
				return false;
			}
		}

		if (transactionID !== "") {
			if (transactionID !== transactionCID) {
				alertjs.warning(
					{
						t: "Warning",
						m: "Transaction ID And Confirm Transaction ID doesn't Match",
					},
					function () {
						$("#challanTransactionId").focus();
					},
				);
				return false;
			}
		}

		if (challanConfirm == false) {
			alertjs.warning(
				{
					t: "Warning",
					m: "select the check box.",
				},
				function () {},
			);
			return false;
		}

		if (photo.length == 0) {
			alertjs.warning(
				{
					t: "Upload Transaction Receipt.",
					m: "",
				},
				function () {},
			);
			return false;
		}
		let date_1 = `${date.getDate()}-${
			date.getMonth() + 1
		}-${date.getFullYear()}`;
		let formData = new FormData();
		formData.append("r", regID),
			formData.append("f", form_id),
			formData.append("amount", 944),
			formData.append("razorpay_order_id", date_1),
			formData.append("razorpay_payment_id", challanTID),
			formData.append("razorpay_signature", date),
			formData.append("process", mainTitle),
			formData.append("name", userDetails.name),
			formData.append("email", userDetails.email),
			formData.append("contact", userDetails.contact),
			formData.append("post", userDetails.post),
			formData.append("transection_no", transactionID),
			// Attach file
			formData.append("doc", $("input[type=file]")[0].files[0]);
		date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

		$("#makePaymentDemo").prop("disabled", true).html("Saving Details...");
		$("#loadMyPage").removeClass("d-none");
		$.ajax({
			method: "POST",
			url: "/api/payment/verifyDemo",
			data: formData,
			type: "POST",
			contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
			processData: false, // NEEDED, DON'T OMIT THIS
		})
			.done(function (data, status) {
				var json = data;
				if (json.call == 1) {
					$("#loadMyPage").addClass("d-none");
					alertjs.success(
						{
							t: "Success",
							m: "Your payment details saved successfully.",
						},
						function () {
							window.location.reload();
						},
					);
				}
				if (json.call == 0) {
					$("#loadMyPage").addClass("d-none");
					alertjs.warning(
						{
							t: "Payment Fail",
							m: "Unable to save Payment details, Try Again Or Contact On Helpline For Details.. Error Code 800",
						},
						function () {
							window.location.reload();
						},
					);
				}
			})
			.fail(function (error) {
				$("#loadMyPage").addClass("d-none");
				alertjs.warning(
					{
						t: "Server Payment Fail",
						m: "Unable to save Payment details, Try Again Or Contact On Helpline For Details.. Error Code 801",
					},
					function () {
						window.location.reload();
					},
				);
			})
			.always(function () {
				console.log("done");
			});
	});
});
var paymentOrderDetails = {};
var payment = {
	makeCheckOut: function () {
		var options = {
			key: "rzp_test_VZlpN0aNeHEBOL", //Enter your razorpay key
			currency: "INR",
			name: mainTitle,
			description: subTitle,
			image: "https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg",
			order_id: paymentOrderDetails.id,
			handler: function (response) {
				payment.paymentConfirmation(response);
			},
			theme: {
				color: "#227254",
			},
			prefill: userDetails,
			modal: {
				ondismiss: function () {
					alertjs.warning(
						{
							t: "Payment Was Canceled By You!!!",
							m: "Try Again.",
						},
						function () {
							window.location.reload();
						},
					);
				},
			},
		};
		var rzp1 = new Razorpay(options);
		rzp1.open();
	},
	paymentConfirmation: function (response) {
		$("#makePayment")
			.prop("disabled", true)
			.html("Verifying your payment..., don't refresh page.");
		$.ajax({
			method: "POST",
			url: "/api/payment/verify",
			data: {
				r: regID,
				f: form_id,
				amount: Number(paymentOrderDetails.amount) / 100,
				razorpay_order_id: response.razorpay_order_id,
				razorpay_payment_id: response.razorpay_payment_id,
				razorpay_signature: response.razorpay_signature,
				process: mainTitle,
				name: userDetails.name,
				email: userDetails.email,
				contact: userDetails.contact,
				post: userDetails.post,
			},
		})
			.done(function (data, status) {
				var json = data;
				if (json.call == 1) {
					alertjs.success(
						{
							t: "Success",
							m: "Your payment is done successfully. Don't Refresh The Page",
						},
						function () {
							window.location.reload();
						},
					);
				}
				if (json.call == 0) {
					alertjs.warning(
						{
							t: "Payment Fail",
							m: "Your Payment Transaction Was Failed, Try Again Or Contact On Helpline For Details.. Error Code 800",
						},
						function () {
							window.location.reload();
						},
					);
				}
			})
			.fail(function (error) {
				alertjs.warning(
					{
						t: "Server Payment Fail",
						m: "Your Payment Transaction Was Failed, Try Again Or Contact On Helpline For Details. Error Code 801.",
					},
					function () {
						window.location.reload();
					},
				);
			})
			.always(function () {
				console.log("done");
			});
	},
};
