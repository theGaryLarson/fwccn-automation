import {useEffect, useRef} from "react";

export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export function toTitleCase(str) {
    try {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    } catch (e) {
        return str
    }

}

export function ordinalNumber(value) {
    try {
        return ordinals[value]
    } catch (e) {
        return value;
    }

}

const ordinals = {
    0: "First",
    1: "Second",
    2: "Third",
    3: "Fourth",
    4: "Fifth",
    5: "Sixth",
    6: "Seventh",
    7: "Eighth",
    8: "Ninth",
    9: "Tenth",
    10: "Eleventh",
    11: "Twelfth",
    12: "Thirteenth",
    13: "Fourteenth",
    14: "Fifteenth",
    15: "Sixteenth",
    16: "Seventeenth",
    17: "Eighteenth",
    18: "Nineteenth",
    19: "Twentieth",
    20: "Twenty-first",
    21: "Twenty-second",
    22: "Twenty-third",
    23: "Twenty-fourth",
    24: "Twenty-fifth",
    25: "Twenty-sixth",
    26: "Twenty-seventh",
    27: "Twenty-eighth",
    28: "Twenty-ninth",
    29: "Thirtieth",
    30: "Thirty-first",
    31: "Thirty-second",
    32: "Thirty-third",
    33: "Thirty-fourth",
    34: "Thirty-fifth",
    35: "Thirty-sixth",
    36: "Thirty-seventh",
    37: "Thirty-eighth",
    38: "Thirty-ninth",
    39: "Fortieth",
    40: "Forty-first",
    41: "Forty-second",
    42: "Forty-third",
    43: "Forty-fourth",
    44: "Forty-fifth",
    45: "Forty-sixth",
    46: "Forty-seventh",
    47: "Forty-eighth",
    48: "Forty-ninth",
    49: "Fiftieth"
};
