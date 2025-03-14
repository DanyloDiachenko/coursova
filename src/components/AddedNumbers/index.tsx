import { AddedNumbersProps } from "./AddedNumbers.props";

export const AddedNumbers = ({
    manualNumbers,
    onRemoveManualNumber,
}: AddedNumbersProps) => {
    return (
        <div className="flex items-center mt-2 gap-2">
            <div className="text-gray-500">Додані числа:</div>
            <div className="flex gap-2 text-wrap">
                {manualNumbers.map((number, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 p-1 px-2 text-sm rounded-md bg-gray-100"
                    >
                        <span className="text-gray-500 ">{number.value}</span>
                        <button
                            className="text-red-500 hover:text-red-700 duration-300 mt-[2px]"
                            onClick={() => onRemoveManualNumber(number.id)}
                        >
                            ╳
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
