import { SortType } from "../../constants/variables";

export interface SortTypeOption {
    value: SortType;
    label: string;
}

export interface SortTypeProps {
    sortType: SortType | null;
    setSortType: (sortType: SortType | null) => void;
    options: SortTypeOption[];
}
