import { Input } from "../Input";
import { DiapasonProps } from "./Diapason.props";

export const Diapason = ({ diapason, setDiapason }: DiapasonProps) => {
    return (
        <label className="mt-4 block">
            <h2>Введіть діапазон можливих значень</h2>
            <div className="flex gap-4 mt-2">
                <Input
                    placeholder="Від..."
                    value={diapason?.from}
                    onChange={(e) =>
                        setDiapason({
                            ...diapason,
                            from: e.target.value,
                        })
                    }
                />
                <Input
                    placeholder="До..."
                    value={diapason?.to}
                    onChange={(e) =>
                        setDiapason({
                            ...diapason,
                            to: e.target.value,
                        })
                    }
                />
            </div>
        </label>
    );
};
