$(document).ready(() => {
	console.log("navbar js loaded");

	// check active link
	setCurrentLinkActive();

	function setCurrentLinkActive() {
		let currentLocation = window.location.href.split("/").at(-1);
		if (currentLocation.startsWith("login")) {
			console.log("here");
			console.log($("#loginLink"));
			$("#loginLink").addClass("nav-link-active");
		}

		if (currentLocation.startsWith("new-registration")) {
			$("#newRegLink").addClass("nav-link-active");
		}

		if (currentLocation === "") {
			$("#homeLink").addClass("nav-link-active");
		}
	}
});
