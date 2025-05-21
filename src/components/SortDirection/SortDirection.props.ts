import { SortDirection } from "../../constants/variables";

export interface SortDirectionOption {
    value: SortDirection;
    label: string;
}

export interface SortDirectionProps {
    sortDirection: SortDirection | null;
    setSortDirection: (sortDirection: SortDirection | null) => void;
    options: SortDirectionOption[];
}
