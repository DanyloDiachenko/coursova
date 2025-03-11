import { Dispatch, SetStateAction } from "react";
import { MainFormState } from "../../constants";

export interface MainFormProps {
    state: MainFormState;
    setState: Dispatch<SetStateAction<MainFormState>>;
}
