import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { SortProcessProps } from "./SortProcess.props";
import { useState, useEffect } from "react";

export const SortProcess = ({
    isOpened,
    onCloseClick,
    steps,
}: SortProcessProps) => {
    const [currentStep, setCurrentStep] = useState(0);

    const visibleSteps = steps ? steps.map((step) => step.slice(0, 20)) : [];

    useEffect(() => {
        if (isOpened && visibleSteps.length > 0) {
            const interval = setInterval(() => {
                setCurrentStep((prev) => {
                    if (prev < visibleSteps.length - 1) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        return prev;
                    }
                });
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isOpened, visibleSteps]);

    const getBarHeight = (value: number, min: number, max: number) => {
        const range = max - min;
        if (range === 0) return 100;
        const height = ((value - min) / range) * 100 + 20;
        return height;
    };

    const allValues = visibleSteps.flat();
    const minValue = allValues.length > 0 ? Math.min(...allValues) : 0;
    const maxValue = allValues.length > 0 ? Math.max(...allValues) : 0;

    const initialStep = visibleSteps[0] || [];
    const barKeys = initialStep.map((num, index) => `${num}-${index}`);

    return isOpened ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-[800px] w-full relative">
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
                <div className="flex items-end justify-center border border-dashed rounded-lg overflow-h-auto min-h-64">
                    <div className="flex gap-1 items-end">
                        <AnimatePresence>
                            {visibleSteps[currentStep]?.map((num, index) => {
                                const initialIndex = initialStep.indexOf(num);
                                const key =
                                    initialIndex !== -1
                                        ? barKeys[initialIndex]
                                        : `${num}-${index}`;
                                return (
                                    <motion.div
                                        key={key}
                                        layout
                                        className="bg-blue-500 rounded-t text-sm text-white flex items-end justify-center"
                                        style={{
                                            width: "35px",
                                            height: `${getBarHeight(
                                                num,
                                                minValue,
                                                maxValue,
                                            )}px`,
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {num}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button onClick={onCloseClick}>Пропустити</Button>
                </div>
            </div>
        </div>
    ) : null;
};
