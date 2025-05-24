"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgeCalculator = void 0;
var moment_1 = __importDefault(require("moment"));
var date_calculator_1 = require("./date-calculator");
var AgeCalculator = /** @class */ (function () {
	function AgeCalculator() {}
	/**
	 * Get age in years, month, days format from given date of birth
	 * @param dob date of birth
	 * @returns age in {years, months, days}
	 */
	AgeCalculator.getAge = function (dob, diffrence) {
		if (!(dob instanceof Date)) throw new Error("Invalid date");
		if (moment_1.default(dob.toISOString()).isAfter(moment_1.default()))
			throw new Error("Future date not allowed");
		var dateCal = new date_calculator_1.DateCalculator();
		return dateCal.dateDifference(dob, new Date(diffrence));
	};
	/**
	 * Get age in given formate
	 * @param dob date of birth
	 * @param format unit of age i.g. years, months, weeks, days, hours etc
	 */
	AgeCalculator.getAgeIn = function (dob, format) {
		if (!(dob instanceof Date)) throw new Error("Invalid date");
		if (moment_1.default(dob.toISOString()).isAfter(moment_1.default()))
			throw new Error("Future date not allowed");
		var dateCal = new date_calculator_1.DateCalculator();
		return dateCal.dateDifferenceIn(dob, new Date(), format);
	};
	return AgeCalculator;
})();
exports.AgeCalculator = AgeCalculator;
