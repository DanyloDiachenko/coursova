import { RadioProps } from "./Radio.props";

export const Radio = ({
    id,
    name,
    label,
    value,
    checked,
    onChange,
    className,
}: RadioProps) => {
    return (
        <label
            className={`flex items-center cursor-pointer space-x-2 ${
                className ? className : ""
            }`}
        >
            <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center duration-300 ${
                    checked ? "border-purple-700" : "border-gray-400"
                }`}
            >
                {/* {checked && (
                    <div className="w-3 h-3 bg-purple-700 rounded-full" />
                )} */}
                <div
                    className={`w-3 h-3 bg-purple-700 rounded-full duration-300 ${
                        checked ? "opacity-100" : "opacity-0"
                    }`}
                ></div>
            </div>
            <span className="text-lg text-black">{label}</span>
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                className="hidden"
                checked={checked}
                onChange={onChange}
            />
        </label>
    );
};
