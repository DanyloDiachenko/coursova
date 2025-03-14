export interface AddedNumbersProps {
    manualNumbers: { value: number; id: number }[];
    onRemoveManualNumber: (number: number) => void;
}
