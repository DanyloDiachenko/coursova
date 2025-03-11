import { useState } from "react";
import { Radio } from "./components/Radio";
import { Input } from "./components/Input";

type GenerateType = "auto" | "manual";
type SortDirection = "asc" | "desc";

const App = () => {
    const [generateType, setGenerateType] = useState<GenerateType | null>(null);
    const [diapason, setDiapason] = useState<{
        from: string;
        to: string;
    }>({
        from: "",
        to: "",
    });
    const [sortDirection, setSortDirection] = useState<SortDirection | null>(
        null,
    );

    return (
        <div>
            <div className="m-10 pb-0">
                <h1>Програма Сортування Масивів</h1>
                <p className="mt-8">
                    Цей застосунок дозволяє створювати, генерувати та сортувати
                    послідовності чисел, вказуючи їх розмір, тип чисел
                    (цілочисельні, дробові, знакосталість тощо), обирати метод
                    сортування з чотирьох запропонованих, обирати кращий метод
                    шляхом аналізу результатів (час сортування, складність
                    алгоритму тощо).
                </p>
                <p className="mt-4">
                    При автоматичній генерації необхідно вказати діапазон
                    значень (від і до), розмір масиву, вказати напрям сортування
                    (від більшого або меншого чи навпаки) та обрати тип
                    сортування.
                </p>
                <p className="mt-4">
                    При вводі масиву самостійно потрібно вводити кожне з чисел
                    (до 50000 штук), вказавши напрям сортування та можливій з
                    типів.
                </p>
            </div>
            <div className="my-10 border-t-2 border-gray-200"></div>
            <div className="m-10">
                <form
                    action=""
                    className="bg-white border-2 border-gray-200 rounded-lg p-5"
                >
                    <div>
                        <h2>Оберіть тип вводу</h2>
                        <div className="flex gap-4 mt-3">
                            <Radio
                                label="Сгенерувати автоматично"
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
                    {generateType === "auto" ? (
                        <>
                            <label className="mt-6 block">
                                <h2>Введіть діапазон можливих значень</h2>
                                <div className="flex gap-4 mt-3">
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
                            <label className="mt-6 block">
                                <h2>Введіть розмір масиву</h2>
                                <div className="mt-3">
                                    <Input placeholder="Розмір масиву..." />
                                </div>
                            </label>
                            <div className="mt-6">
                                <h2>Введіть напрям сортування</h2>
                                <div className="flex gap-4 mt-3">
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
                        </>
                    ) : (
                        <></>
                    )}
                </form>
            </div>
        </div>
    );
};

export default App;
