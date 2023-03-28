import TextField from "@mui/material/TextField";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";

type Props = {
  title: string;
  type: string;
  mandatory: boolean;
  handleChange: (change: { label: string; value: string | string[] }) => void;
};

export const TextInput = forwardRef<
  {
    checkError: () => string;
  },
  Props
>(({ title, type, handleChange, mandatory }: Props, ref) => {
  const [value, setValue] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    checkError: () => {
      const isValid = inputRef?.current?.validity.valid;
      if (!isValid) {
        if (!value || value?.trim().length === 0) {
          return "Please fill this in";
        } else {
          return `Hmm... that ${type} doesn't look right`;
        }
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
      inputRef={inputRef}
      name={title}
      required={mandatory}
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
