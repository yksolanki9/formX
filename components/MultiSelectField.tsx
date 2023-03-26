import { useState } from "react";
import { FormControl, FormLabel } from "@mui/material";
import { Option } from "@/models/option.model";
import { SelectOption } from "./SelectOption";

type Props = {
  options: Option[];
  numSelections?: number;
};

export const MultiSelectField = ({ options, numSelections = 1 }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const remainingSelections = numSelections - selectedOptions.length;
  // const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (option: string) => {
    if (selectedOptions?.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option)
      );
    } else if (selectedOptions?.length < numSelections) {
      setSelectedOptions([...selectedOptions, option]);
    }
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
          <div
            className={`text-sm ${
              remainingSelections > 0 ? "visible" : "invisible"
            }`}
          >
            Choose {remainingSelections}
            {numSelections > remainingSelections ? " more" : ""}
          </div>
          <div className="mt-1">
            {optionWithCharIds.map(({ charId, label }) => (
              <SelectOption
                key={charId}
                id={charId}
                label={label}
                selected={selectedOptions.includes(label)}
                onOptionSelected={handleOptionClick}
              />
            ))}
          </div>
        </div>
      </FormControl>
      {/* <div>{submitted && <p>You selected {selectedOption}.</p>}</div> */}
    </>
  );
};
