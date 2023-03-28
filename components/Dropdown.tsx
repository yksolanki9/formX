import Autocomplete from "@mui/material/Autocomplete";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Option } from "@/models/option.model";
import { SelectOption } from "./SelectOption";

type Props = {
  options: Option[];
  fieldName: string;
  mandatory: boolean;
  handleChange?: (change: { label: string; value: string | string[] }) => void;
};

export const Dropdown = ({ options, fieldName, mandatory }: Props) => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = useState(true);
  const closePopper = () => setOpen(true);
  const openPopper = () => setOpen(true);
  return (
    <>
      {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}> */}
      {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
      <Autocomplete
        options={options}
        open={open}
        onOpen={openPopper}
        onClose={closePopper}
        id="auto-complete"
        autoComplete
        disableCloseOnSelect
        clearOnBlur={false}
        placeholder="Type or select an option"
        renderInput={(params) => (
          <TextField
            {...params}
            // label="autoComplete"
            fullWidth
            // placeholder="Type or select an option"
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
          <SelectOption
            showId={false}
            label={option.label}
            selected={false}
            onOptionSelected={() => {}}
          />
        )}
      />
      {/* <Select
        variant="standard"
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={age}
        onChange={handleChange}
        label="Age"
        color="info"
        displayEmpty
        renderValue={age !== "" ? undefined : () => "placeholder text"}
        placeholder="Type or select an option"
        className="mt-8 w-full border-b border-b-slate-600 border-solid focus:border-b-2 focus:border-white "
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select> */}
      {/* </FormControl> */}
    </>
  );
};
