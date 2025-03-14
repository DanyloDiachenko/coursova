import { FormEvent, useCallback } from "react";
import { toast } from "react-toastify";
import { MAX_ARRAY_LENGTH, MAX_NUMBER, MIN_NUMBER } from "../../constants";
import { GenerateType as GenerateTypeComponent } from "../InputType";
import { Diapason } from "../Diapason";
import { InputArraySize } from "../ArraySize";
import { AddNumber } from "../AddNumber";
import { AddedNumbers } from "../AddedNumbers";
import { SortDirection as SortDirectionComponent } from "../SortDirection";
import { SortType as SortTypeComponent } from "../SortType";
import { Button } from "../Button";
import { MainFormProps } from "./MainForm.props";

export const MainForm = ({ state, setState, onGenerate }: MainFormProps) => {
    const onAddManualNumber = useCallback(() => {
        if (state.manualNumbers.length >= MAX_ARRAY_LENGTH) {
            toast.error(
                `Досягнута максимальна кількість чисел - ${MAX_ARRAY_LENGTH}`,
            );
            return;
        }

        if (!state.manualNumberInput.trim()) {
            toast.error("Введіть число");
            return;
        }

        const parsedNumber = parseInt(state.manualNumberInput);

        if (
            isNaN(parsedNumber) ||
            parsedNumber > MAX_NUMBER ||
            parsedNumber < MIN_NUMBER
        ) {
            toast.error(
                `Введіть коректне число (від ${MIN_NUMBER} до ${MAX_NUMBER})`,
            );
            return;
        }

        setState((prev) => ({
            ...prev,
            manualNumbers: [...prev.manualNumbers, parsedNumber],
            manualNumberInput: "",
        }));
    }, [state.manualNumberInput, state.manualNumbers, setState]);

    const onRemoveManualNumber = useCallback(
        (number: number) => {
            setState((prev) => ({
                ...prev,
                manualNumbers: prev.manualNumbers.filter((n) => n !== number),
            }));
        },
        [setState],
    );

    return (
        <div className="m-6">
            <form
                onSubmit={onGenerate}
                className="bg-white border-2 border-gray-200 rounded-lg p-5 inline-block"
            >
                <GenerateTypeComponent
                    generateType={state.generateType}
                    setGenerateType={(value) =>
                        setState((prev) => ({ ...prev, generateType: value }))
                    }
                />

                {state.generateType && (
                    <>
                        {state.generateType === "auto" ? (
                            <>
                                <Diapason
                                    diapason={state.diapason}
                                    setDiapason={(value) =>
                                        setState((prev) => ({
                                            ...prev,
                                            diapason: value,
                                        }))
                                    }
                                />
                                <InputArraySize
                                    arraySize={state.arraySize}
                                    setArraySize={(value) =>
                                        setState((prev) => ({
                                            ...prev,
                                            arraySize: value,
                                        }))
                                    }
                                />
                            </>
                        ) : (
                            <div className="mt-4">
                                <h2>Введіть число</h2>
                                <AddNumber
                                    manualNumberInput={state.manualNumberInput}
                                    setManualNumberInput={(value) =>
                                        setState((prev) => ({
                                            ...prev,
                                            manualNumberInput: value,
                                        }))
                                    }
                                    onAddManualNumber={onAddManualNumber}
                                />
                                <AddedNumbers
                                    manualNumbers={state.manualNumbers}
                                    onRemoveManualNumber={onRemoveManualNumber}
                                />
                            </div>
                        )}

                        <SortDirectionComponent
                            sortDirection={state.sortDirection}
                            setSortDirection={(value) =>
                                setState((prev) => ({
                                    ...prev,
                                    sortDirection: value,
                                }))
                            }
                        />
                        <SortTypeComponent
                            sortType={state.sortType}
                            setSortType={(value) =>
                                setState((prev) => ({
                                    ...prev,
                                    sortType: value,
                                }))
                            }
                        />
                    </>
                )}

                {state.generateType && (
                    <Button className="mt-6" type="submit">
                        Відсортувати
                    </Button>
                )}
            </form>
        </div>
    );
};
