import { Button } from "../Button";
import { Input } from "../Input";
import { AddNumberProps } from "./AddNumber.props";

export const AddNumber = ({
    manualNumberInput,
    setManualNumberInput,
    onAddManualNumber,
}: AddNumberProps) => {
    return (
        <div className="mt-2 flex gap-3 items-center">
            <Input
                placeholder="Число..."
                value={manualNumberInput || ""}
                onChange={(e) => setManualNumberInput(e.target.value)}
            />
            <Button className="px-4" onClick={onAddManualNumber}>
                Додати
            </Button>
        </div>
    );
};
