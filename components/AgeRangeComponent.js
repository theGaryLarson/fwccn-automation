import React from 'react';

function AgeComponent({ formData, genderRange, handleInputChange }) {
    const ageRanges = [
        { label: '0-5', key: 'zeroToFive' },
        { label: '6-12', key: 'sixToTwelve' },
        { label: '13-17', key: 'thirteenToSeventeen' },
        { label: '18-24', key: 'eighteenToTwentyFour' },
        { label: '25-34', key: 'twentyFiveToThirtyFour' },
        { label: '35-54', key: 'thirtyFiveToFiftyFour' },
        { label: '55-74', key: 'fiftyFiveToSeventyFour' },
        { label: '75-84', key: 'seventyFiveToEightyFour' },
        { label: '85+', key: 'eightyFivePlus' },
    ];

    const onHandleInputChange = (event) => {
        const newEvent = {
            target: {
                name: genderRange, // This should directly refer to either "maleAgeRange" or "femaleAgeRange"
                value: {
                    ...formData[genderRange], // Access the correct gender range directly from formData
                    [event.target.name]: event.target.value, // Update the specific age range
                },
            },
        };
        handleInputChange(newEvent);
    };

    return (
        <div className=" ">
            {ageRanges.map((range) => (
                <div key={range.key} className="flex w-full">
                    <label className={'w-12 font-bold'} htmlFor={`${genderRange}${range.key}`}>{range.label}</label>
                    <input
                        type="number"
                        id={`${genderRange}-${range.key}`}
                        name={range.key}
                        value={formData[genderRange]?.[range.key] ?? 0}
                        onChange={onHandleInputChange}
                        className={'pl-1 mb-1'}
                    />
                </div>
            ))}
        </div>
    );
}

export default AgeComponent;
