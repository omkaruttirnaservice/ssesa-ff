/*! Select2 4.1.0-beta.1 | https://github.com/select2/select2/blob/master/LICENSE.md */

!(function () {
	if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd)
		var n = jQuery.fn.select2.amd;
	n.define("select2/i18n/pa", [], function () {
		return {
			errorLoading: function () {
				return "ਨਤੀਜੇ ਲੋਡ ਨਹੀਂ ਕੀਤੇ ਜਾ ਸਕਦੇ ।";
			},
			inputTooLong: function (n) {
				var e = n.input.length - n.maximum;
				return (
					"ਕ੍ਰਿਪਾ ਕਰਕੇ " +
					e +
					(1 != e ? " ਅੱਖਰਾਂ ਨੂੰ " : " ਅੱਖਰ ") +
					"ਮਿਟਾਓ ।"
				);
			},
			inputTooShort: function (n) {
				var e = n.minimum - n.input.length;
				return (
					"ਕ੍ਰਿਪਾ ਕਰਕੇ " +
					e +
					" ਜਾਂ " +
					e +
					" ਤੋਂ ਵੱਧ" +
					(e > 1 ? " ਅੱਖਰਾਂ " : " ਅੱਖਰ ") +
					"ਦੀ ਵਰਤੋਂ ਕਰੋ ।"
				);
			},
			loadingMore: function () {
				return "ਹੋਰ ਨਤੀਜੇ ਲੋਡ ਹੋ ਰਹੇ ਹਨ ...।";
			},
			maximumSelected: function (n) {
				var e = "ਤੁਸੀਂ ਸਿਰਫ਼ " + n.maximum + " ਨਤੀਜਾ ਚੁਣ ਸਕਦੇ ਹੋ ।";
				return (
					1 != n.maximum &&
						(e =
							"ਤੁਸੀਂ ਸਿਰਫ਼ " + n.maximum + " ਨਤੀਜੇ ਚੁਣ ਸਕਦੇ ਹੋ ।"),
					e
				);
			},
			noResults: function () {
				return "ਨਤੀਜਾ ਨਹੀਂ ਮਿਲ ਰਿਹਾ ਹੈ ।";
			},
			searching: function () {
				return "ਖ਼ੋਜ ਕਰ ਰਹੇਂ ਹਾਂ ...।";
			},
			removeAllItems: function () {
				return "ਸਾਰੇ ਨਤੀਜੇ ਮਿਟਾਓ ।";
			},
		};
	}),
		n.define,
		n.require;
})();
