import { InputHTMLAttributes } from "react";

export interface RadioProps {
    id: string;
    name: string;
    label: string;
    value: string;
    checked: boolean;
    onChange: () => void;
    className?: string;
}
