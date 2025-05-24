$(function () {
	$("#idApplyForNewPost").on("click", function () {
		window.location.assign("/user-details/" + regString);
	});

	$("#logout").on("click", function () {
		window.location.assign("/logout");
	});

	function setExamList() {
		var _tr = "";

		if (updateData.length > 0) {
			$.each(updateData, function (index, value) {
				_tr += `<tr>

                            <td>${index + 1}.</td>`;

				if (Number(value.p_done)) {
					_tr += `<td>

                                <label name="" id="" class="btn btn-success btn-sm" href="#">Completed</label>

                            </td>`;
				} else {
					_tr += `<td>

                                <label name="" id="" class="btn btn-danger btn-sm" href="#">Incomplete</label>

                            </td>`;
				}

				if (payment_mode == 1) {
					_tr += `<td>${value.applied_post}</td>

                            <td>${value.appication_number}</td>

                            <td>${value.created_date} @ <small>${
								value.created_time
							}</td>

                            <td>-</td>

                            <td>${
								value.post_fee == 0
									? "NIL"
									: value.post_fee + "/-"
							}</td>

                        `;
				} else {
					_tr += `<td>${value.applied_post}</td>

                            <td>${value.appication_number}</td>

                            <td>${value.created_date} @ <small>${
								value.created_time
							}</td>

                            <td>-</td>

                            <td>${
								value.post_fee == 0
									? "NIL"
									: value.only_post_fee +
										challan.ci_bank_fees +
										"/-"
							}</td>

                        `;
				}

				if (value.post_fee == 0) {
					_tr += `<td>

                    <label name="" id="" class="btn btn-success btn-sm disabled">NIL</label>

              </td>`;
				} else {
					if (Number(value.p_done)) {
						if (Number(value.payment_is_done)) {
							_tr += `<td>

                                <a  class="btn btn-success btn-sm" href="#">Updated</a>

                            </td>`;
						} else {
							if (value.payment_mode == 1) {
								_tr += `<td>

                          <a name="" id="" class="btn btn-danger btn-sm" href="/payment?r=${regID}&f=${value.appication_number}">Unpaid</a>

                       </td>`;
							} else {
								_tr += `<td>

                        <a name="" id="" class="btn btn-danger btn-sm" href="/payment-challan?r=${regID}&f=${value.appication_number}">Unpaid</a>

                      </td>`;
							}
						}
					} else {
						_tr += `<td>

                  <label name="" id="" class="btn btn-danger btn-sm disabled">Incomplete</label>

              </td>`;
					}
				}

				if (Number(value.p_done)) {
					if (Number(value.payment_is_done)) {
						if (ht == 0) {
							_tr += `<td>

              <a target="_blank" class="btn btn-success btn-sm" href="/application?r=${regID}&f=${value.appication_number}">View Application</a>

            </td>

        </tr>`;
						} else {
							_tr += `<td>
              <a target="_blank" class="btn btn-secondary btn-sm " href="/result?r=${regID}&f=${value.appication_number}">Result</a>
             
            </td>

        </tr>`;
						}
					} else {
						if (value.payment_mode == 1) {
							_tr += `<td>

                        <a name="" id="" class="btn btn-warning btn-sm" href="/payment?r=${regID}&f=${value.appication_number}">View Application</a>

                     </td></tr>`;
						} else {
							_tr += `<td>

                      <a name="" id="" class="btn btn-warning btn-sm" href="/payment-challan?r=${regID}&f=${value.appication_number}">View Application</a>

                    </td></tr>`;
						}
					}
				} else {
					// _tr += ` <td>
					//                   <button name="" id="" class="btn btn-primary btn-sm" onclick="setEditor(this,${value.appication_number},1,${index})">Edit</button>
					//                   <button name="" id="" class="btn btn-secondary btn-sm" onclick="setEditor(this,${value.appication_number},0,${index})">Resume</button>
					//               </td>
					//           </tr>`;
					_tr += `<td>-</td></tr>`;
				}
			});

			$("#examList").html(_tr);
		}

		$("#exams").fadeIn(500);
	}

	$("#exams").removeClass("d-none").hide();

	setExamList();
});

function setEditor(_this, id, type, index) {
	$.ajax({
		url: "/set-editor",

		method: "post",

		data: { cfi: id },
	})

		.done(function (data) {
			if (type == 1) {
				window.location.assign("/user-details/" + regString);

				return false;
			} else {
				var inArray = [
					updateData[index].g_done,

					updateData[index].e_done,

					updateData[index].d_done,

					updateData[index].p_done,

					updateData[index].payment_is_done,
				];

				$.each(inArray, function (index, value) {
					if (value === 0) {
						var url = "/user-details/";

						switch (index) {
							case 0:
								url = "/user-details/";

								break;

							case 1:
								url = "/education-details/";

								break;

							case 2:
								url = "/document-upload/";

								break;

							case 3:
								url = "/application-preview/";

								break;

							case 4:
								url = "/payment/";
						}

						//  console.log(url);

						window.location.assign(url + regString);

						return false;
					}
				});
			}
		})

		.fail(function (error) {
			alertjs.error(function () {
				alert("Server Error Contact To admin");

				console.log("error");

				console.log(error);
			});
		});
}
