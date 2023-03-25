import { useState } from "react";
import { FormControl, FormLabel } from "@mui/material";
import { SelectOption } from "./SelectOption";

type Props = {
  options: string[];
};

export const SelectField = ({ options }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    // setSubmitted(true);
  };

  //Create object with a letter as id and label
  const optionWithIds = options.map((option, index) => ({
    label: option,
    id: String.fromCharCode(65 + index),
  }));

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Label</FormLabel>
        <div>
          {optionWithIds.map((optionWithId) => (
            <SelectOption
              key={optionWithId.id}
              id={optionWithId.id}
              label={optionWithId.label}
              selected={optionWithId.label === selectedOption}
              onOptionClicked={handleOptionClick}
            />
          ))}
        </div>
      </FormControl>
      {/* <div>{submitted && <p>You selected {selectedOption}.</p>}</div> */}
    </>
  );
};
