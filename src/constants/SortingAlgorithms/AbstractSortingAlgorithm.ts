import { SortDirection } from "../variables";

export interface ISortingAlgorithm {
    readonly name: string;
    readonly complexity: string;

    sort(
        data: number[],
        direction: SortDirection,
    ): Generator<number[], number[], unknown>;

    validateData(data: number[]): { isValid: boolean; errorMessage?: string };
}

export abstract class AbstractSortingAlgorithm implements ISortingAlgorithm {
    abstract get name(): string;
    abstract get complexity(): string;

    abstract sort(
        data: number[],
        direction: SortDirection,
    ): Generator<number[], number[], unknown>;

    public validateData(data: number[]): {
        isValid: boolean;
        errorMessage?: string;
    } {
        if (!Array.isArray(data)) {
            return {
                isValid: false,
                errorMessage: "Вхідні дані не є масивом",
            };
        }
        return { isValid: true };
    }

    protected *handleEmptyArray(): Generator<number[], number[], unknown> {
        yield [];
        return [];
    }

    protected *handleSortDirection(
        sortedArray: number[],
        direction: SortDirection,
    ): Generator<number[], number[], unknown> {
        let finalArray = [...sortedArray];
        if (direction === "desc") {
            finalArray.reverse();
        }
        yield [...finalArray];
        return finalArray;
    }

    protected cloneArray(data: number[]): number[] {
        return [...data];
    }
}
