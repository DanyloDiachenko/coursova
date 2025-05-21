import { useState } from "react";
import { Select } from "../Select";
import { SortResultProps } from "./SortResult.props";
import { Link } from "react-router-dom";
import { VISIBLE_ARRAY_LENGTH_OPTIONS } from "../../constants/variables";
import { SortResultService, VisibleLengthOption } from "./SortResultService";

export const SortResult = (props: SortResultProps) => {
    const [arrayLength, setArrayLength] = useState(
        VISIBLE_ARRAY_LENGTH_OPTIONS[0],
    );

    const sortResultService = new SortResultService(
        props,
        arrayLength,
        setArrayLength,
    );

    return (
        <div className="m-6 pb-80">
            <h2>Результат сортування</h2>
            <div className="mt-2 text-gray-500">
                <div className="">
                    Час сортування: <b>{sortResultService.sortingTime}</b> мс
                </div>
                <div className="">
                    Складність алгоритму: <b>{sortResultService.complexity}</b>
                </div>
            </div>
            <Select
                className="mt-4"
                options={VISIBLE_ARRAY_LENGTH_OPTIONS}
                activeOption={sortResultService.currentVisibleLengthOption}
                onChange={(option) =>
                    sortResultService.setVisibleLengthOption(
                        option as VisibleLengthOption,
                    )
                }
            />
            <div className="mt-6 w-full overflow-x-auto rounded-md relative">
                <table className="bg-white min-w-max border-collapse w-full rounded-t-md">
                    <thead>
                        <tr className="border rounded-t-md">
                            <th className="text-left p-1 px-3 border-r bg-gray-100 w-40">
                                Тип
                            </th>
                            {sortResultService.visibleArrayToSort.map(
                                (_, index) => (
                                    <th
                                        className="text-left p-1 px-2 border-r font-semibold bg-gray-50 text-sm"
                                        key={index}
                                    >
                                        {index + 1}
                                    </th>
                                ),
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border">
                            <td className="p-1 px-3 border-r w-40">
                                Початковий
                            </td>
                            {sortResultService.visibleArrayToSort.map(
                                (item, index) => (
                                    <td
                                        className="p-1 px-2 border-r text-sm"
                                        key={index}
                                    >
                                        {item}
                                    </td>
                                ),
                            )}
                        </tr>
                        <tr className="border">
                            <td className="p-1 px-3 border-r w-40">
                                Відсортований
                            </td>
                            {sortResultService.visibleSortedArray.map(
                                (item, index) => (
                                    <td
                                        className="p-1 px-2 border-r text-sm"
                                        key={index}
                                    >
                                        {item}
                                    </td>
                                ),
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-2">
                <Link
                    to="#"
                    className="text-purple-600 hover:text-purple-800 font-medium"
                    onClick={sortResultService.saveResultsToFile.bind(
                        sortResultService,
                    )}
                >
                    Завантажити результат у файл
                </Link>
            </div>
        </div>
    );
};
