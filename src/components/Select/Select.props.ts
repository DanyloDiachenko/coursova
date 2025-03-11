interface Option {
    title: string;
    value: string;
}

export interface SelectProps {
    options: Option[];
    activeOption: Option;
    onChange: (option: Option) => void;
    className?: string;
}
