$(function () {
	$("#extraCertificateSelect").on("change", function () {});
	let defaultDocuments = [
		{
			name: "CASTE CERTIFICATE",
			delete: false,
			view: false,
			deletePermission: 0,
			filePath: "",
			edit: false,
			mandatory: 1,
		},
		{
			name: "CASTE VALIDITY",
			delete: false,
			view: false,
			deletePermission: 0,
			filePath: "",
			edit: false,
			mandatory: 1,
		},
		{
			name: "CERTIFICATE OF DOMICILE",
			delete: false,
			view: false,
			deletePermission: 0,
			filePath: "",
			edit: false,
			mandatory: 1,
		},
		{
			name: "NON-CREAMY LAYER",
			delete: false,
			view: false,
			deletePermission: 0,
			filePath: "",
			edit: false,
			mandatory: 0,
		},
		{
			name: "SCHOOL LEAVING CERTIFICATE",
			delete: false,
			view: false,
			deletePermission: 0,
			filePath: "",
			edit: false,
			mandatory: 0,
		},
	];

	documents = documents.length > 0 ? [...documents] : [...defaultDocuments];

	function loadDocuments() {
		let list = documents
			.map((doc, index) => {
				return `<div class="row mb-4">
                            <div class="col-5 mr-5">
                                <div class="d-flex">
                                    <label class="input-group-text" style='font-size: 1.4rem' for="i">
                                    ${
										doc.mandatory === 1
											? "*"
											: "&nbsp;&nbsp;"
									} Document Of</label>
                                    <input class="input-element input-sm extraCertificateInput" id="extraCertificateInput${index}" data-index="${index}"  type="text" placeholder="Enter Document Name" list="data-list" value="${
										doc.name
									}" ${!doc.edit ? "readonly" : ""} />
                                </div>
                            </div>

                            <div class="col-5">
                                <div class="input-group">
                                    <input class="input-element input-sm extraCertificateUploadFile" id="extraCertificateUploadFile${index}"  data-index="${index}" type="file"  >
                                </div>
                            </div>

                            <div class="col-2 ">
                                <div class="d-flex align-items-center justify-content-start gap-1">
                                    <button class="btn btn-success btn-lg text-white upload-extra-doc" data-index="${index}" >Upload</button>
                                    ${
										doc.filePath === ""
											? ""
											: `<a href="/assets/extra_doc/${doc.filePath}" class="btn btn-primary btn-lg text-white mx-1 view-extra-doc" target="_blank" data-index="${index}"><span class="m-0 p-0 fa fa-eye" style='background-color: inherit;'></span></a>`
									}
                                    ${
										doc.deletePermission == 0
											? ""
											: `<button class="btn btn-danger btn-lg text-white delete-extra-doc" data-index="${index}"><span class="m-0 p-0 fa fa-trash" style='background-color: inherit; font-size: 2rem;'></span></button>`
									}
                                </div>
                            </div>
                        </div>`;
			})
			.join("");
		$("#documentList").html(list);
	}

	loadDocuments();
	$(document).on("click", ".upload-extra-doc", function () {
		let id = $(this).data("index");
		let $this = $(this);
		let media_file = $("#extraCertificateUploadFile" + id)[0].files[0];
		if (media_file === undefined) {
			alertjs.warning(
				{
					t: `Document Not Selected`,
					m: `Kindly Select Document for Uploading`,
				},
				function () {},
			);
			return false;
		}
		max_size = 200;
		// event is from the <input> event
		const filename = media_file.name;
		let last_dot = filename.lastIndexOf(".");
		let ext = filename.slice(last_dot + 1);
		let name = filename.slice(0, last_dot);
		if (
			ext == "jpeg" ||
			ext == "jpg" ||
			ext == "JPEG" ||
			ext == "JPG" ||
			ext == "pdf" ||
			ext == "PDF"
		) {
			var fileSize = Number((media_file.size / 1024).toFixed(2));
			if (fileSize < max_size && fileSize > 19) {
				// upload image
				var formData = new FormData();
				formData.append("extra_doc", media_file);
				formData.append("documents", JSON.stringify(documents));
				formData.append("current_id", id);
				formData.append("cfi", form_id);
				formData.append("cri", regID);
				$this.prop("disabled", true).html(`Uploading Details... `);
				$("#loadMyPage").removeClass("d-none");
				$.ajax({
					url: "/save-upload-extra-document",
					data: formData,
					type: "POST",
					contentType: false,
					processData: false,
				})
					.done(data => {
						$("#loadMyPage").addClass("d-none");
						$this.prop("disabled", false).html(`Upload`);
						var json = data;
						switch (json._call) {
							case 1:
								alertjs.success(
									{
										t: json.msg,
										m: "",
									},
									function () {
										window.location.reload();
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
					})
					.fail(error => {
						console.log(error);
					});
			} else {
				alertjs.warning(
					{
						t: `Document must be less than ${max_size} kb and greater than 20 kb`,
						m: `Current File Size is: ${fileSize} kb`,
					},
					function () {
						$("#extraCertificateUploadFile" + id).val("");
					},
				);
			}
		} else {
			alertjs.warning(
				{
					t: "Document must be of JPEG or JPG or PDf type only",
					m: "",
				},
				function () {
					$("#extraCertificateUploadFile" + id).val("");
				},
			);
		}
	});

	$(document).on("blur", ".extraCertificateInput", function () {
		let id = $(this).data("index");
		let _this = this;
		if (documents[id].edit === true) {
			let _doc = [...documents];
			_doc[id].name = $(_this).val();
			documents = [..._doc];
			loadDocuments();
		}
	});
	$(document).on("click", ".delete-extra-doc", function () {
		let id = $(this).data("index");
		// if (documents[id].delete === false) {
		documents.splice(id, 1);
		loadDocuments();
		// }
	});

	$(document).on("click", "#finalizedDoc", function () {
		$this = $(this);

		let isFound = documents.find(doc => {
			return doc.mandatory === 1 && doc.filePath.trim() === "";
		});

		if (isFound !== undefined) {
			alertjs.warning(
				{
					t: "Kindly upload " + isFound.name,
					m: "",
				},
				function () {},
			);
			return false;
		}

		let finalDoc = documents.filter(doc => {
			return doc.filePath.trim() !== "";
		});

		$.ajax({
			url: "/finalized-upload-extra-document",
			data: {
				documents: JSON.stringify(finalDoc),
				cfi: form_id,
				cri: regID,
			},
			type: "POST",
		})
			.done(data => {
				$("#loadMyPage").addClass("d-none");
				$this.prop("disabled", false).html(`Finalizing...`);
				var json = data;
				switch (json._call) {
					case 1:
						alertjs.success(
							{
								t: "Document Saved Successfully",
								m: "",
							},
							function () {
								window.location.assign(
									"/application-preview/" + regString,
								);
								return false;
							},
						);
						break;

					default:
						alertjs.warning(
							{
								t: "Unable to finalized, try again",
								m: "",
							},
							function () {},
						);

						break;
				}
			})
			.fail(error => {
				console.log(error);
			});
	});

	$("#addNewDocument").on("click", function () {
		documents.push({
			name: "",
			delete: false,
			view: false,
			deletePermission: 1,
			filePath: "",
			edit: true,
			mandatory: 0,
		});
		loadDocuments();
	});
});

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
	readURL(this, "imageUploadPreview", $(this), 30, "Photo", e);
});

$("#signUpload").change(function (e) {
	readURL(this, "signUploadPreview", $(this), 30, "Signature", e);
});
$("#imageUpload").val("");
$("#signUpload").val("");

$(document).ready(function () {
	$("#back").on("click", function () {
		window.location.assign("/education-details/" + regString);
		return false;
	});

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
