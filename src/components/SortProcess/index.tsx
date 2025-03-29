import { SortProcessProps } from "./SortProcess.props";

export const SortProcess = ({ isOpened, onCloseClick }: SortProcessProps) => {
    return (
        <>
            {isOpened && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="bg-black bg-opacity-50 z-50 w-full h-full"
                        onClick={onCloseClick}
                    ></div>
                    <div className="bg-white max-w-md mx-auto">
                        <div>Sort Process</div>
                    </div>
                </div>
            )}
        </>
    );
};
