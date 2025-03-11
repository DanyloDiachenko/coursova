import { GenerateType } from "../../constants";

export interface GenerateTypeProps {
    generateType: GenerateType | null;
    setGenerateType: (type: GenerateType | null) => void;
}
