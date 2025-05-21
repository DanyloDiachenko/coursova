import { AbstractSortingAlgorithm } from "./AbstractSortingAlgorithm";
import { SortDirection } from "../variables";

export class FlashSortAlgorithm extends AbstractSortingAlgorithm {
    get name(): string {
        return "Flash Sort";
    }

    get complexity(): string {
        return "O(n + m)";
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

        if (n <= 1) {
            return yield* this.handleSortDirection([...arr], direction);
        }

        let min = arr[0];
        let maxIdx = 0;

        for (let i = 1; i < n; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
            if (arr[i] > arr[maxIdx]) {
                maxIdx = i;
            }
        }

        if (min === arr[maxIdx]) {
            return yield* this.handleSortDirection([...arr], direction);
        }

        const m = Math.max(1, ~~(0.45 * n));
        const l = new Array(m).fill(0);

        const c1 = (m - 1) / (arr[maxIdx] - min);

        for (let i = 0; i < n; i++) {
            const k = Math.max(0, Math.min(m - 1, ~~(c1 * (arr[i] - min))));
            l[k]++;
        }

        for (let p = 1; p < m; p++) {
            l[p] += l[p - 1];
        }

        let hold = arr[maxIdx];
        arr[maxIdx] = arr[0];
        arr[0] = hold;
        yield [...arr];

        let move = 0;
        let j = 0;
        let k = m - 1;
        let t: number;
        let flash: number;

        while (move < n - 1) {
            while (j >= l[k]) {
                j++;
                k = Math.max(0, Math.min(m - 1, ~~(c1 * (arr[j] - min))));
            }
            if (k < 0) break;

            flash = arr[j];
            while (j !== l[k]) {
                k = Math.max(0, Math.min(m - 1, ~~(c1 * (flash - min))));
                t = l[k] - 1;
                l[k]--;

                hold = arr[t];
                arr[t] = flash;
                flash = hold;

                move++;
                yield [...arr];
            }
        }

        for (j = 1; j < n; j++) {
            hold = arr[j];
            let i = j - 1;
            while (i >= 0 && arr[i] > hold) {
                arr[i + 1] = arr[i];
                i--;
            }
            arr[i + 1] = hold;
            if (j % Math.max(1, Math.floor(n / 20)) === 0 || j === n - 1) {
                yield [...arr];
            }
        }
        if (
            arr.length > 0 &&
            j % Math.max(1, Math.floor(n / 20)) !== 0 &&
            j !== n - 1
        ) {
            yield [...arr];
        }

        return yield* this.handleSortDirection(arr, direction);
    }
}
