import { useEffect, useRef, useState } from "react";
import { SelectProps } from "./Select.props";

export const Select = ({
    options,
    activeOption,
    onChange,
    className,
}: SelectProps) => {
    const selectRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative ${className}`}>
            <button
                ref={selectRef}
                className="w-auto px-4 py-2 border rounded-lg flex gap-5 justify-between items-center text-gray-800 bg-white shadow-sm hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{activeOption.title}</span>
                <span className="text-3xl leading-none mt-2 text-gray-600">
                    ˅
                </span>
            </button>
            {isOpen && (
                <ul className="absolute left-0 w-auto mt-1 bg-white border rounded-lg shadow-lg z-10">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                        >
                            {option.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
