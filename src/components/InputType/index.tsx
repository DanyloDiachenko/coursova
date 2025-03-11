import { Radio } from "../Radio";
import { GenerateTypeProps } from "./GenerateType.props";

export const GenerateType = ({
    setGenerateType,
    generateType,
}: GenerateTypeProps) => {
    return (
        <div>
            <h2>Оберіть тип вводу</h2>
            <div className="flex gap-4 mt-2">
                <Radio
                    label="Згенерувати автоматично"
                    name="generate-type"
                    value="auto"
                    onChange={() => setGenerateType("auto")}
                    checked={generateType === "auto"}
                    id="generate-auto"
                />
                <Radio
                    label="Ввести самостійно"
                    name="generate-type"
                    value="manual"
                    onChange={() => setGenerateType("manual")}
                    checked={generateType === "manual"}
                    id="generate-manual"
                />
            </div>
        </div>
    );
};
