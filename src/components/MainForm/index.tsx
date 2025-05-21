import { GenerateType as GenerateTypeComponent } from "../InputType";
import { Diapason } from "../Diapason";
import { InputArraySize } from "../ArraySize";
import { AddNumber } from "../AddNumber";
import { AddedNumbers } from "../AddedNumbers";
import { SortDirection as SortDirectionComponent } from "../SortDirection";
import { SortType as SortTypeComponent } from "../SortType";
import { Button } from "../Button";
import { MainFormProps } from "./MainForm.props";
import { MainFormService } from "./MainFormService";
import { SortTypes } from "../../constants/sortingTypes";
import { SortDirectionDefinition } from "../../constants/sortDirection";

export const MainForm = ({ state, setState, onGenerate }: MainFormProps) => {
    const mainFormService = new MainFormService(state, setState);

    return (
        <div className="m-3 sm:m-6">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (onGenerate) {
                        onGenerate(e);
                    }
                }}
                className="bg-white border-2 border-gray-200 rounded-lg p-3 sm:p-5 inline-block"
            >
                <GenerateTypeComponent
                    generateType={mainFormService.generateType}
                    setGenerateType={mainFormService.setGenerateType.bind(
                        mainFormService,
                    )}
                />
                {mainFormService.generateType && (
                    <>
                        {mainFormService.generateType === "auto" ? (
                            <>
                                <Diapason
                                    diapason={mainFormService.diapason}
                                    setDiapason={mainFormService.setDiapason.bind(
                                        mainFormService,
                                    )}
                                />
                                <InputArraySize
                                    arraySize={mainFormService.arraySize}
                                    setArraySize={mainFormService.setArraySize.bind(
                                        mainFormService,
                                    )}
                                />
                            </>
                        ) : (
                            <div className="mt-4">
                                <h2>Введіть число</h2>
                                <AddNumber
                                    manualNumberInput={
                                        mainFormService.manualNumberInput
                                    }
                                    setManualNumberInput={mainFormService.setManualNumberInput.bind(
                                        mainFormService,
                                    )}
                                    onAddManualNumber={mainFormService.addManualNumber.bind(
                                        mainFormService,
                                    )}
                                />
                                <AddedNumbers
                                    manualNumbers={[
                                        ...mainFormService.manualNumbers,
                                    ]}
                                    onRemoveManualNumber={mainFormService.removeManualNumber.bind(
                                        mainFormService,
                                    )}
                                />
                            </div>
                        )}
                        <SortDirectionComponent
                            sortDirection={
                                mainFormService.sortDirection?.id || null
                            }
                            setSortDirection={mainFormService.setSortDirection.bind(
                                mainFormService,
                            )}
                            options={SortDirectionDefinition.all.map((sd) => ({
                                value: sd.id,
                                label: sd.displayName,
                            }))}
                        />
                        <SortTypeComponent
                            sortType={mainFormService.sortType?.id || null}
                            setSortType={mainFormService.setSortType.bind(
                                mainFormService,
                            )}
                            options={SortTypes.all().map((st) => ({
                                value: st.id,
                                label: st.displayName,
                            }))}
                        />
                    </>
                )}
                {mainFormService.generateType && (
                    <Button className="mt-6" type="submit">
                        Відсортувати
                    </Button>
                )}
            </form>
        </div>
    );
};
