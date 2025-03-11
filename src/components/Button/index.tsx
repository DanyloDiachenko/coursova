import { ButtonProps } from "./Button.props";

export const Button = ({ children, className, ...props }: ButtonProps) => {
    return (
        <button
            className={`bg-purple-700 text-white text-lg px-10 py-2 rounded-md ${
                className ? className : ""
            }`}
            {...props}
        >
            {children}
        </button>
    );
};
