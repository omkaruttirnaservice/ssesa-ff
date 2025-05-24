const { _showLoader, _hideLoader } = require("./common.js");

$(function () {
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
				if (fileSize < max_size && fileSize > 1) {
					var reader = new FileReader();
					reader.onload = function (e) {
						const result = e.target.result;
						$("#" + id).attr("src", result);
						$("#txn-receipt-preview").attr("src", result);
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
		readURL(this, "img-transaction", $(this), 5000, "Payment Receipt", e);
	});

	$(".num").on("keyup", function () {
		var $input = $(this);
		$input.val($input.val().replace(/[^\d]+/g, ""));
	});
	$("#txn-deposit-date").datepicker({
		dateFormat: "dd-mm-yy",
		minDate: new Date(2023, 6, 4),
		maxDate: new Date(),
	});
	$("#txn-deposit-date").keypress(function (e) {
		return false;
	});
	$("#txn-deposit-date").keydown(function (e) {
		return false;
	});

	$("#paymentAgreement").click(function (e) {
		var checked = $(this).prop("checked");
		if (checked == true) {
			$(this).prop("disabled", true);
			$("#makePayment").removeClass("d-none");
		}
	});

	$("#makeOfflinePayment").click(function (e) {
		const thisBtn = $(this);
		const txnDepositDate = $("#txn-deposit-date").val();

		const utrNumber = $("#utr-number").val();
		const confirmUtrNumber = $("#confirm-utr-number").val();

		const txnId = $("#txn-id").val();
		const confirmTxnId = $("#confirm-txn-id").val();

		const confirmDetails = $("#confirm-details").prop("checked");

		const photo = $("#transactionFile").prop("files");

		if (!txnDepositDate) {
			alertjs.warning(
				{
					t: "Warning",
					m: "Select Transaction Deposit Date",
				},
				function () {
					$("#txn-deposit-date").focus();
				},
			);
			return false;
		}

		if (utrNumber == "" && txnId == "") {
			alertjs.warning(
				{
					t: "Warning",
					m: "Enter Transaction ID Or UTR Number",
				},
				function () {
					$("#utr-number").focus();
				},
			);
			return false;
		}

		if (utrNumber !== "") {
			if (utrNumber !== confirmUtrNumber) {
				alertjs.warning(
					{
						t: "Warning",
						m: "UTR Number And Confirm UTR Number doesn't Match",
					},
					function () {
						$("#utr-number").focus();
					},
				);
				return false;
			}
		}

		if (txnId !== "") {
			if (txnId !== confirmTxnId) {
				alertjs.warning(
					{
						t: "Warning",
						m: "Transaction ID And Confirm Transaction ID doesn't Match",
					},
					function () {
						$("#txn-id").focus();
					},
				);
				return false;
			}
		}

		if (confirmDetails == false) {
			alertjs.warning(
				{
					t: "Warning",
					m: "confirm declaration.",
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

		let formData = new FormData();
		formData.append("r", regID);
		formData.append("f", form_id);
		formData.append("txnDepositDate", txnDepositDate);
		formData.append("utrNumber", utrNumber);
		formData.append("txnId", txnId);
		formData.append("paymentMode", "OFFLINE");
		formData.append("totalPaymentAmount", totalPaymentAmount);
		// formData.append("paymentReceipt", $("input[type=file]")[0].files[0]);

		$("#makePaymentDemo").prop("disabled", true).html("Saving Details...");
		_showLoader();

		formData.set("uploadImg", $("input[type=file]")[0].files[0]);

		formData.set("img_type", "offline_payment_recipt");

		formData.set("process_name", p.name);
		formData.set("app_id", form_id);
		formData.set("folderName", `offline-payment-receipts`);
		saveOfflinePaymentDetails(formData, thisBtn);

		// $.ajax({
		// 	method: "POST",
		// 	url: "/payment/offline",
		// 	data: formData,
		// 	type: "POST",
		// 	contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
		// 	processData: false, // NEEDED, DON'T OMIT THIS
		// })
		// 	.done(function (data, status) {
		// 		var json = data;
		// 		console.log(json, "==json==");

		// 		if (data.statusCode == 201) {
		// 			$("#loadMyPage").addClass("d-none");
		// 			alertjs.success(
		// 				{
		// 					t: "Success",
		// 					m: data.usrMsg,
		// 				},
		// 				function () {
		// 					window.location.reload();
		// 				},
		// 			);
		// 		} else {
		// 			$("#loadMyPage").addClass("d-none");
		// 			alertjs.warning(
		// 				{
		// 					t: "Payment Fail",
		// 					m: "Unable to save Payment details, Try Again Or Contact On Helpline For Details.. Error Code 800",
		// 				},
		// 				function () {
		// 					window.location.reload();
		// 				},
		// 			);
		// 		}
		// 	})
		// 	.fail(function (error) {
		// 		console.log(error, "==error==");
		// 		return;
		// 		$("#loadMyPage").addClass("d-none");
		// 		alertjs.warning(
		// 			{
		// 				t: "Server Payment Fail",
		// 				m: "Unable to save Payment details, Try Again Or Contact On Helpline For Details.. Error Code 801",
		// 			},
		// 			function () {
		// 				window.location.reload();
		// 			},
		// 		);
		// 	})
		// 	.always(function () {
		// 		console.log("done");
		// 	});
	});

	async function saveOfflinePaymentDetails(formData, thisBtn) {
		try {
			// uploading payment receipt to s3 bucket

			thisBtn.attr("disabled", true).html("Uploading...");
			const _uploadResp = await fetch("/aws/upload", {
				method: "POST",
				body: formData,
			});
			const _jsonRep = await _uploadResp.json();
			console.log(_jsonRep, "==_jsonRep==");

			// console.log(JSON.parse(_jsonRep.data), "_jsonRep");
			let fileName = JSON.parse(_jsonRep.data).fileName;

			formData.set("s3FileName", fileName);

			await saveDetailsToDb(formData, thisBtn);
		} catch (error) {
			console.log(error, "==error==");
		}
	}

	async function saveDetailsToDb(formData, thisBtn) {
		try {
			const _uploadResp = await fetch("/payment/offline", {
				method: "POST",
				body: formData,
			});
			const _jsonRep = await _uploadResp.json();
			if (_jsonRep.statusCode == 201) {
				alertjs.success(
					{
						t: "Successful",
						m: _jsonRep.usrMsg,
					},
					() => {},
				);
			} else {
				alertjs.warning(
					{
						t: "Warning",
						m: _jsonRep.usrMsg,
					},
					() => {},
				);
			}
		} catch (error) {
			alertjs.warning(
				{
					t: "Warning",
					m: "Unable to save payment right now.",
				},
				() => {},
			);
		} finally {
			thisBtn.attr("disabled", false).html("Upload");
			_hideLoader();
		}
	}
});
