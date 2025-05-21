import { Dispatch, FormEvent, SetStateAction } from "react";
import { MainFormState } from "../../constants/constants";

export interface MainFormProps {
    state: MainFormState;
    setState: Dispatch<SetStateAction<MainFormState>>;
    onGenerate: (e: FormEvent) => void;
}
