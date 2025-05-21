import { Dispatch, SetStateAction } from "react";
import { SortResultProps } from "./SortResult.props";
import { SORTING_RESULT_FILE_NAME } from "../../constants/variables";

export interface VisibleLengthOption {
    title: string;
    value: string;
}

export class SortResultService {
    private readonly _originalArrayToSort: number[];
    private readonly _originalSortedArray: number[];
    public readonly sortingTime: number;
    public readonly complexity: string;

    private _currentVisibleLengthOption: VisibleLengthOption;
    private _setCurrentVisibleLengthOptionState: Dispatch<
        SetStateAction<VisibleLengthOption>
    >;

    constructor(
        props: SortResultProps,
        currentVisibleLengthOption: VisibleLengthOption,
        setCurrentVisibleLengthOptionState: Dispatch<
            SetStateAction<VisibleLengthOption>
        >,
    ) {
        this._originalArrayToSort = props.arrayToSort;
        this._originalSortedArray = props.sortedArray;
        this.sortingTime = props.sortingTime;
        this.complexity = props.complexity;
        this._currentVisibleLengthOption = currentVisibleLengthOption;
        this._setCurrentVisibleLengthOptionState =
            setCurrentVisibleLengthOptionState;
    }

    get currentVisibleLengthOption(): VisibleLengthOption {
        return this._currentVisibleLengthOption;
    }

    public setVisibleLengthOption(option: VisibleLengthOption): void {
        this._setCurrentVisibleLengthOptionState(option);
        this._currentVisibleLengthOption = option;
    }

    get visibleArrayToSort(): number[] {
        return this._originalArrayToSort.slice(
            0,
            parseInt(this._currentVisibleLengthOption.value),
        );
    }

    get visibleSortedArray(): number[] {
        return this._originalSortedArray.slice(
            0,
            parseInt(this._currentVisibleLengthOption.value),
        );
    }

    public saveResultsToFile(): void {
        const blob = new Blob([this._originalSortedArray.join("\n")], {
            type: "text/plain",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = SORTING_RESULT_FILE_NAME;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
