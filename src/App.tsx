import { useState } from "react";
import { Select } from "./components/Select";
import { HelloMessage } from "./components/HelloMessage";
import { Divider } from "./components/Divider";
import { MainForm } from "./components/MainForm";

const arrayLengthOptions = [
    {
        title: "10 видимих чисел",
        value: "10",
    },
    {
        title: "20 видимих чисел",
        value: "20",
    },
    {
        title: "50 видимих чисел",
        value: "50",
    },
    {
        title: "100 видимих чисел",
        value: "100",
    },
    {
        title: "200 видимих чисел",
        value: "200",
    },
    {
        title: "500 видимих чисел",
        value: "500",
    },
    {
        title: "1000 видимих чисел",
        value: "1000",
    },
];

const App = () => {
    const [arrayLength, setArrayLength] = useState(arrayLengthOptions[0]);

    return (
        <div>
            <HelloMessage />
            <Divider />
            <MainForm />
            <Divider />
            <div className="m-6">
                <h2>Результат сортування</h2>
                <Select
                    className="mt-2"
                    options={arrayLengthOptions}
                    activeOption={arrayLength}
                    onChange={(option) => setArrayLength(option)}
                />
                <div className="mt-6">
                    <table></table>
                </div>
            </div>
        </div>
    );
};

export default App;
