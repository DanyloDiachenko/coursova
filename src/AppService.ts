import { Dispatch, SetStateAction } from "react";
import { MainFormState } from "./constants/mainFormState.interface";
import { toast } from "react-toastify";
import {
    MAX_ARRAY_LENGTH,
    MAX_NUMBER,
    MIN_ARRAY_LENGTH,
    MIN_NUMBER,
} from "./constants/variables";
import { ArrayGenerator } from "./constants/ArrayGenerator";
export class AppService {
    private _state: MainFormState;
    private _setStateReact: Dispatch<SetStateAction<MainFormState>>;
    private _arrayGenerator: ArrayGenerator = new ArrayGenerator();

    constructor(
        initialState: MainFormState,
        setStateReact: Dispatch<SetStateAction<MainFormState>>,
    ) {
        this._state = initialState;
        this._setStateReact = setStateReact;
    }

    public get currentState(): Readonly<MainFormState> {
        return this._state;
    }

    public updateMainFormState(
        updater: (prevState: MainFormState) => MainFormState,
    ): void {
        const newState = updater(this._state);
        this._state = newState;
        this._setStateReact(newState);
    }

    private _validateRange(from: string, to: string): boolean {
        const parsedFrom = parseFloat(from);
        const parsedTo = parseFloat(to);

        if (!from.trim().length || isNaN(parsedFrom)) {
            toast.error("Невірне значення діапазону 'від'");
            return false;
        }
        if (!to.trim().length || isNaN(parsedTo)) {
            toast.error("Невірне значення діапазону 'до'");
            return false;
        }
        if (parsedFrom < MIN_NUMBER || parsedFrom > MAX_NUMBER) {
            toast.error(
                `Діапазон 'від' має бути між ${MIN_NUMBER} і ${MAX_NUMBER}`,
            );
            return false;
        }
        if (parsedTo < MIN_NUMBER || parsedTo > MAX_NUMBER) {
            toast.error(
                `Діапазон 'до' має бути між ${MIN_NUMBER} і ${MAX_NUMBER}`,
            );
            return false;
        }
        if (parsedFrom >= parsedTo) {
            toast.error("Діапазон 'від' має бути меншим за 'до'");
            return false;
        }
        return true;
    }

    private _validateArraySize(size: string): boolean {
        const parsedSize = parseInt(size);
        if (
            !size.trim().length ||
            isNaN(parsedSize) ||
            parsedSize < MIN_ARRAY_LENGTH ||
            parsedSize > MAX_ARRAY_LENGTH
        ) {
            toast.error(
                `Розмір масиву має бути між ${MIN_ARRAY_LENGTH} і ${MAX_ARRAY_LENGTH}`,
            );
            return false;
        }
        return true;
    }

    private _validateFormForSorting(): boolean {
        const {
            sortType,
            sortDirection,
            generateType,
            diapason,
            arraySize,
            manualNumbers,
        } = this._state;
        if (!sortType || !sortDirection) {
            toast.error("Не вказано тип або напрямок сортування");
            return false;
        }
        if (generateType === "auto") {
            if (
                !this._validateRange(diapason.from, diapason.to) ||
                !this._validateArraySize(arraySize)
            ) {
                return false;
            }
        } else if (generateType === "manual") {
            if (manualNumbers.length < MIN_ARRAY_LENGTH) {
                toast.error(
                    `Необхідно ввести мінімум ${MIN_ARRAY_LENGTH} чисел`,
                );
                return false;
            }
        } else {
            toast.error("Не обрано спосіб генерації масиву");
            return false;
        }
        return true;
    }

    public handleSortRequest(): void {
        if (!this._validateFormForSorting()) return;

        const { generateType, arraySize, diapason, manualNumbers, sortType } =
            this._state;

        let arrayToSortLocal: number[] = [];
        if (generateType === "auto") {
            arrayToSortLocal = this._arrayGenerator.generate(
                parseInt(arraySize),
                {
                    from: parseFloat(diapason.from),
                    to: parseFloat(diapason.to),
                },
            );
        } else if (generateType === "manual") {
            arrayToSortLocal = manualNumbers.map((item) => item.value);
        } else {
            toast.error("Невірний тип генерації масиву. Стан некоректний.");
            return;
        }

        const validationResult = sortType!.validateData(arrayToSortLocal);
        if (!validationResult.isValid) {
            toast.error(
                validationResult.errorMessage ||
                    "Масив не підходить для обраного алгоритму сортування.",
            );
            return;
        }

        this.updateMainFormState((prev) => ({
            ...prev,
            isSorting: true,
            sortedArray: [],
            steps: [],
            sortingTime: 0,
            complexity: "",
        }));

        setTimeout(() => {
            const sortingTimeStart = performance.now();
            const newSortSessionId = Date.now().toString();
            const shouldShowAnimation =
                arrayToSortLocal.length <= 20 && arrayToSortLocal.length > 0;

            if (!shouldShowAnimation && arrayToSortLocal.length > 20) {
                toast.warning(
                    "Анімація сортування не відображатиметься для масивів більших за 20 елементів",
                );
            }

            let collectedStepsForAnimation: number[][] = [];
            let finalSortedArray: number[] = [];

            const processSortGenerator = (
                generator: Generator<number[], number[], unknown>,
            ) => {
                let result = generator.next();
                while (!result.done) {
                    if (shouldShowAnimation) {
                        collectedStepsForAnimation.push([...result.value]);
                    }
                    result = generator.next(result.value);
                }
                finalSortedArray = result.value as number[];
            };

            const currentAlgorithmInstance = this._state.sortType!.algorithm;
            const currentDirectionId = this._state.sortDirection!.id;

            const sortGenerator = currentAlgorithmInstance.sort(
                [...arrayToSortLocal],
                currentDirectionId,
            );
            processSortGenerator(sortGenerator);

            const sortingTimeEnd = performance.now() - sortingTimeStart;

            this.updateMainFormState((prev) => ({
                ...prev,
                arrayToSort: arrayToSortLocal,
                sortedArray: finalSortedArray,
                isSorting: false,
                sortingTime: sortingTimeEnd,
                complexity: this._state.sortType!.complexity || "",
                steps: shouldShowAnimation ? collectedStepsForAnimation : [],
                sortSessionId: newSortSessionId,
            }));
        }, 0);
    }
}
