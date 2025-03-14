import { FormEvent, useState } from "react";
import { HelloMessage } from "./components/HelloMessage";
import { Divider } from "./components/Divider";
import { MainForm } from "./components/MainForm";
import { SortingResult } from "./components/SortingResult";
import {
    MainFormState,
    MAX_ARRAY_LENGTH,
    MAX_NUMBER,
    MIN_ARRAY_LENGTH,
    MIN_NUMBER,
} from "./constants";
import { toast } from "react-toastify";
import { Spinner } from "./components/Spinner";

const initialState: MainFormState = {
    generateType: null,
    diapason: { from: "", to: "" },
    arraySize: "",
    sortType: null,
    sortDirection: null,
    manualNumbers: [],
    manualNumberInput: "",
    isSorting: false,
    sortingResult: [],
    sortingTime: 0,
};

const App = () => {
    const [state, setState] = useState<MainFormState>(initialState);

    const validateDiapason = () => {
        if (!state.diapason.from.trim().length) {
            toast.error("Не вказано діапазон чисел від");
            return false;
        }
        if (!state.diapason.to.trim().length) {
            toast.error("Не вказано діапазон чисел до");
            return false;
        }
        const diapasonFrom = parseInt(state.diapason.from);
        if (isNaN(diapasonFrom)) {
            toast.error("Діапазон чисел від не є числом");
            return false;
        }

        const diapasonTo = parseInt(state.diapason.to);
        if (isNaN(diapasonTo)) {
            toast.error("Діапазон чисел до не є числом");
            return false;
        }
        if (diapasonFrom < MIN_NUMBER) {
            toast.error(
                `Діапазон чисел від не може бути меншим за ${MIN_NUMBER}`,
            );
            return false;
        }
        if (diapasonFrom > MAX_NUMBER) {
            toast.error(
                `Діапазон чисел від не може бути більшим за ${MAX_NUMBER}`,
            );
            return false;
        }
        if (diapasonTo < MIN_NUMBER) {
            toast.error(
                `Діапазон чисел до не може бути меншим за ${MIN_NUMBER}`,
            );
            return false;
        }
        if (diapasonTo > MAX_NUMBER) {
            toast.error(
                `Діапазон чисел до не може бути більшим за ${MAX_NUMBER}`,
            );
            return false;
        }
        if (diapasonFrom === diapasonTo) {
            toast.error(
                "Діапазон чисел від не може бути рівним діапазону чисел до",
            );
            return false;
        }

        return true;
    };

    const validateArraySize = () => {
        if (!state.arraySize.trim().length) {
            toast.error("Не вказано розмір масиву");
            return false;
        }

        const arraySize = parseInt(state.arraySize);
        if (isNaN(arraySize)) {
            toast.error("Розмір масиву не є числом");
            return false;
        }
        if (arraySize < MIN_ARRAY_LENGTH) {
            toast.error(
                `Розмір масиву не може бути меншим за ${MIN_ARRAY_LENGTH}`,
            );
            return false;
        }
        if (arraySize > MAX_ARRAY_LENGTH) {
            toast.error(
                `Розмір масиву не може бути більшим за ${MAX_ARRAY_LENGTH}`,
            );
            return false;
        }

        return true;
    };

    const validateSortDirection = () => {
        if (!state.sortDirection) {
            toast.error("Не вказано напрямок сортування");
            return false;
        }

        return true;
    };

    const validateSortType = () => {
        if (!state.sortType) {
            toast.error("Не вказано тип сортування");
            return false;
        }

        return true;
    };

    const validateManualNumberInput = () => {
        const parsedNumber = parseInt(state.manualNumberInput);
        if (isNaN(parsedNumber)) {
            toast.error("Число для додавання вручну не є числом");
            return;
        }
        if (parsedNumber < MIN_NUMBER) {
            toast.error(
                `Число для додавання вручну не може бути меншим за ${MIN_NUMBER}`,
            );
            return false;
        }
        if (parsedNumber > MAX_NUMBER) {
            toast.error(
                `Число для додавання вручну не може бути більшим за ${MAX_NUMBER}`,
            );
            return false;
        }

        return true;
    };

    const validateManualNumbers = () => {
        if (state.manualNumbers.length === 0) {
            toast.error("Не вказано числа для сортування");
            return false;
        }
        if (state.manualNumbers.length < MIN_ARRAY_LENGTH) {
            toast.error(
                `Не може бути менше ${MIN_ARRAY_LENGTH} чисел для сортування`,
            );
            return false;
        }
        if (state.manualNumbers.length > MAX_ARRAY_LENGTH) {
            toast.error(
                `Не може бути більше ${MAX_ARRAY_LENGTH} чисел для сортування`,
            );
            return false;
        }

        return true;
    };

    const validateForm = (): boolean => {
        let hasErrors = false;

        switch (state.generateType) {
            case "auto": {
                hasErrors = !validateDiapason() || hasErrors;
                hasErrors = !validateArraySize() || hasErrors;
                hasErrors = !validateSortDirection() || hasErrors;
                hasErrors = !validateSortType() || hasErrors;
                break;
            }
            case "manual": {
                if (state.manualNumberInput.trim().length > 0) {
                    hasErrors = !validateManualNumberInput() || hasErrors;
                }
                hasErrors = !validateManualNumbers() || hasErrors;
                hasErrors = !validateSortDirection() || hasErrors;
                hasErrors = !validateSortType() || hasErrors;
                break;
            }
            default:
                toast.error("Не вказано тип генерації");
                return false;
        }

        return !hasErrors;
    };

    const onGenerate = (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const generateType = state.generateType;
        const sortDirection = state.sortDirection;
        const sortType = state.sortType;

        switch (generateType) {
            case "auto": {
                const diapason = state.diapason;
                const arraySize = state.arraySize;

                break;
            }
            case "manual": {
                const manualNumbers = state.manualNumbers;

                break;
            }
            default:
                toast.error("Не вказано тип генерації");
                return;
        }
    };

    return (
        <div>
            <HelloMessage />
            <Divider />
            <MainForm
                state={state}
                setState={setState}
                onGenerate={onGenerate}
            />
            <Divider />
            {!state.isSorting && state.sortingResult.length ? (
                <>
                    <SortingResult />
                </>
            ) : (
                ""
            )}
            {state.isSorting && <Spinner />}
        </div>
    );
};

export default App;
