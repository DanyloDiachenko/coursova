import { toast } from "react-toastify";
import {
    MAX_ARRAY_LENGTH,
    MAX_NUMBER,
    MIN_NUMBER,
    GenerateType,
    SortDirection,
    SortType,
} from "../../constants/variables";
import { MainFormState } from "../../constants/mainFormState.interface";
import { SortTypeDefinition, SortTypes } from "../../constants/sortingTypes";
import { SortDirectionDefinition } from "../../constants/sortDirection";

export class MainFormService {
    private _state: MainFormState;
    private setState: (
        updater: (prevState: MainFormState) => MainFormState,
    ) => void;

    constructor(
        state: MainFormState,
        setState: (
            updater: (prevState: MainFormState) => MainFormState,
        ) => void,
    ) {
        this._state = state;
        this.setState = setState;
    }

    get state(): Readonly<MainFormState> {
        return this._state;
    }

    get generateType(): GenerateType | null {
        return this._state.generateType;
    }

    get diapason(): { from: string; to: string } {
        return this._state.diapason;
    }

    get arraySize(): string {
        return this._state.arraySize;
    }

    get sortType(): SortTypeDefinition | null {
        return this._state.sortType;
    }

    get sortDirection(): SortDirectionDefinition | null {
        return this._state.sortDirection;
    }

    get manualNumbers(): ReadonlyArray<{ value: number; id: number }> {
        return this._state.manualNumbers;
    }

    get manualNumberInput(): string {
        return this._state.manualNumberInput;
    }

    private validateManualNumberInputLength(): boolean {
        if (this._state.manualNumbers.length >= MAX_ARRAY_LENGTH) {
            toast.error(
                `Досягнута максимальна кількість чисел - ${MAX_ARRAY_LENGTH}`,
            );
            return false;
        }

        return true;
    }

    private validateManualNumberInput(): boolean {
        if (!this._state.manualNumberInput.trim()) {
            toast.error("Введіть число");
            return false;
        }

        return true;
    }

    private parseManualNumberInput(): number {
        return parseFloat(this._state.manualNumberInput);
    }

    private validateManualNumberInputNumber(): boolean {
        const parsedNumber = this.parseManualNumberInput();

        if (
            isNaN(parsedNumber) ||
            parsedNumber > MAX_NUMBER ||
            parsedNumber < MIN_NUMBER
        ) {
            toast.error(
                `Введіть коректне число (від ${MIN_NUMBER} до ${MAX_NUMBER})`,
            );
            return false;
        }

        return true;
    }

    public addManualNumber() {
        if (!this.validateManualNumberInputLength()) {
            return;
        }

        if (!this.validateManualNumberInput()) {
            return;
        }

        if (!this.validateManualNumberInputNumber()) {
            return;
        }

        this.setState((prev: MainFormState) => ({
            ...prev,
            manualNumbers: [
                ...prev.manualNumbers,
                {
                    value: this.parseManualNumberInput(),
                    id: Date.now(),
                },
            ],
            manualNumberInput: "",
        }));
    }

    public removeManualNumber(numberId: number) {
        this.setState((prev: MainFormState) => ({
            ...prev,
            manualNumbers: prev.manualNumbers.filter((n) => n.id !== numberId),
        }));
    }

    public setGenerateType(value: GenerateType | null) {
        this.setState((prev: MainFormState) => ({
            ...prev,
            generateType: value,
        }));
    }

    public setDiapason(value: { from: string; to: string }) {
        this.setState((prev: MainFormState) => ({
            ...prev,
            diapason: value,
        }));
    }

    public setArraySize(value: string) {
        this.setState((prev: MainFormState) => ({
            ...prev,
            arraySize: value,
        }));
    }

    public setManualNumberInput(value: string) {
        this.setState((prev: MainFormState) => ({
            ...prev,
            manualNumberInput: value,
        }));
    }

    public setSortDirection(value: SortDirection | null) {
        this.setState((prev: MainFormState) => ({
            ...prev,
            sortDirection: SortDirectionDefinition.getById(value),
        }));
    }

    public setSortType(value: SortType | null) {
        const definition = SortTypes.getById(value);
        this.setState((prev: MainFormState) => ({
            ...prev,
            sortType: definition,
            complexity: definition ? definition.complexity : "",
        }));
    }
}
