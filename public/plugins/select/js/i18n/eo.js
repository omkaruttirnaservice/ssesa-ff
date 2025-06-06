/*! Select2 4.1.0-beta.1 | https://github.com/select2/select2/blob/master/LICENSE.md */

!(function () {
	if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
		var n = jQuery.fn.select2.amd;
	n.define("select2/i18n/eo", [], function () {
		return {
			errorLoading: function () {
				return "La rezultoj ne povas esti ŝargitaj.";
			},
			inputTooLong: function (n) {
				var e = n.input.length - n.maximum,
					r = "Bonvolu forigi " + e + " signo";
				return (r += 1 == e ? "n" : "jn");
			},
			inputTooShort: function (n) {
				return (
					"Bv. enigi " +
					(n.minimum - n.input.length) +
					" aŭ pli multajn signojn"
				);
			},
			loadingMore: function () {
				return "Ŝargado de pliaj rezultoj…";
			},
			maximumSelected: function (n) {
				var e = "Vi povas elekti nur " + n.maximum + " ero";
				return 1 == n.maximum ? (e += "n") : (e += "jn"), e;
			},
			noResults: function () {
				return "Neniuj rezultoj trovitaj";
			},
			searching: function () {
				return "Serĉado…";
			},
			removeAllItems: function () {
				return "Forigi ĉiujn erojn";
			},
		};
	}),
		n.define,
		n.require;
})();
