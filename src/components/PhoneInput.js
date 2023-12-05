import React, { useState } from "react";
import {NumberFormatBase} from "react-number-format";

export default function PhoneInput(props) {

    const { inputRef, onChange, ...other } = props;
    const [mask, setMask] = useState("(###) ###-####")

    const setCorrectMask = inputValue => {
        if(inputValue.match(/^(55|81|33)/)) {
            setMask("(##) ####-####")
        } else {
            setMask("(###) ###-####")
        }
    }

    return (
        <NumberFormatBase
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
            onChange({
            target: {
                name: props.name,
                value: values.value
            }
            }, setCorrectMask(values.value))
        }}
        isNumericString
      /*   format={mask} */
        />
    );
}