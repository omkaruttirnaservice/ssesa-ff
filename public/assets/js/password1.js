$(function () {
	$("#verifyUserDetails").click(function (event) {
		$this = $("#verifyUserDetails");
		event.preventDefault();
		validate;
		if ($("#forgetUserName").valid()) {
			$this.prop("disabled", true).html("Validating Details...");
			$.ajax({
				method: "post",
				url: "/getVerifyRecoveryDetails",
				data: {
					aadharNumber: $('input[name="forAadharNumber"]').val(),
					userId: $('input[name="forgetUserName"]').val(),
				},
			})
				.done(function (data) {
					$this.prop("disabled", false).html("Verify Details");
					var json_data = data;
					switch (json_data._call) {
						case 1:
							// $("#otpMobile").html(`<td colspan="2">
							//                                   1) <input id="otp1" type="radio" class="" name="otpType" value="m">
							//                                   Send OTP to <strong>${json_data.data.mobile}</strong> mobile number.
							//                        </td>`);
							$("#otpEmail").html(`<td colspan="2">
                            Your Password is <strong>${json_data.data.password}</strong>
                          </td>`);
							$("#user").prop("readonly", true);
							$("#addhar").prop("readonly", true);
							// var parent = $this.parent("td");
							// $(parent).html(
							//   `<button class="form-control btn btn-outline-success" id="sendOTP">Send OTP</button>`
							// );
							break;
						case 0:
							alert("details not found,try again");
							break;
					}
				})
				.fail(function (error) {
					$this.prop("disabled", false).html("Verify Details");
					alertjs.error(function () {
						console.log(error);
					});
				})
				.always(function () {
					$this.prop("disabled", false).html("Verify Details");
					console.log("Done");
				});
		}
	});

	$(document).on("click", "#sendOTP", function (event) {
		$this = $("#sendOTP");

		event.preventDefault();
		validate;
		if ($("#forgetUserName").valid()) {
			var data = {
				aadharNumber: $('input[name="forAadharNumber"]').val(),
				userId: $('input[name="forgetUserName"]').val(),
				type: "",
				attempt: 1,
			};
			if ($("#otp1").prop("checked") == true) {
				data.type = "m";
			}
			if ($("#otp2").prop("checked") == true) {
				data.type = "e";
			}
			if (data.type === "") {
				alert("Select OTP type");
				return false;
			}
			$this.prop("disabled", true).html("Sending OTP...");
			$.ajax({
				method: "post",
				url: "/sendOTP",
				data: data,
			})
				.done(function (data) {
					$this.prop("disabled", false).html("Send OTP");
					var json_data = data;
					switch (json_data._call) {
						case 1:
							alert("OTP sent Successfully.");
							var parent = $this.parent("td");
							$(parent).html(
								`<button class="form-control btn btn-outline-success" id="submitOTP">Verify OTP</button>`,
							);
							$("#otp").html(`<td colspan="2">
                        <input placeholder="Enter OTP" id="otpNumber" type="text" class="form-control numaric valid" value=""> 
                        <button class="btn btn-danger btn-sm float-right mt-2" id="reSendOTP">Resend OTP</button>
                    </td>`);
							break;
						case 2:
							alert("unable to create otp,try again");
							break;
						case 3:
							alert("fail to send otp,try again");
							break;
						case 0:
							alert("details not found,try again");
							window.location.reload();
							break;
					}
				})
				.fail(function (error) {
					$this.prop("disabled", false).html("Send OTP");
					alertjs.error(function () {
						console.log(error);
					});
				})
				.always(function () {
					$this.prop("disabled", false).html("Send OTP");
					console.log("Done");
				});
		}
	});

	$(document).on("click", "#reSendOTP", function (event) {
		$this = $("#reSendOTP");
		$this1 = $("#submitOTP");

		event.preventDefault();
		validate;
		if ($("#forgetUserName").valid()) {
			var data = {
				aadharNumber: $('input[name="forAadharNumber"]').val(),
				userId: $('input[name="forgetUserName"]').val(),
				type: "",
				attempt: 2,
			};
			if ($("#otp1").prop("checked") == true) {
				data.type = "m";
			}
			if ($("#otp2").prop("checked") == true) {
				data.type = "e";
			}
			if (data.type === "") {
				alert("Select OTP type");
				return false;
			}
			$this.prop("disabled", true).html("Re Sending OTP...");
			$this1.prop("disabled", true);
			$.ajax({
				method: "post",
				url: "/sendOTP",
				data: data,
			})
				.done(function (data) {
					$this.prop("disabled", false).html("Verify OTP");
					$this1.prop("disabled", false);
					var json_data = data;
					switch (json_data._call) {
						case 1:
							alert("OTP Re-sent Successfully");
							var parent = $this.parent("td");
							$(parent).html(
								`<button class="form-control btn btn-outline-success" id="submitOTP">Verify OTP</button>`,
							);
							$("#otp").html(`<td colspan="2">
                        <input placeholder="Enter OTP" id="otpNumber" type="text" class="form-control numaric valid" value=""> 
                        <button class="btn btn-danger btn-sm float-right mt-2" id="reSendOTP">Resend OTP</button>
                    </td>`);
							break;
						case 2:
							alert("unable to create otp,try again");
							break;
						case 3:
							alert("fail to send otp,try again");
							break;
						case 0:
							alert("details not found,try again");
							window.location.reload();
							break;
					}
				})
				.fail(function (error) {
					$this.prop("disabled", false).html("Verify OTP");
					$this1.prop("disabled", false);
					alertjs.error(function () {
						console.log(error);
					});
				})
				.always(function () {
					$this1.prop("disabled", false);

					console.log("Done");
				});
		}
	});

	$(document).on("click", "#submitOTP", function (event) {
		$this = $("#submitOTP");
		event.preventDefault();
		validate;
		if ($("#forgetUserName").valid()) {
			var data = {
				aadharNumber: $('input[name="forAadharNumber"]').val(),
				userId: $('input[name="forgetUserName"]').val(),
				otpNumber: $("#otpNumber").val(),
			};
			if (data.otpNumber == "") {
				alert("Enter OTP");
				return false;
			}

			$this.prop("disabled", true).html("Verifying OTP...");
			$.ajax({
				method: "post",
				url: "/getPasswordRecovery",
				data: data,
			})
				.done(function (data) {
					$this.prop("disabled", false).html("Verify OTP");
					var json_data = data;
					switch (json_data._call) {
						case 1:
							alert("OTP verified successfully.");
							var parent = $this.parent("td");
							$(parent).addClass("d-none");
							$(parent).html("");
							$("#otp").html(``);
							$("#otpMobile").html(``);
							$("#otpEmail").html(``);
							$("#showPass").html(
								`Your Password is: ${json_data.data}`,
							);
							break;

						case 0:
							alert("Invalid OTP , Try Again.");
							break;
					}
				})
				.fail(function (error) {
					$this.prop("disabled", false).html("Verify OTP");
					alertjs.error(function () {
						console.log(error);
					});
				})
				.always(function () {
					console.log("Done");
				});
		}
	});

	/*
    $("#verifyUserDetails").click(function (event) {
    $this = $("#verifyUserDetails");
    $this.prop("disabled", true).html("Validating Details...");
    event.preventDefault();
    validate;
    if ($("#forgetUserName").valid()) {
      $.ajax({
        method: "post",
        url: "/getPasswordRecovery",
        data: {
          aadharNumber: $('input[name="forAadharNumber"]').val(),
          userId: $('input[name="forgetUserName"]').val(),
        },
      })
        .done(function (data) {
          $this.prop("disabled", false).html("Verify Details");
          var json_data = data;
          switch (json_data._call) {
            case 1:
              break;
            case 0:
              break;
          }
        })
        .fail(function (error) {
          $this.prop("disabled", false).html("Verify Details");
          alert("Server Error Contact Admin");
          console.log(error);
        })
        .always(function () {
          $this.prop("disabled", false).html("Verify Details");
          console.log("Done");
        });
    }
  }); */
});
var validate = $("#forgetUserName").validate({
	rules: {
		forgetUserName: {
			required: true,
			number: true,
			minlength: 1,
			maxlength: 8,
		},
		forAadharNumber: {
			required: true,
			number: true,
			minlength: 12,
			maxlength: 12,
		},
	},
	messages: {
		forgetUserName: {
			required: "&nbsp;Enter Username.",
			number: "&nbsp;Invalid Username.",
			minlength: "&nbsp;Username Must Be {0} Digits.",
			maxlength: "&nbsp;Username     Be At Least {0} Digits.",
		},
		forAadharNumber: {
			required: "&nbsp;Enter Aadhaar Card Number.",
			number: "&nbsp;Invalid Aadhaar Card Number.",
			minlength: "&nbsp;Aadhaar Card Number Must Be {0} Digits.",
			maxlength: "&nbsp;Aadhaar Card Number Be At Least {0} Digits.",
		},
	},
	errorPlacement: function (error, element) {
		error.insertAfter(element);
		$("label[class='error']").addClass("text-danger font-weight-bolder");
	},
});
