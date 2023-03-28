import TextField from "@mui/material/TextField";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

type Props = {
  title: string;
  type: string;
  mandatory: boolean;
  handleChange: (change: { label: string; value: string | string[] }) => void;
};

export const MobileNumberField = forwardRef<
  {
    checkError: () => string;
  },
  Props
>(({ title, type, mandatory, handleChange }: Props, ref) => {
  const [value, setValue] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const OnValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value;
    setValue(updatedValue);

    handleChange({
      label: event.target.name,
      value: updatedValue,
    });
  };

  useImperativeHandle(ref, () => ({
    checkError: () => {
      const regex = new RegExp(/^[1-9]\d{6,14}$/);
      const isValid = regex.test(value || "");
      if (!isValid) {
        if (!value || value?.trim().length === 0) {
          return "Please fill this in";
        } else {
          return `Hmm... that phone number doesn't look right`;
        }
      }
      return "";
    },
  }));

  return (
    <TextField
      inputRef={inputRef}
      name={title}
      required={mandatory}
      fullWidth
      placeholder="08123456789"
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
