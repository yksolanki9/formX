import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Option } from "@/models/option.model";
import { SelectOption } from "./SelectOption";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  options: Option[];
  fieldName: string;
  mandatory: boolean;
  handleChange: (change: { label: string; value: string | string[] }) => void;
};

export const Dropdown = ({
  options,
  fieldName,
  mandatory,
  handleChange,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    handleChange({
      label: fieldName,
      value: option,
    });
  };

  const [open, setOpen] = useState(true);
  const closePopper = () => setOpen(true);
  const openPopper = () => setOpen(true);
  return (
    <>
      <Autocomplete
        // value={selectedOption}
        options={options}
        // open={open}
        // onOpen={openPopper}
        // onClose={closePopper}
        // id="auto-complete"
        // autoComplete
        // disableCloseOnSelect
        // onChange={handleChange}
        getOptionLabel={(option) => option.label}
        clearOnBlur={false}
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
              className: "text-3xl text-white placeholder:font-thin",
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <SelectOption
              {...props}
              showId={false}
              label={option.label}
              selected={option.label === selectedOption}
              onOptionSelected={handleOptionClick}
            />
          </li>
        )}
      />
    </>
  );
};
