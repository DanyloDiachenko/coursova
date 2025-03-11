import { Radio } from "../Radio";
import { SortTypeProps } from "./SortType.props";

export const SortType = ({ sortType, setSortType }: SortTypeProps) => {
    return (
        <div className="mt-4">
            <h2>Оберіть тип сортування</h2>
            <div className="flex gap-4 mt-2">
                <Radio
                    label="Блочне сортування"
                    value="block"
                    onChange={() => setSortType("block")}
                    checked={sortType === "block"}
                    id="sort-block"
                    name="sort-type"
                />
                <Radio
                    label="Сортування підрахунком"
                    value="counting"
                    onChange={() => setSortType("counting")}
                    checked={sortType === "counting"}
                    id="sort-counting"
                    name="sort-type"
                />
                <Radio
                    label="Порозрядне сортування"
                    value="radix"
                    onChange={() => setSortType("radix")}
                    checked={sortType === "radix"}
                    id="sort-radix"
                    name="sort-type"
                />
                <Radio
                    label="Флеш сортування"
                    value="flash"
                    onChange={() => setSortType("flash")}
                    checked={sortType === "flash"}
                    id="sort-flash"
                    name="sort-type"
                />
            </div>
        </div>
    );
};
