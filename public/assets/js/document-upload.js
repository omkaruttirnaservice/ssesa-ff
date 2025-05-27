import { alertjs, _showLoader, _hideLoader } from "./common.js";

// IN KB
const MAX_FILE_SIZE = 100;

const mediaItems = [];
const AADHAAR_IMG = "aadharCard";
const PHOTO_IMG = "photo";
const SIGN_IMG = "sign";

async function compressFile(file) {
	if (!file) return;
	const options = {
		maxSizeMB: 0.1,
		useWebWorker: true,
		onProgress: progress => {
			console.log(progress);
		},
	};

	try {
		const compressedFile = await imageCompression(file, options);
		if ((compressedFile.size / 1024).toFixed(2) > MAX_FILE_SIZE) {
			return await compressFile(compressedFile);
		}
		return compressedFile;
	} catch (error) {
		console.log(error, "compression file");
	}
}

function calcFileSizeInKB(size) {
	if (!size) return;
	return (size / 1024).toFixed(2);
}

function getFileExtension(name) {
	return name.split(".").pop();
}

async function readURL(input, id, _this, img_of) {
	const uploadedFile = input.files[0];
	if (!uploadedFile) return;

	console.log(uploadedFile.type, "==uploadedFile.type==");

	if (
		uploadedFile.type !== "image/jpg" &&
		uploadedFile.type !== "image/jpeg"
	) {
		alertjs.warning(
			{
				t: img_of + " must Be jpg/jpeg only",
				m: "",
			},
			function () {
				$(_this).val("");
			},
		);
		return false;
	}

	const uploadedFileSize = calcFileSizeInKB(uploadedFile.size);

	let media_file = uploadedFile;
	if (uploadedFileSize > MAX_FILE_SIZE) {
		_showLoader();
		media_file = await compressFile(uploadedFile);
		_hideLoader();
	}

	let ext = getFileExtension(media_file.name);

	if (ext == "jpeg" || ext == "jpg") {
		mediaItems.push({
			type: img_of,
			file: media_file,
		});
		let reader = new FileReader();
		reader.onload = function (e) {
			$("#" + id).attr("src", e.target.result);
		};
		reader.readAsDataURL(media_file);

		$("#submituploadDetails").removeClass("d-none");
		$("#directApplicationBtn").addClass("d-none");
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
}

$("#imageUpload").change(function (e) {
	readURL(this, "imageUploadPreview", $(this), PHOTO_IMG);
});

$("#signUpload").change(function (e) {
	readURL(this, "signUploadPreview", $(this), SIGN_IMG);
});

$("#aadharUpload").change(function (e) {
	readURL(
		this,
		"aadharUploadPreview",
		$(this),

		AADHAAR_IMG,
	);
});
$("#imageUpload").val("");
$("#signUpload").val("");
$("#aadharUpload").val("");

$(document).ready(function () {
	$("#uploadImage").on("submit", function (e) {
		e.preventDefault();

		if (candidateDocumentDetails.isAadharRequired == "no") {
			// this is checking is aadhaar card is required for this post and
			// if no by pass the aadhaar checking (by setting aadhaar is available (true))
			images.isA = true;
		}

		if (!images.isA || !images.isP || !images.isS) {
			alertjs.warning(
				{
					t: "Warning",
					m: "Upload all documents",
				},
				() => {
					return false;
				},
			);
		} else {
			const sendData = {
				f_id: form_id,
				r_id: regID,
			};

			const declerationInput = $("#decleration");
			const isDeclerationAccepted = declerationInput.is(":checked");

			if (!isDeclerationAccepted) {
				alertjs.warning({
					t: "Warning",
					m: "Please accept decleration",
				});
				return;
			}

			updateDocumentDetailsDone(sendData);
		}
	});

	async function updateDocumentDetailsDone(data) {
		const submituploadDetailsBtn = $("#submituploadDetails");

		try {
			submituploadDetailsBtn.attr("disabled", true).html("Saving...");

			const _resp = await fetch("/update-document-details-done", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			const _jsonData = await _resp.json();
			alertjs.success(
				{ t: "Documents saved successfully", m: "" },
				() => {
					window.location.href = `/v2/application?r=${regID}&f=${form_id}`;
				},
			);
		} catch (error) {
			alert("Server error");
		} finally {
			submituploadDetailsBtn.attr("disabled", false).html("Save");
		}
	}

	async function postDocumentUpload(formData, thisBtn) {
		try {
			thisBtn.attr("disabled", true).html("Uploading...");
			const _uploadResp = await fetch("/aws/upload", {
				method: "POST",
				body: formData,
			});
			const _jsonRep = await _uploadResp.json();
			console.log(JSON.parse(_jsonRep.data), "_jsonRep");
			const sendData = {
				fileName: JSON.parse(_jsonRep.data).fileName,
				f_id: form_id,
				r_id: regID,
				img_type: formData.get("img_type"),
			};
			console.log(sendData, "-sendData");
			saveImageNametoDb(sendData);
		} catch (error) {
			console.log(error, "==error==");
		} finally {
			thisBtn.attr("disabled", false).html("Upload");
		}
	}

	async function saveImageNametoDb(data) {
		try {
			const _updateResp = await fetch("/save-s3-document-name", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			const _jsonResp = await _updateResp.json();
			alertjs.success({ t: "Successful", m: _jsonResp.usrMsg }, () => {
				window.location.reload();
			});
		} catch (error) {
			alert("Error in file upload.");
		}
	}

	$(document).on("click", "#upload-document", function () {
		const imgType = $(this).attr("data-img-type"); // eg aadhaarCard, photo, sign

		const thisBtn = $(this);

		let file = mediaItems.filter(media => media.type == imgType)?.[0]?.file;
		if (!file) {
			alertjs.warning({ t: "Warning", m: `Select ${imgType}.` }, () => {
				return false;
			});
		}

		let formData = new FormData();

		formData.set("uploadImg", file);

		formData.set("img_type", imgType);

		formData.set("process_name", p.name);
		formData.set("app_id", form_id);

		formData.set("folderName", "users");

		postDocumentUpload(formData, thisBtn);
	});

	$(document).on("click", "#delete-document", function () {
		const thisBtn = $(this);

		alertjs.delete(isConfirm => {
			if (!isConfirm) return false;

			const imgType = $(this).attr("data-img-type");
			const fileName = $(this).attr("data-img-name");

			const formData = {
				img_type: imgType,
				file_name: fileName,
				f_id: form_id,
				r_id: regID,
			};
			deleteUploadDocument(formData, thisBtn);
		});
	});

	async function deleteUploadDocument(data, thisBtn) {
		try {
			thisBtn.attr("disabled", true).html("Deleting...");
			const _updateResp = await fetch("/delete-s3-document-name", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			const _jsonResp = await _updateResp.json();
			alertjs.success(
				{ t: "Successful", m: _jsonResp.usrMsg.toUpperCase() },
				() => {
					window.location.reload();
				},
			);
		} catch (error) {
			alert("Error in delete file.");
			console.log(error, "==error==");
		} finally {
			thisBtn.attr("disabled", false).html("Delete");
		}
	}
});
