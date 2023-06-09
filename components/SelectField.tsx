import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from "react";
import { FormControl, FormLabel } from "@mui/material";
import { Option } from "@/models/option.model";
import SelectOption from "@/components/SelectOption";

type Props = {
  options: Option[];
  fieldName: string;
  mandatory: boolean;
  handleChange: (change: { label: string; value: string | string[] }) => void;
};

const SelectField: ForwardRefRenderFunction<
  {
    checkError: () => string;
  },
  Props
> = ({ options, fieldName, handleChange, mandatory }: Props, ref) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    handleChange({
      label: fieldName,
      value: option,
    });
  };

  useImperativeHandle(ref, () => ({
    checkError: () => {
      if (!selectedOption && mandatory) {
        return "Oops! Please make a selection";
      }
      return "";
    },
  }));

  //Create object with a letter as id and label
  const optionWithCharIds = options.map((option, index) => ({
    label: option.label,
    charId: String.fromCharCode(65 + index),
  }));

  return (
    <>
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
    </>
  );
};

export default forwardRef(SelectField);
