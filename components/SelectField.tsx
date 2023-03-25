//@ts-nocheck
import { useState } from "react";
import { FormControl, FormLabel } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { SelectOption } from "./SelectOption";

export const SelectField = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option.target.value);
    setSubmitted(true);
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Which of the following is correct?
        </FormLabel>
        {options.map((option, index) => (
          <SelectOption key={index} label={option} selected={false} />
        ))}
      </FormControl>
      <div>{submitted && <p>You selected {selectedOption}.</p>}</div>
    </>
  );
};
