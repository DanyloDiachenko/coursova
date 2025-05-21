import { AbstractSortingAlgorithm } from "./AbstractSortingAlgorithm";
import { SortDirection } from "../variables";

export class RadixSortAlgorithm extends AbstractSortingAlgorithm {
    get name(): string {
        return "Radix Sort";
    }

    get complexity(): string {
        return "O(d * (n + k))";
    }

    public override validateData(data: number[]): {
        isValid: boolean;
        errorMessage?: string;
    } {
        if (!super.validateData(data).isValid) {
            return super.validateData(data);
        }
        if (data.length > 0 && Math.min(...data) < 0) {
            return {
                isValid: false,
                errorMessage:
                    "Порозрядне сортування не підтримує від'ємні числа",
            };
        }
        if (!data.every(Number.isInteger)) {
            return {
                isValid: false,
                errorMessage:
                    "Порозрядне сортування підтримує только цілі числа",
            };
        }
        return { isValid: true };
    }

    private static countSortHelper(arr: number[], exp: number): number[] {
        const length = arr.length;
        let output = new Array(length).fill(0);
        let count = new Array(10).fill(0);

        for (let i = 0; i < length; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }
        return output;
    }

    *sort(
        data: number[],
        direction: SortDirection,
    ): Generator<number[], number[], unknown> {
        const arr = this.cloneArray(data);
        const n = arr.length;

        if (n === 0) {
            return yield* this.handleEmptyArray();
        }
        yield [...arr];

        if (n > 0) {
            const maxNumber = Math.max(...arr);
            let sortedArr = [...arr];

            for (let exp = 1; Math.floor(maxNumber / exp) > 0; exp *= 10) {
                sortedArr = RadixSortAlgorithm.countSortHelper(sortedArr, exp);
                yield [...sortedArr];
            }
            return yield* this.handleSortDirection(sortedArr, direction);
        } else {
            return yield* this.handleSortDirection([], direction);
        }
    }
}
