import { Radio } from "../Radio";
import { SortDirectionProps } from "./SortDirection.props";

export const SortDirection = ({
    sortDirection,
    setSortDirection,
}: SortDirectionProps) => {
    return (
        <div className="mt-4">
            <h2>Оберіть напрям сортування</h2>
            <div className="flex gap-4 mt-2 flex-wrap">
                <Radio
                    label="За зростанням"
                    value="asc"
                    onChange={() => setSortDirection("asc")}
                    checked={sortDirection === "asc"}
                    id="sort-asc"
                    name="sort-direction"
                />
                <Radio
                    label="За спаданням"
                    value="desc"
                    onChange={() => setSortDirection("desc")}
                    checked={sortDirection === "desc"}
                    id="sort-desc"
                    name="sort-direction"
                />
            </div>
        </div>
    );
};
