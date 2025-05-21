import { AbstractSortingAlgorithm } from "./AbstractSortingAlgorithm";
import { SortDirection } from "../variables";

export class CountingSortAlgorithm extends AbstractSortingAlgorithm {
    get name(): string {
        return "Counting Sort";
    }

    get complexity(): string {
        return "O(n + k)";
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
                    "Сортування підрахунком не підтримує від'ємні числа",
            };
        }
        if (!data.every(Number.isInteger)) {
            return {
                isValid: false,
                errorMessage:
                    "Сортування підрахунком підтримує только цілі числа",
            };
        }
        return { isValid: true };
    }

    *sort(
        data: number[],
        direction: SortDirection,
    ): Generator<number[], number[], unknown> {
        const array = this.cloneArray(data);
        const N = array.length;

        if (N === 0) {
            return yield* this.handleEmptyArray();
        }
        yield [...array];

        let M = 0;
        for (let i = 0; i < N; i++) {
            M = Math.max(M, array[i]);
        }

        const cumulativeCounts = new Array(M + 1).fill(0);
        for (let i = 0; i < N; i++) {
            cumulativeCounts[array[i]]++;
        }

        for (let i = 1; i <= M; i++) {
            cumulativeCounts[i] += cumulativeCounts[i - 1];
        }

        const outputArray = new Array(N).fill(0);
        for (let i = N - 1; i >= 0; i--) {
            const currentElement = array[i];
            const positionInOutput = cumulativeCounts[currentElement] - 1;
            outputArray[positionInOutput] = currentElement;
            cumulativeCounts[currentElement]--;
            yield [...outputArray];
        }

        return yield* this.handleSortDirection(outputArray, direction);
    }
}
