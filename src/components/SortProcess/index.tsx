import { Button } from "../Button";
import { SortProcessProps } from "./SortProcess.props";

export const SortProcess = ({ isOpened, onCloseClick }: SortProcessProps) => {
    return true ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-6 shadow-xl w-[400px] relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Анімація сортування
                    </h2>
                    <button
                        onClick={onCloseClick}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        x
                    </button>
                </div>
                <div className="h-40 flex items-center justify-center border border-dashed rounded-lg">
                    <p className="text-gray-400">Тут будет анимация</p>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button onClick={onCloseClick}>Пропустити</Button>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};
