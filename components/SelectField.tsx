import { useState } from "react";
import { FormControl, FormLabel } from "@mui/material";
import { Option } from "@/models/option.model";
import { SelectOption } from "./SelectOption";

type Props = {
  options: Option[];
};

export const SelectField = ({ options }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    // setSubmitted(true);
  };

  //Create object with a letter as id and label
  const optionWithCharIds = options.map((option, index) => ({
    label: option.label,
    charId: String.fromCharCode(65 + index),
  }));

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Label</FormLabel>
        <div>
          {optionWithCharIds.map(({ charId, label }) => (
            <SelectOption
              key={charId}
              id={charId}
              label={label}
              selected={label === selectedOption}
              onOptionSelected={handleOptionClick}
            />
          ))}
        </div>
      </FormControl>
      {/* <div>{submitted && <p>You selected {selectedOption}.</p>}</div> */}
    </>
  );
};
