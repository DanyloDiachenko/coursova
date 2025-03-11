import { SortDirection } from "../../constants";

export interface SortDirectionProps {
    sortDirection: SortDirection | null;
    setSortDirection: (direction: SortDirection | null) => void;
}
