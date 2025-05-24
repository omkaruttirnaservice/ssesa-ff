import { UnitOfAge, Age } from "./model";
export declare class AgeCalculator {
    /**
     * Get age in years, month, days format from given date of birth
     * @param dob date of birth
     * @returns age in {years, months, days}
     */
    static getAge(dob: Date,diffrence:Date): Age;
    /**
     * Get age in given formate
     * @param dob date of birth
     * @param format unit of age i.g. years, months, weeks, days, hours etc
     */
    static getAgeIn(dob: Date, format: UnitOfAge): number;
}
