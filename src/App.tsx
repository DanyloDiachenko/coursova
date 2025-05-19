// App.tsx
import { FormEvent, useState } from "react";
import { HelloMessage } from "./components/HelloMessage";
import { Divider } from "./components/Divider";
import { MainForm } from "./components/MainForm";
import { SortResult } from "./components/SortResult";
import {
    blockSort,
    countingSort,
    flashSort,
    generateArray,
    MainFormState,
    MAX_ARRAY_LENGTH,
    MAX_NUMBER,
    MIN_ARRAY_LENGTH,
    MIN_NUMBER,
    radixSort,
    SortDirection,
    SORTING_ALGORITHMS_WITH_COMPLEXITY,
} from "./constants";
import { toast } from "react-toastify";
import { Spinner } from "./components/Spinner";
import { SortProcess } from "./components/SortProcess";

const validateRange = (from: string, to: string) => {
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
        toast.error(`Діапазон 'до' має бути між ${MIN_NUMBER} і ${MAX_NUMBER}`);
        return false;
    }
    if (parsedFrom >= parsedTo) {
        toast.error("Діапазон 'від' має бути меншим за 'до'");
        return false;
    }
    return true;
};

const validateArraySize = (size: string) => {
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
};

const initialState: MainFormState = {
    generateType: null,
    diapason: { from: "", to: "" },
    arraySize: "",
    sortType: null,
    sortDirection: null,
    manualNumbers: [],
    manualNumberInput: "",
    isSorting: false,
    sortingTime: 0,
    sortedArray: [],
    arrayToSort: [],
    steps: [],
    complexity: "",
    sortSessionId: Date.now().toString(),
};

const validateForm = (state: MainFormState): boolean => {
    if (!state.sortType || !state.sortDirection) {
        toast.error("Не вказано тип або напрямок сортування");
        return false;
    }
    if (state.generateType === "auto") {
        return (
            validateRange(state.diapason.from, state.diapason.to) &&
            validateArraySize(state.arraySize)
        );
    }
    if (
        state.generateType === "manual" &&
        state.manualNumbers.length < MIN_ARRAY_LENGTH
    ) {
        toast.error(`Необхідно ввести мінімум ${MIN_ARRAY_LENGTH} чисел`);
        return false;
    }
    return true;
};

const App = () => {
    const [state, setState] = useState<MainFormState>(initialState);

    const onGenerate = (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm(state)) return;

        const {
            generateType,
            sortDirection,
            sortType,
            diapason,
            arraySize,
            manualNumbers,
        } = state;

        let arrayToSort: number[] = [];
        if (generateType === "auto") {
            arrayToSort = generateArray(parseInt(arraySize), {
                from: parseFloat(diapason.from),
                to: parseFloat(diapason.to),
            });
        } else {
            arrayToSort = manualNumbers.map((item) => item.value);
        }

        if (sortType === "counting" || sortType === "radix") {
            if (Math.min(...arrayToSort) < 0) {
                toast.error(
                    "Сортування підрахунком та порозрядне сортування не підтримує від'ємні числа",
                );
                return;
            }
            if (!arrayToSort.every(Number.isInteger)) {
                toast.error(
                    "Сортування підрахунком та порозрядне сортування підтримує тільки цілі числа",
                );
                return;
            }
        }

        const sortingTimeStart = performance.now();
        let steps: number[][] = [];
        let sortedArray: number[] = [];
        const newSortSessionId = Date.now().toString();

        const collectSteps = (
            generator: Generator<number[], number[], unknown>,
        ) => {
            let result = generator.next();
            while (!result.done) {
                steps.push([...result.value]);
                result = generator.next(result.value);
            }
            sortedArray = result.value as number[];
        };

        switch (sortType) {
            case "block": {
                const generator = blockSort(
                    [...arrayToSort],
                    sortDirection as SortDirection,
                );
                collectSteps(generator);
                break;
            }
            case "counting": {
                const generator = countingSort(
                    [...arrayToSort],
                    sortDirection as SortDirection,
                );
                collectSteps(generator);
                break;
            }
            case "radix": {
                const generator = radixSort(
                    [...arrayToSort],
                    sortDirection as SortDirection,
                );
                collectSteps(generator);
                break;
            }
            case "flash": {
                const generator = flashSort(
                    [...arrayToSort],
                    sortDirection as SortDirection,
                );
                collectSteps(generator);
                break;
            }
            default:
                toast.error("Невалідний тип сортування");
                return;
        }

        const sortingTime = performance.now() - sortingTimeStart;

        setState((prev) => ({
            ...prev,
            sortedArray,
            arrayToSort,
            isSorting: false,
            sortingTime,
            complexity: SORTING_ALGORITHMS_WITH_COMPLEXITY[sortType!],
            steps,
            sortSessionId: newSortSessionId,
        }));
    };

    return (
        <>
            <SortProcess
                isOpened={state.steps.length > 0}
                onCloseClick={() =>
                    setState((prev) => ({ ...prev, steps: [] }))
                }
                steps={state.steps}
                key={`${state.arrayToSort.join(",")}-${state.sortSessionId}`}
            />
            <div>
                <HelloMessage />
                <Divider />
                <MainForm
                    state={state}
                    setState={setState}
                    onGenerate={onGenerate}
                />
                <Divider />
                {state.isSorting ? (
                    <Spinner />
                ) : (
                    state.sortedArray.length > 0 && (
                        <SortResult
                            arrayToSort={state.arrayToSort}
                            sortedArray={state.sortedArray}
                            sortingTime={state.sortingTime}
                            complexity={state.complexity}
                        />
                    )
                )}
            </div>
        </>
    );
};

export default App;
