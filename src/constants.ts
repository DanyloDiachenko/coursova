import { toast } from "react-toastify";

export const MAX_NUMBER = 50000;
export const MIN_NUMBER = -50000;

export const MAX_ARRAY_LENGTH = 50000;
export const MIN_ARRAY_LENGTH = 2;

export type GenerateType = "auto" | "manual";
export type SortDirection = "asc" | "desc";
export type SortType = "block" | "counting" | "radix" | "flash";

export const VISIBLE_ARRAY_LENGTH_OPTIONS = [
    {
        title: "10 видимих чисел",
        value: "10",
    },
    {
        title: "20 видимих чисел",
        value: "20",
    },
    {
        title: "50 видимих чисел",
        value: "50",
    },
    {
        title: "100 видимих чисел",
        value: "100",
    },
    {
        title: "200 видимих чисел",
        value: "200",
    },
    {
        title: "500 видимих чисел",
        value: "500",
    },
    {
        title: "1000 видимих чисел",
        value: "1000",
    },
    {
        title: "2000 видимих чисел",
        value: "2000",
    },
    {
        title: "5000 видимих чисел",
        value: "5000",
    },
    {
        title: "10000 видимих чисел",
        value: "10000",
    },
    {
        title: "20000 видимих чисел",
        value: "20000",
    },
    {
        title: "50000 видимих чисел",
        value: "50000",
    },
];

export interface MainFormState {
    generateType: GenerateType | null;
    diapason: { from: string; to: string };
    arraySize: string;
    sortType: SortType | null;
    sortDirection: SortDirection | null;
    manualNumbers: { value: number; id: number }[];
    manualNumberInput: string;
    isSorting: boolean;
    /* sortingTime: number; */
    sortedArray: number[];
    arrayToSort: number[];
}

export const generateArray = (
    arraySize: number,
    diapason: { from: number; to: number },
) => {
    const array = [];
    const isIntegerRange =
        Number.isInteger(diapason.from) && Number.isInteger(diapason.to);

    for (let i = 0; i < arraySize; i++) {
        const randomValue =
            Math.random() * (diapason.to - diapason.from) + diapason.from;

        array.push(isIntegerRange ? Math.floor(randomValue) : randomValue);
    }

    return array;
};

export const blockSort = (array: number[], direction: SortDirection) => {
    const blockSize = Math.max(1, Math.floor(Math.sqrt(array.length)));
    let blocks: number[][] = [];

    for (let i = 0; i < array.length; i += blockSize) {
        let block = array.slice(i, i + blockSize).sort((a, b) => a - b);
        blocks.push(block);
    }

    let minHeap: { value: number; blockIdx: number; elemIdx: number }[] = [];
    let sortedArray: number[] = [];

    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].length > 0) {
            minHeap.push({ value: blocks[i][0], blockIdx: i, elemIdx: 0 });
        }
    }

    minHeap.sort((a, b) => a.value - b.value);

    while (minHeap.length > 0) {
        let { value, blockIdx, elemIdx } = minHeap.shift()!;
        sortedArray.push(value);

        if (elemIdx + 1 < blocks[blockIdx].length) {
            minHeap.push({
                value: blocks[blockIdx][elemIdx + 1],
                blockIdx,
                elemIdx: elemIdx + 1,
            });
            minHeap.sort((a, b) => a.value - b.value);
        }
    }

    return direction === "desc" ? sortedArray.reverse() : sortedArray;
};

export const countingSort = (array: number[], direction: SortDirection) => {
    const N = array.length;

    let M = 0;
    for (let i = 0; i < N; i++) {
        M = Math.max(M, array[i]);
    }

    const countArray = new Array(M + 1).fill(0);

    for (let i = 0; i < N; i++) {
        countArray[array[i]]++;
    }

    for (let i = 1; i <= M; i++) {
        countArray[i] += countArray[i - 1];
    }

    const outputArray = new Array(N);
    for (let i = N - 1; i >= 0; i--) {
        outputArray[countArray[array[i]] - 1] = array[i];
        countArray[array[i]]--;
    }

    return direction === "desc" ? outputArray.reverse() : outputArray;
};

const countSortHelper = (arr: number[], exp: number) => {
    const length = arr.length;
    let output = Array(length);
    let count = Array(10).fill(0, 0);

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
};

export const radixSort = (arr: number[], direction: SortDirection) => {
    const maxNumber = Math.max(...arr);
    let sortedArr = [...arr];

    for (let exp = 1; Math.floor(maxNumber / exp) > 0; exp *= 10) {
        const sortedIteration = countSortHelper(sortedArr, exp);
        sortedArr = sortedIteration;
    }

    return direction === "desc" ? sortedArr.reverse() : sortedArr;
};

export const flashSort = (arr: number[], direction: SortDirection) => {
    let max = 0;
    let min = arr[0];
    const n = arr.length;
    const m = ~~(0.45 * n);
    const l = new Array(m);

    for (let i = 1; i < n; ++i) {
        if (arr[i] < min) {
            min = arr[i];
        }
        if (arr[i] > arr[max]) {
            max = i;
        }
    }

    if (min === arr[max]) {
        return arr;
    }

    const c1 = (m - 1) / (arr[max] - min);

    for (let k = 0; k < m; k++) {
        l[k] = 0;
    }
    for (let j = 0; j < n; ++j) {
        const k = ~~(c1 * (arr[j] - min));
        ++l[k];
    }

    for (let p = 1; p < m; ++p) {
        l[p] = l[p] + l[p - 1];
    }

    let hold = arr[max];
    arr[max] = arr[0];
    arr[0] = hold;

    let move = 0,
        t: number,
        flash: number;
    let j = 0;
    let k = m - 1;

    while (move < n - 1) {
        while (j > l[k] - 1) {
            ++j;
            k = ~~(c1 * (arr[j] - min));
        }
        if (k < 0) break;
        flash = arr[j];
        while (j !== l[k]) {
            k = ~~(c1 * (flash - min));
            t = --l[k];
            hold = arr[t];
            arr[t] = flash;
            flash = hold;
            ++move;
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
    }

    return direction === "desc" ? arr.reverse() : arr;
};
