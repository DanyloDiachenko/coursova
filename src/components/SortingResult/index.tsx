import { useState } from "react";
import { VISIBLE_ARRAY_LENGTH_OPTIONS } from "../../constants";
import { Select } from "../Select";

export const SortingResult = () => {
    const [arrayLength, setArrayLength] = useState(
        VISIBLE_ARRAY_LENGTH_OPTIONS[0],
    );

    return (
        <div className="m-6">
            <h2>Результат сортування</h2>
            <Select
                className="mt-2"
                options={VISIBLE_ARRAY_LENGTH_OPTIONS}
                activeOption={arrayLength}
                onChange={(option) => setArrayLength(option)}
            />
            <div className="mt-6">
                <table></table>
            </div>
        </div>
    );
};
