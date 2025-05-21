import { GenerateType } from "./variables";
import { SortTypeDefinition } from "./sortingTypes";
import { SortDirectionDefinition } from "./sortDirection";

export interface MainFormState {
    generateType: GenerateType | null;
    diapason: { from: string; to: string };
    arraySize: string;
    sortType: SortTypeDefinition | null;
    sortDirection: SortDirectionDefinition | null;
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
