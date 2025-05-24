"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateCalculator = void 0;
var moment_1 = __importDefault(require("moment"));
var DateCalculator = /** @class */ (function () {
	function DateCalculator() {}
	DateCalculator.prototype.dateDifference = function (from, to) {
		if (!(from instanceof Date) || !(to instanceof Date))
			throw new Error("Invalid date");
		var fromDate = moment_1.default(from.toISOString());
		var toDate = moment_1.default(to);
		var years = toDate.diff(fromDate, "year");
		fromDate.add(years, "years");
		var months = toDate.diff(fromDate, "months");
		fromDate.add(months, "months");
		var days = toDate.diff(fromDate, "days");
		return {
			years: years,
			months: months,
			days: days,
		};
	};
	DateCalculator.prototype.dateDifferenceIn = function (from, to, format) {
		if (!(from instanceof Date) || !(to instanceof Date))
			throw new Error("Invalid date");
		var fromDate = moment_1.default(from.toISOString());
		var toDate = moment_1.default(to);
		return toDate.diff(fromDate, format);
	};
	return DateCalculator;
})();
exports.DateCalculator = DateCalculator;
