import TextField from "@mui/material/TextField";
import { useState, forwardRef, useImperativeHandle } from "react";

type Props = {
  title: string;
  type: string;
  handleChange: (change: { label: string; value: string | string[] }) => void;
};

export const TextInput = forwardRef<
  {
    checkError: () => string;
  },
  Props
>(({ title, type, handleChange }: Props, ref) => {
  const [value, setValue] = useState<string>();

  useImperativeHandle(ref, () => ({
    checkError: () => {
      if (!value || value.trim().length === 0) {
        return "Please fill this in";
      }
      return "";
    },
  }));

  const OnValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value;
    setValue(updatedValue);

    handleChange({
      label: event.target.name,
      value: updatedValue,
    });
  };

  return (
    <TextField
      inputRef={ref}
      name={title}
      required
      fullWidth
      id="standard-required"
      placeholder="Type your answer here"
      variant="standard"
      color="info"
      type={type}
      className="mt-8 border-b border-slate-600 border-solid focus:border-b-2 focus:border-white "
      inputProps={{
        className: "text-3xl text-white placeholder:font-thin",
      }}
      onChange={OnValueChanged}
    />
  );
});
