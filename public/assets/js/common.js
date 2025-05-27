_showLoader();

function checkIsMobile() {
	const _userAgent = navigator.userAgent;

	let isMobile = /mobile|android|iphone|webos/i.test(_userAgent);

	if (isMobile || window.innerWidth < 700) {
		$("main").addClass("d-none");
		$("#is-mobile-container").removeClass("d-none");
	} else {
		$("main").removeClass("d-none");
		$("#is-mobile-container").addClass("d-none");
	}
}

// checkIsMobile();

window.addEventListener("resize", function () {
	// checkIsMobile();
});

window.addEventListener("DOMContentLoaded", function () {
	_hideLoader();
});

$(document).on("keyup", "input", function () {
	if ($(this).hasClass("skip-caps-letter")) {
		return false;
	}
	let _text = $(this).val();
	_text = _text.toUpperCase();
	$(this).val(_text);
});

$('input:not("#userid"):not("#password")').bind("copy paste cut", function (e) {
	e.preventDefault(); //disable cut,copy,paste
});

$(document).on("click", "#logout", function () {
	window.location.assign("/logout");
});

export function _hideLoader() {
	$("#loader").addClass("d-none");
	$("#loader-backdrop").addClass("d-none");
}

export function _showLoader() {
	$("#loader").removeClass("d-none");
	$("#loader-backdrop").removeClass("d-none");
}

export const alertjs = {
	success: function (data, callback) {
		swal.fire({
			title: data.t,
			text: data.m,
			icon: "success",
		}).then(function () {
			callback();
		});
	},
	warning: function (data, callback) {
		swal.fire({
			title: data.t,
			text: data.m,
			icon: "warning",
		}).then(function () {
			callback();
		});
	},
	error: function (callback) {
		swal.fire({
			title: "Application System Error",
			text: "Kindly Contact To Admin,Or Retry Again",
			icon: "error",
		}).then(function () {
			callback();
		});
	},
	delete: function (callback) {
		swal.fire({
			title: "Are you sure to delete ?",
			text: "",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
			cancelButtonText: "No",
		}).then(willDelete => {
			if (willDelete.value) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	common: function (data) {
		swal(data.m);
	},
	input: function (data) {
		$(data.id).notify(data.m, { autoHideDelay: 2500 });
	},
};

let commonHandler = {
	isIntNumber: function (v) {
		var num = /^-?[0-9]+$/;
		return num.test(v);
	},
	isFloatNumber: function (v) {
		var num = /^[-+]?[0-9]+\.[0-9]+$/;
		return num.test(v);
	},
	getValue: function (this_element) {
		if (this_element == undefined) {
			return "";
		} else {
			return $(this_element).val();
		}
	},
	ajaxManager(data, callback) {
		$.ajax({
			url: data.url,
			method: data.method,
			data: data.data,
		})
			.done(function (data) {
				callback(true, data);
			})
			.fail(function (xhr) {
				callback(false, data);
			});
	},
	ajaxPromise(data) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				url: data.url,
				method: data.method,
				data: data.data,
			})
				.done(function (data) {
					resolve(data);
				})
				.fail(function (xhr) {
					reject({ type: false, error: xhr });
				});
		});
	},
};

export function compareDate(start, end) {
	return start.getTime() > new Date(end).getTime();
}

// const month = [
// 	"January",
// 	"February",
// 	"March",
// 	"April",
// 	"May",
// 	"June",
// 	"July",
// 	"August",
// 	"September",
// 	"October",
// 	"November",
// 	"December",
// ];

// show hide password
$(document).on("click", "#show-password", function (e) {
	// $(this).toggleClass('fa-lock fa-unlock');
	let passwordEl = $("#password");
	if (passwordEl.attr("type") === "password") {
		passwordEl.attr("type", "text");
	} else {
		passwordEl.attr("type", "password");
	}
});

// jQuery custom validations
jQuery.validator.addMethod(
	"noSpaces",
	function (value, element) {
		return value.trim() !== "";
	},
	"enter valid details.",
);

window.addEventListener("DOMContentLoaded", function () {
	let activeStepEl = document.querySelector(".active-step");
	let stepsContainerEl = document.querySelector(".side-navbar");
	let isScrolled = false;

	const activeStepObserver = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (!entry.isIntersecting && !isScrolled) {
					isScrolled = true;
					activeStepEl.scrollIntoView({
						behavior: "smooth",
						inline: "nearest", // for horizontal
						block: "end", // for vertical
					});
				}
			});
		},
		{
			root: stepsContainerEl,
			threshold: 0.8,
		},
	);

	if (activeStepEl) {
		activeStepObserver.observe(activeStepEl);
	}
});

export const checkProcessDates = async type => {
	try {
		if (!type) {
			throw new Error("Please provide valid date type");
		}
		const url = `/check-process-dates?check_for=${type}`;
		const _resp = await fetch(url);
		const jsonData = await _resp.json();
		if (!_resp.ok) {
			throw new Error(jsonData.usrMsg || "Please try again later");
		}
		return jsonData;
	} catch (error) {
		throw new Error(error);
	}
};

// throw error;

// throw new Error(error?.message || "Please try again later");
