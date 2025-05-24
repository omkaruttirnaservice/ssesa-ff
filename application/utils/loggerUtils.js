exports._getLogData = data => {
	let _message = "";

	if (data === null) _message = "null";
	else if (data === undefined) _message = "undefined";
	else if (typeof data === "object") {
		try {
			_message = JSON.stringify(data);
		} catch (error) {
			_message = "[Unable to stringify object]";
		}
	} else if (typeof data === "function") {
		_message = String(data);
	} else {
		_message = String(data);
	}

	return _message;
};
