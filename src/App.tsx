import { FormEvent, useState } from "react";
import { HelloMessage } from "./components/HelloMessage";
import { Divider } from "./components/Divider";
import { MainForm } from "./components/MainForm";
import { SortResult } from "./components/SortResult";
import { Spinner } from "./components/Spinner";
import { SortProcess } from "./components/SortProcess";
import { MainFormState } from "./constants/mainFormState.interface";
import { AppService } from "./AppService";

const initialMainFormState: MainFormState = {
    generateType: null,
    diapason: { from: "", to: "" },
    arraySize: "",
    sortType: null,
    sortDirection: null,
    manualNumbers: [],
    manualNumberInput: "",
    isSorting: false,
    sortingTime: 0,
    sortedArray: [],
    arrayToSort: [],
    steps: [],
    complexity: "",
    sortSessionId: Date.now().toString(),
};

const App = () => {
    const [mainFormState, setMainFormState] =
        useState<MainFormState>(initialMainFormState);

    const appService = new AppService(mainFormState, setMainFormState);

    const onMainFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        appService.handleSortRequest();
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <HelloMessage />
            <Divider />
            <MainForm
                state={appService.currentState}
                setState={appService.updateMainFormState.bind(appService)}
                onGenerate={onMainFormSubmit}
            />
            <Divider />
            {appService.currentState.isSorting && <Spinner />}
            {appService.currentState.steps.length > 0 &&
                appService.currentState.arrayToSort.length > 0 &&
                appService.currentState.arrayToSort.length <= 20 && (
                    <SortProcess
                        isOpened={appService.currentState.steps.length > 0}
                        onCloseClick={() => {
                            appService.updateMainFormState((prev) => ({
                                ...prev,
                                steps: [],
                            }));
                        }}
                        steps={appService.currentState.steps}
                        key={appService.currentState.sortSessionId}
                    />
                )}
            {appService.currentState.sortedArray.length > 0 &&
                !appService.currentState.isSorting && (
                    <SortResult
                        arrayToSort={appService.currentState.arrayToSort}
                        sortedArray={appService.currentState.sortedArray}
                        sortingTime={appService.currentState.sortingTime}
                        complexity={appService.currentState.complexity}
                    />
                )}
        </div>
    );
};

export default App;
