import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import {
    GenerateType,
    MAX_ARRAY_LENGTH,
    MAX_NUMBER,
    MIN_NUMBER,
    SortDirection,
    SortType,
} from "../../constants";
import { GenerateType as GenerateTypeComponent } from "../InputType";
import { Diapason } from "../Diapason";
import { InputArraySize } from "../ArraySize";
import { AddNumber } from "../AddNumber";
import { AddedNumbers } from "../AddedNumbers";
import { SortDirection as SortDirectionComponent } from "../SortDirection";
import { SortType as SortTypeComponent } from "../SortType";
import { Button } from "../Button";

export const MainForm = () => {
    const [generateType, setGenerateType] = useState<GenerateType | null>(null);
    const [diapason, setDiapason] = useState<{
        from: string;
        to: string;
    }>({
        from: "",
        to: "",
    });
    const [arraySize, setArraySize] = useState<string>("");
    const [sortType, setSortType] = useState<SortType | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection | null>(
        null,
    );
    const [manualNumbers, setManualNumbers] = useState<number[]>([]);
    const [manualNumberInput, setManualNumberInput] = useState<string>("");

    const onAddManualNumber = () => {
        if (manualNumbers.length >= MAX_ARRAY_LENGTH) {
            toast.error(
                `Досягнута максимальна кількість чисел - ${MAX_ARRAY_LENGTH}`,
            );
            return;
        }

        if (!manualNumberInput?.trim()) {
            toast.error("Введіть число");
            return;
        }

        const parsedNumber = parseInt(manualNumberInput);

        if (isNaN(parsedNumber)) {
            toast.error("Введіть коректне число");
            return;
        }

        if (parsedNumber > MAX_NUMBER) {
            toast.error(`Число не може бути більшим за ${MAX_NUMBER}`);
            return;
        }

        if (parsedNumber < MIN_NUMBER) {
            toast.error(`Число не може бути меншим за ${MIN_NUMBER}`);
            return;
        }

        setManualNumbers([...manualNumbers, parsedNumber]);
    };

    const onRemoveManualNumber = (number: number) => {
        setManualNumbers(manualNumbers.filter((n) => n !== number));
    };

    const onGenerate = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="m-6">
            <form
                onSubmit={onGenerate}
                className="bg-white border-2 border-gray-200 rounded-lg p-5 inline-block"
            >
                <GenerateTypeComponent
                    generateType={generateType}
                    setGenerateType={setGenerateType}
                />
                {generateType && (
                    <>
                        {generateType === "auto" ? (
                            <>
                                <Diapason
                                    diapason={diapason}
                                    setDiapason={setDiapason}
                                />
                                <InputArraySize
                                    arraySize={arraySize}
                                    setArraySize={setArraySize}
                                />
                            </>
                        ) : (
                            <>
                                <div className="mt-4">
                                    <h2>Введіть число</h2>
                                    <AddNumber
                                        manualNumberInput={manualNumberInput}
                                        setManualNumberInput={
                                            setManualNumberInput
                                        }
                                        onAddManualNumber={onAddManualNumber}
                                    />
                                    <AddedNumbers
                                        manualNumbers={manualNumbers}
                                        onRemoveManualNumber={
                                            onRemoveManualNumber
                                        }
                                    />
                                </div>
                            </>
                        )}
                        <SortDirectionComponent
                            sortDirection={sortDirection}
                            setSortDirection={setSortDirection}
                        />
                        <SortTypeComponent
                            sortType={sortType}
                            setSortType={setSortType}
                        />
                    </>
                )}
                {generateType && (
                    <Button className="mt-6" type="submit">
                        Відсортувати
                    </Button>
                )}
            </form>
        </div>
    );
};
