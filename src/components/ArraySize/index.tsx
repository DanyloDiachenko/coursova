import { Input } from "../Input";
import { ArraySizeProps } from "./ArraySize.props";

export const InputArraySize = ({ arraySize, setArraySize }: ArraySizeProps) => {
    return (
        <label className="mt-4 block">
            <h2>Введіть розмір масиву</h2>
            <div className="mt-2">
                <Input
                    placeholder="Розмір масиву..."
                    value={arraySize}
                    onChange={(e) => setArraySize(e.target.value)}
                />
            </div>
        </label>
    );
};
