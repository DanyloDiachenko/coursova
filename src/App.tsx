import { HelloMessage } from "./components/HelloMessage";
import { Divider } from "./components/Divider";
import { MainForm } from "./components/MainForm";
import { SortingResult } from "./components/SortingResult";

const App = () => {
    return (
        <div>
            <HelloMessage />
            <Divider />
            <MainForm />
            <Divider />
            <SortingResult />
        </div>
    );
};

export default App;
