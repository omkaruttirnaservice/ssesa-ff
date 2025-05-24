import { UnitOfAge, Age } from "./model";
export declare class DateCalculator {
    dateDifference(from: Date, to: Date): Age;
    dateDifferenceIn(from: Date, to: Date, format: UnitOfAge): number;
}
