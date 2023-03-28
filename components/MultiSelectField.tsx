import { forwardRef, useImperativeHandle, useState } from "react";
import { FormControl, FormLabel } from "@mui/material";
import { Option } from "@/models/option.model";
import { SelectOption } from "./SelectOption";

type Props = {
  fieldName: string;
  options: Option[];
  handleChange: (change: { label: string; value: string | string[] }) => void;
  numSelections?: number;
  mandatory: boolean;
};

export const MultiSelectField = forwardRef<
  {
    checkError: () => string;
  },
  Props
>(
  (
    { fieldName, handleChange, options, mandatory, numSelections = 1 }: Props,
    ref
  ) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const remainingSelections = numSelections - selectedOptions.length;

    const handleOptionClick = (option: string) => {
      let updatedSelection: string[] = selectedOptions;
      if (selectedOptions?.includes(option)) {
        updatedSelection = selectedOptions.filter(
          (selectedOption) => selectedOption !== option
        );
      } else if (selectedOptions?.length < numSelections) {
        updatedSelection = [...selectedOptions, option];
      }
      setSelectedOptions(updatedSelection);
      handleChange({
        label: fieldName,
        value: updatedSelection,
      });
    };

    useImperativeHandle(ref, () => ({
      checkError: () => {
        if (mandatory && remainingSelections === numSelections) {
          return "Oops! Please make a selection";
        } else if (mandatory && remainingSelections > 0) {
          return "Please select more choices";
        } else {
          return "";
        }
      },
    }));

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
      </>
    );
  }
);
