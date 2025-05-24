import { alertjs, _showLoader, _hideLoader } from "./common.js";

$(function () {
	$("#submitPreview").on("click", function () {
		_showLoader();
		if (validatePreview()) {
			var $this = $("#submitPreview");
			$this
				.prop("disabled", true)
				.html(
					`<i class="fa-solid fa-floppy-disk mr-2" aria-hidden="true"> Saving Preview...   </i>`,
				);

			$.ajax({
				method: "POST",
				url: "/sumbit-preveiw",
				data: {},
			})
				.done(function (data, status) {
					_hideLoader();
					$this
						.prop("disabled", false)
						.html(
							`<i class="fa-solid fa-floppy-disk mr-2" aria-hidden="true"> Submit   </i>`,
						);
					var json = data;
					if (json._call == 1) {
						alertjs.success(
							{
								t: "Application Preview Submitted Successfully",
								m: "",
							},
							function () {
								window.location.assign(
									`/payment-page?r=${regID}&f=${form_id}`,
								);
							},
						);

						return false;
					}
					if (json._call == 1) {
						alertjs.warning(
							{
								t: "Session Expires, Login Again",
								m: "",
							},
							function () {
								window.location.assign("/home");
							},
						);
						return false;
					}
				})
				.fail(function (error) {
					_hideLoader();
					$this
						.prop("disabled", false)
						.html(
							`<i class="fa-solid fa-floppy-disk mr-2" aria-hidden="true"> Submit   </i>`,
						);

					alertjs.error(function () {
						console.log(error);
					});
				})
				.always(function () {
					_hideLoader();
					$this
						.prop("disabled", false)
						.html(
							`<i class="fa-solid fa-floppy-disk mr-2" aria-hidden="true"> Submit   </i>`,
						);
				});
		} else {
			_hideLoader();
		}
	});
	$("#back").on("click", function () {
		window.location.assign("/document-upload/" + regString);
	});
});

function validatePreview() {
	if ($("#chkPhoto").prop("checked") == false) {
		alertjs.warning(
			{
				t: "Confirm Your Photo.",
				m: "",
			},
			function () {},
		);

		return false;
	}

	if ($("#chkSignature").prop("checked") == false) {
		alertjs.warning(
			{
				t: "Confirm Your Signature.",
				m: "",
			},
			function () {},
		);
		return false;
	}
	if ($("#chkIagree").prop("checked") == false) {
		alertjs.warning(
			{
				t: "Declaration is Not accepted.",
				m: "",
			},
			function () {},
		);
		return false;
	}
	// if ($('#chkIagreeTip').prop('checked') == false) {
	// 	alertjs.warning(
	// 		{
	// 			t: 'agree to Important Note.',
	// 			m: '',
	// 		},
	// 		function () {}
	// 	);
	// 	return false;
	// }
	return true;
}
