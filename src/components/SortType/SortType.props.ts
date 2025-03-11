import { SortType } from "../../constants";

export interface SortTypeProps {
    sortType: SortType | null;
    setSortType: (type: SortType | null) => void;
}
