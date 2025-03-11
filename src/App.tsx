import { useState } from "react";
import { HelloMessage } from "./components/HelloMessage";
import { Divider } from "./components/Divider";
import { MainForm } from "./components/MainForm";
import { SortingResult } from "./components/SortingResult";
import { MainFormState } from "./constants";

const initialState: MainFormState = {
    generateType: null,
    diapason: { from: "", to: "" },
    arraySize: "",
    sortType: null,
    sortDirection: null,
    manualNumbers: [],
    manualNumberInput: "",
};

const App = () => {
    const [state, setState] = useState<MainFormState>(initialState);

    return (
        <div>
            <HelloMessage />
            <Divider />
            <MainForm state={state} setState={setState} />
            <Divider />
            <SortingResult />
        </div>
    );
};

export default App;
