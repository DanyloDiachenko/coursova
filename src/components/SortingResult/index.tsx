import { useState } from "react";
import {
    SORTING_RESULT_FILE_NAME,
    VISIBLE_ARRAY_LENGTH_OPTIONS,
} from "../../constants";
import { Select } from "../Select";
import { SortingResultProps } from "./SortingResult.props";
import { Link } from "react-router-dom";

export const SortingResult = ({
    sortedArray,
    arrayToSort,
    sortingTime,
}: SortingResultProps) => {
    const [arrayLength, setArrayLength] = useState(
        VISIBLE_ARRAY_LENGTH_OPTIONS[0],
    );

    const visibleArrayToSort = arrayToSort.slice(
        0,
        parseInt(arrayLength.value),
    );
    const visibleSortedArray = sortedArray.slice(
        0,
        parseInt(arrayLength.value),
    );

    const onSaveResultsInFileClick = () => {
        const blob = new Blob([sortedArray.join("\n")], {
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
    };

    return (
        <div className="m-6 pb-80">
            <h2>Результат сортування</h2>
            <div className="mt-2 text-gray-500">
                <div className="">
                    Час сортування: <b>{sortingTime.toFixed(2)}</b> мс
                </div>
            </div>
            <Select
                className="mt-4"
                options={VISIBLE_ARRAY_LENGTH_OPTIONS}
                activeOption={arrayLength}
                onChange={(option) => setArrayLength(option)}
            />
            <div className="mt-6 w-full overflow-x-auto rounded-md relative">
                <table className="bg-white min-w-max border-collapse w-full rounded-t-md">
                    <thead>
                        <tr className="border rounded-t-md">
                            <th className="text-left p-1 px-3 border-r bg-gray-100 w-40">
                                Тип
                            </th>
                            {visibleArrayToSort.map((_, index) => (
                                <th
                                    className="text-left p-1 px-2 border-r font-semibold bg-gray-50 text-sm"
                                    key={index}
                                >
                                    {index + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border">
                            <td className="p-1 px-3 border-r w-40">
                                Початковий
                            </td>
                            {visibleArrayToSort.map((item, index) => (
                                <td
                                    className="p-1 px-2 border-r text-sm"
                                    key={index}
                                >
                                    {item}
                                </td>
                            ))}
                        </tr>
                        <tr className="border">
                            <td className="p-1 px-3 border-r w-40">
                                Відсортований
                            </td>
                            {visibleSortedArray.map((item, index) => (
                                <td
                                    className="p-1 px-2 border-r text-sm"
                                    key={index}
                                >
                                    {item}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-2">
                <Link
                    to="#"
                    className="text-purple-600 hover:text-purple-800 font-medium"
                    onClick={onSaveResultsInFileClick}
                >
                    Завантажити результат у файл
                </Link>
            </div>
        </div>
    );
};
