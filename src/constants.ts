export const MAX_NUMBER = 50000;
export const MIN_NUMBER = -50000;

export const MAX_ARRAY_LENGTH = 50000;
export const MIN_ARRAY_LENGTH = 2;

export const SORTING_RESULT_FILE_NAME = "sorted_array.txt";

export type GenerateType = "auto" | "manual";
export type SortDirection = "asc" | "desc";
export type SortType = "block" | "counting" | "radix" | "flash";

export const SORTING_ALGORITHMS_WITH_COMPLEXITY = {
    block: "O(n * log(n))",
    counting: "O(n + k)",
    radix: "O(n * k)",
    flash: "O(n + k)",
};

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
    sortingTime: number;
    sortedArray: number[];
    arrayToSort: number[];
    steps: number[][];
    complexity: string;
    sortSessionId: string;
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

export function* blockSort(
    array: number[],
    direction: SortDirection,
): Generator<number[], number[], unknown> {
    const n = array.length;
    if (n === 0) {
        yield [];
        return [];
    }
    yield [...array];

    const blockSize = Math.max(1, Math.floor(Math.sqrt(n)));
    let blocks: number[][] = [];

    for (let i = 0; i < n; i += blockSize) {
        let block = array.slice(i, i + blockSize);
        for (let j = 1; j < block.length; j++) {
            let key = block[j];
            let k = j - 1;
            while (k >= 0 && block[k] > key) {
                block[k + 1] = block[k];
                k = k - 1;
            }
            block[k + 1] = key;
        }
        blocks.push(block);
    }

    let combinedBlocksArray: number[][] = ([] as number[][]).concat(...blocks);
    const remainingElements = array.slice(combinedBlocksArray.length);

    let tempStateArray = [...array];
    let currentIdx = 0;
    for (const block of blocks) {
        for (const val of block) {
            if (currentIdx < tempStateArray.length) {
                tempStateArray[currentIdx++] = val;
            }
        }
    }
    let reconstructionIndex = 0;
    const reconstructedArray = [...array];
    for (const block of blocks) {
        for (const element of block) {
            if (reconstructionIndex < n) {
                reconstructedArray[reconstructionIndex++] = element;
            }
        }
    }
    yield [...reconstructedArray];

    let sortedArray: number[] = [];
    currentIdx = 0;

    const result = [];
    const blockPointers = new Array(blocks.length).fill(0);

    for (let i = 0; i < n; i++) {
        let minVal = Infinity;
        let minBlockIndex = -1;

        for (let j = 0; j < blocks.length; j++) {
            if (blockPointers[j] < blocks[j].length) {
                if (blocks[j][blockPointers[j]] < minVal) {
                    minVal = blocks[j][blockPointers[j]];
                    minBlockIndex = j;
                }
            }
        }

        if (minBlockIndex !== -1) {
            result.push(minVal);
            blockPointers[minBlockIndex]++;

            const visualStepArray = new Array(n);
            let currentFillIndex = 0;

            for (const sortedVal of result) {
                if (currentFillIndex < n) {
                    visualStepArray[currentFillIndex++] = sortedVal;
                }
            }

            for (let bIdx = 0; bIdx < blocks.length; bIdx++) {
                for (
                    let eIdx = blockPointers[bIdx];
                    eIdx < blocks[bIdx].length;
                    eIdx++
                ) {
                    if (currentFillIndex < n) {
                        visualStepArray[currentFillIndex++] =
                            blocks[bIdx][eIdx];
                    }
                }
            }
            for (let k = currentFillIndex; k < n; k++) {
                visualStepArray[k] = 0;
            }

            yield [...visualStepArray];
        } else {
            break;
        }
    }
    sortedArray = result;

    if (direction === "desc") {
        sortedArray.reverse();
        yield [...sortedArray];
    }

    return sortedArray;
}

export function* countingSort(
    array: number[],
    direction: SortDirection,
): Generator<number[], number[], unknown> {
    const N = array.length;
    if (N === 0) {
        yield [];
        return [];
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

    if (direction === "desc") {
        const reversedOutputArray = [...outputArray].reverse();
        yield [...reversedOutputArray];
        return reversedOutputArray;
    }

    return outputArray;
}

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

export function* radixSort(
    arr: number[],
    direction: SortDirection,
): Generator<number[], number[], unknown> {
    const n = arr.length;
    if (n === 0) {
        yield [];
        return [];
    }
    yield [...arr];

    const maxNumber = Math.max(...arr);
    let sortedArr = [...arr];

    for (let exp = 1; Math.floor(maxNumber / exp) > 0; exp *= 10) {
        sortedArr = countSortHelper(sortedArr, exp);
        yield [...sortedArr];
    }

    if (direction === "desc") {
        sortedArr.reverse();
        yield [...sortedArr];
    }

    return sortedArr;
}

export function* flashSort(
    arrParam: number[],
    direction: SortDirection,
): Generator<number[], number[], unknown> {
    let arr = [...arrParam];
    const n = arr.length;
    if (n === 0) {
        yield [];
        return [];
    }
    yield [...arr];

    let max = 0;
    let min = arr[0];
    const m = ~~(0.45 * n);
    const l = new Array(m).fill(0);

    for (let i = 1; i < n; ++i) {
        if (arr[i] < min) {
            min = arr[i];
        }
        if (arr[i] > arr[max]) {
            max = i;
        }
    }

    if (min === arr[max]) {
        yield [...arr];
        return arr;
    }

    const c1 = (m - 1) / (arr[max] - min);

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
    yield [...arr];

    let move = 0;
    let t: number, flash: number;
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
            yield [...arr];
        }
    }

    for (j = 1; j < n; j++) {
        hold = arr[j];
        let i = j - 1;
        while (i >= 0 && arr[i] > hold) {
            arr[i + 1] = arr[i];
            i--;
            yield [...arr];
        }
        arr[i + 1] = hold;
        yield [...arr];
    }

    if (direction === "desc") {
        arr.reverse();
        yield [...arr];
    }

    return arr;
}
