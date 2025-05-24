$(function () {
	/*   $('#proccessNewReg').on('click', function () {
        window.location.replace('/forms/new-registration.html');
    });
    $('#personalDetails').on('click', function () {
        window.location.replace('/forms/details.html');
    });*/
	// $('#submituploadDetails').on('click', function () {
	//     window.location.replace('/forms/preview.html');
	// });
});

// IN KB
const MAX_FILE_SIZE = 100;

function readURL(input, id, _this, max_size, img_of, event) {
	if (input.files && input.files[0]) {
		const media_file = input.files[0]; // event is from the <input> event
		const filename = media_file.name;
		let last_dot = filename.lastIndexOf(".");
		let ext = filename.slice(last_dot + 1);
		let name = filename.slice(0, last_dot);
		if (ext == "jpeg" || ext == "jpg") {
			var fileSize = (input.files[0].size / 1024).toFixed(2);
			if (fileSize < max_size && fileSize > 19) {
				var reader = new FileReader();
				reader.onload = function (e) {
					$("#" + id).attr("src", e.target.result);
				};
				reader.readAsDataURL(input.files[0]);
			} else {
				alertjs.warning(
					{
						t: `${img_of} must be less than ${max_size} kb and greater than 20 kb`,
						m: `Current File Size is: ${fileSize} kb`,
					},
					function () {
						$(_this).val("");
					},
				);
			}
		} else {
			alertjs.warning(
				{
					t: img_of.toUpperCase() + " MUST BE JPG / JPEG ONLY only",
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

$("#imageUpload").change(function (e) {
	readURL(this, "imageUploadPreview", $(this), MAX_FILE_SIZE, "Photo", e);
});

$("#signUpload").change(function (e) {
	readURL(this, "signUploadPreview", $(this), MAX_FILE_SIZE, "Signature", e);
});
$("#imageUpload").val("");
$("#signUpload").val("");

$(document).ready(function () {
	$("#back").on("click", function () {
		window.location.assign("/education-details/" + regString);
		return false;
	});

	console.log({ cfi: form_id, cri: regID }, "---");
	$(".uploadImage").submit(function (e) {
		e.preventDefault();
		var sign = $("#signUpload").prop("files");
		var photo = $("#imageUpload").prop("files");
		if (isP == false && photo.length == 0) {
			alertjs.warning(
				{
					t: "Upload Photograph.",
					m: "",
				},
				function () {},
			);
			return false;
		}

		if (isS == false && sign.length == 0) {
			alertjs.warning(
				{
					t: "Upload Signature",
					m: "",
				},
				function () {},
			);
			return false;
		}
		if (photo.length == 0 && sign.length == 0) {
			window.location.assign("/application-preview/" + regString);
			return false;
		}

		var $this = $("#submituploadDetails");
		$this
			.prop("disabled", true)
			.html(
				`<i class="fa fa-floppy-o mr-2" aria-hidden="true"> Uploading Details...   </i>`,
			);
		$("#loadMyPage").removeClass("d-none");
		$(this).ajaxSubmit({
			data: { cfi: form_id, cri: regID },
			contentType: "application/json",
			success: function (data) {
				$("#loadMyPage").addClass("d-none");
				$this
					.prop("disabled", false)
					.html(
						`<i class="fa fa-floppy-o mr-2" aria-hidden="true"> Submit </i>`,
					);
				var json = data;
				switch (json._call) {
					case 1:
						alertjs.success(
							{
								t: json.msg,
								m: "",
							},
							function () {
								window.location.assign(
									"/application-preview/" + regString,
								);
							},
						);
						break;

					default:
						alertjs.warning(
							{
								t: json.msg,
								m: "",
							},
							function () {},
						);

						break;
				}
			},
			error: function (error) {
				$("#loadMyPage").removeClass("d-none");
				$this
					.prop("disabled", false)
					.html(
						`<i class="fa fa-floppy-o mr-2" aria-hidden="true"> Submit </i>`,
					);
				alertjs.warning(
					{
						t: error.msg,
						m: "",
					},
					function () {
						console.log(error);
					},
				);
			},
		});
		return false;
	});
});
