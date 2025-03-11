import { FormEvent, useState } from "react";
import { Radio } from "./components/Radio";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { Select } from "./components/Select";
import { toast } from "react-toastify";
import {
    GenerateType,
    MAX_ARRAY_LENGTH,
    MAX_NUMBER,
    MIN_NUMBER,
    SortDirection,
    SortType,
} from "./constants";
import { HelloMessage } from "./components/HelloMessage";
import { Divider } from "./components/Divider";
import { GenerateType as GenerateTypeComponent } from "./components/InputType";
import { Diapason } from "./components/Diapason";

const arrayLengthOptions = [
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

const App = () => {
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
    const [manualNumberInput, setManualNumberInput] = useState<string | null>(
        null,
    );
    const [arrayLength, setArrayLength] = useState(arrayLengthOptions[0]);

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
        <div>
            <HelloMessage />
            <Divider />
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
                                    <label className="mt-4 block">
                                        <h2>Введіть розмір масиву</h2>
                                        <div className="mt-2">
                                            <Input
                                                placeholder="Розмір масиву..."
                                                value={arraySize}
                                                onChange={(e) =>
                                                    setArraySize(e.target.value)
                                                }
                                            />
                                        </div>
                                    </label>
                                </>
                            ) : (
                                <>
                                    <div className="mt-4">
                                        <h2>Введіть число</h2>
                                        <div className="mt-2 flex gap-3 items-center">
                                            <Input
                                                placeholder="Число..."
                                                value={manualNumberInput || ""}
                                                onChange={(e) =>
                                                    setManualNumberInput(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <Button
                                                className="px-4"
                                                onClick={onAddManualNumber}
                                            >
                                                Додати
                                            </Button>
                                        </div>
                                        <div className="flex items-center mt-2 gap-2">
                                            <div className="text-gray-500">
                                                Додані числа:
                                            </div>
                                            <div className="flex gap-2 text-wrap">
                                                {manualNumbers.map(
                                                    (number, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-2 p-1 px-2 text-sm rounded-md bg-gray-100"
                                                        >
                                                            <span className="text-gray-500 ">
                                                                {number}
                                                            </span>
                                                            <button
                                                                className="text-red-500 hover:text-red-700 duration-300 mt-[2px]"
                                                                onClick={() =>
                                                                    onRemoveManualNumber(
                                                                        number,
                                                                    )
                                                                }
                                                            >
                                                                ╳
                                                            </button>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="mt-4">
                                <h2>Оберіть напрям сортування</h2>
                                <div className="flex gap-4 mt-2">
                                    <Radio
                                        label="За зростанням"
                                        value="asc"
                                        onChange={() => setSortDirection("asc")}
                                        checked={sortDirection === "asc"}
                                        id="sort-asc"
                                        name="sort-direction"
                                    />
                                    <Radio
                                        label="За спаданням"
                                        value="desc"
                                        onChange={() =>
                                            setSortDirection("desc")
                                        }
                                        checked={sortDirection === "desc"}
                                        id="sort-desc"
                                        name="sort-direction"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h2>Оберіть тип сортування</h2>
                                <div className="flex gap-4 mt-2">
                                    <Radio
                                        label="Блочне сортування"
                                        value="block"
                                        onChange={() => setSortType("block")}
                                        checked={sortType === "block"}
                                        id="sort-block"
                                        name="sort-type"
                                    />
                                    <Radio
                                        label="Сортування підрахунком"
                                        value="counting"
                                        onChange={() => setSortType("counting")}
                                        checked={sortType === "counting"}
                                        id="sort-counting"
                                        name="sort-type"
                                    />
                                    <Radio
                                        label="Порозрядне сортування"
                                        value="radix"
                                        onChange={() => setSortType("radix")}
                                        checked={sortType === "radix"}
                                        id="sort-radix"
                                        name="sort-type"
                                    />
                                    <Radio
                                        label="Флеш сортування"
                                        value="flash"
                                        onChange={() => setSortType("flash")}
                                        checked={sortType === "flash"}
                                        id="sort-flash"
                                        name="sort-type"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {generateType && (
                        <Button className="mt-6" type="submit">
                            Відсортувати
                        </Button>
                    )}
                </form>
            </div>
            <div className="my-6 border-t-2 border-gray-200"></div>
            <div className="m-6">
                <h2>Результат сортування</h2>
                <Select
                    className="mt-2"
                    options={arrayLengthOptions}
                    activeOption={arrayLength}
                    onChange={(option) => setArrayLength(option)}
                />
                <div className="mt-6">
                    <table></table>
                </div>
            </div>
        </div>
    );
};

export default App;
