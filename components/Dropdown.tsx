import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Option } from "@/models/option.model";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import { DropdownOption } from "./DropdownOption";

type Props = {
  options: Option[];
  fieldName: string;
  mandatory: boolean;
  handleChange: (change: { label: string; value: string | string[] }) => void;
};

export const Dropdown = forwardRef<
  {
    checkError: () => string;
  },
  Props
>(({ options, fieldName, mandatory, handleChange }: Props, ref) => {
  const [selectedOption, setSelectedOption] = useState<string>();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    handleChange({
      label: fieldName,
      value: option || "",
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

  return (
    <>
      <Autocomplete
        options={options}
        onChange={(_, value: Option | null) =>
          handleOptionClick(value?.label || "")
        }
        getOptionLabel={(option) => option.label}
        popupIcon={<ExpandMoreIcon color="info" />}
        clearIcon={<ClearIcon color="info" />}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            placeholder="Type or select an option"
            variant="standard"
            color="info"
            className="mt-8 border-b border-slate-600 border-solid focus:border-b-2 focus:border-white "
            inputProps={{
              ...params.inputProps,
              className: "sm:text-3xl text-xl text-white placeholder:font-thin",
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <DropdownOption
              {...props}
              label={option.label}
              selected={option.label === selectedOption}
            />
          </li>
        )}
      />
    </>
  );
});
