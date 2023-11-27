import React, { useState} from "react";
import styles from "./applicant_form/ApplicantForm.module.css";

export default function IncomeSourcesComponent({ formData, onComponentInputChange }) {
    const [incomeSources, setIncomeSources] = useState(formData?.houseHoldIncome?.incomeSources ?? []);
    const handleIncomeSourceChange = (event, index) => {
        const updatedIncomeSources = [...incomeSources];
        updatedIncomeSources[index].name = event.target.value;
        setIncomeSources(updatedIncomeSources);
        onComponentInputChange({
            target: {
                name: "houseHoldIncome",
                value: {
                    ...formData.houseHoldIncome,
                    incomeSources: updatedIncomeSources,
                },
            },
        });
    };

    const handleIncomeAmountChange = (event, index) => {
        const updatedIncomeSources = [...incomeSources];
        updatedIncomeSources[index].peopleCount = Number(event.target.value);
        setIncomeSources(updatedIncomeSources);
        onComponentInputChange({
            target: {
                name: "houseHoldIncome",
                value: {
                    ...formData.houseHoldIncome,
                    incomeSources: updatedIncomeSources,
                },
            },
        });
    };

    const addIncomeSource = () => {
        const newIncomeSource = {
            name: "",
            peopleCount: 0
        };
        const updatedIncomeSources = [...incomeSources, newIncomeSource];
        setIncomeSources(updatedIncomeSources);
        onComponentInputChange({
            target: {
                name: "houseHoldIncome",
                value: {
                    ...formData.houseHoldIncome,
                    incomeSources: updatedIncomeSources,
                },
            },
        });
    };

    const removeIncomeSource = (index) => {
        const updatedIncomeSources = [...incomeSources];
        updatedIncomeSources.splice(index, 1);
        setIncomeSources(updatedIncomeSources);
        onComponentInputChange({
            target: {
                name: "houseHoldIncome",
                value: {
                    ...formData.houseHoldIncome,
                    incomeSources: updatedIncomeSources,
                },
            },
        });
    };

    return (
        <div>
            <h1 className=" mt-4">Income Sources</h1>
            <p className='mb-4 text-center'> Enter the total monthly income received by all household members.</p>
            {incomeSources.map((incomeSource, index) => (
                <div key={index} className="flex">
                    <input
                        type="text"
                        value={incomeSource.name}
                        onChange={(event) => handleIncomeSourceChange(event, index)}
                        placeholder="Enter income source"
                        className="mr-2 mb-2 pl-1"
                    />
                    <input
                        type="number"
                        value={incomeSource.peopleCount}
                        onChange={(event) => handleIncomeAmountChange(event, index)}
                        placeholder="Enter Number People"
                        className="mr-2 mb-2 pl-1"
                    />
                    <button type="button" className={`${styles.removeButton} mb-2`} onClick={() => removeIncomeSource(index)}>Remove</button>
                </div>
            ))}
            <button type="button" className={`${styles.addButton} mt-4`} onClick={addIncomeSource}>Add Income Source</button>
        </div>
    );
};
