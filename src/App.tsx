import { FormEvent, useState } from "react";
import { Radio } from "./components/Radio";
import { Input } from "./components/Input";
import { Button } from "./components/Button";

type GenerateType = "auto" | "manual";
type SortDirection = "asc" | "desc";
type SortType = "block" | "counting" | "radix" | "flash";

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

    const onGenerate = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <div>
            <div className="m-6 pb-0">
                <h1>Програма Сортування Масивів</h1>
                <p className="mt-6">
                    Цей застосунок дозволяє створювати, генерувати та сортувати
                    послідовності чисел, вказуючи їх розмір, тип чисел
                    (цілочисельні, дробові, знакосталість тощо), обирати метод
                    сортування з чотирьох запропонованих, обирати кращий метод
                    шляхом аналізу результатів (час сортування, складність
                    алгоритму тощо).
                </p>
                <p className="mt-3">
                    При автоматичній генерації необхідно вказати діапазон
                    значень (від і до), розмір масиву, вказати напрям сортування
                    (від більшого або меншого чи навпаки) та обрати тип
                    сортування.
                </p>
                <p className="mt-3">
                    При вводі масиву самостійно потрібно вводити кожне з чисел
                    (до 50000 штук), вказавши напрям сортування та можливій з
                    типів.
                </p>
            </div>
            <div className="my-6 border-t-2 border-gray-200"></div>
            <div className="m-6">
                <form
                    onSubmit={onGenerate}
                    className="bg-white border-2 border-gray-200 rounded-lg p-5 inline-block"
                >
                    <div>
                        <h2>Оберіть тип вводу</h2>
                        <div className="flex gap-4 mt-2">
                            <Radio
                                label="Згенерувати автоматично"
                                name="generate-type"
                                value="auto"
                                onChange={() => setGenerateType("auto")}
                                checked={generateType === "auto"}
                                id="generate-auto"
                            />
                            <Radio
                                label="Ввести самостійно"
                                name="generate-type"
                                value="manual"
                                onChange={() => setGenerateType("manual")}
                                checked={generateType === "manual"}
                                id="generate-manual"
                            />
                        </div>
                    </div>
                    {generateType && (
                        <>
                            {generateType === "auto" ? (
                                <>
                                    <label className="mt-4 block">
                                        <h2>
                                            Введіть діапазон можливих значень
                                        </h2>
                                        <div className="flex gap-4 mt-2">
                                            <Input
                                                placeholder="Від..."
                                                value={diapason?.from}
                                                onChange={(e) =>
                                                    setDiapason({
                                                        ...diapason,
                                                        from: e.target.value,
                                                    })
                                                }
                                            />
                                            <Input
                                                placeholder="До..."
                                                value={diapason?.to}
                                                onChange={(e) =>
                                                    setDiapason({
                                                        ...diapason,
                                                        to: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </label>
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
                                ""
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
                    <Button className="mt-6" type="submit">
                        Відсортувати
                    </Button>
                </form>
            </div>
            <div className="my-6 border-t-2 border-gray-200"></div>
            <div className="m-6">
                <h2>Результат сортування</h2>
            </div>
        </div>
    );
};

export default App;
