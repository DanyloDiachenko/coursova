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
