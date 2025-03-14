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
    sortingResult: number[];
    sortingTime: number;
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
