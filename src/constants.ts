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
    manualNumbers: number[];
    manualNumberInput: string;
    isSorting: boolean;
    sortingResult: number[];
}
