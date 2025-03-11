import { InputProps } from "./Input.props";

export const Input = ({ className, ...props }: InputProps) => {
    return (
        <input
            className={`border-2 border-gray-200 rounded-md p-2 pl-3 inline w-auto ${className}`}
            {...props}
        />
    );
};
