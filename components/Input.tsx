import TextField from "@mui/material/TextField";
import { FormField } from "@/models/form-field.model";
import { useState } from "react";
import { Error } from "@/components/Error";
import { NavButton } from "@/components/NavButton";

export const Input = ({
  title,
  subtitle,
  type,
  subtype,
  mandatory,
  numSelections,
  buttonType,
}: FormField) => {
  const [value, setValue] = useState<string>();
  const [error, setError] = useState<string | null>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    handleBlur();
  };

  const handleBlur = () => {
    if (!value || value.trim().length === 0) {
      setError("Please fill this in");
    } else {
      setError(null);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center snap-start snap-always max-w-3xl mx-auto">
      <div>
        {/*TODO: Add a number to the left of the title */}
        {/* <div>
          <div>
          <span>1</span>
          <ArrowForwardIcon />
          </div>
        </div> */}
        <div className="text-2xl">
          {title} {mandatory && <span>*</span>}
        </div>
        <div className="text-xl opacity-70 mt-2">{subtitle}</div>
        <TextField
          required
          fullWidth
          id="standard-required"
          placeholder="Type your answer here"
          variant="standard"
          color="info"
          type={subtype || type}
          className="mt-8 border-b border-slate-600 border-solid focus:border-b-2 focus:border-white "
          inputProps={{
            className: "text-3xl text-white placeholder:font-thin",
          }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {error && <Error error={error} />}
        {!error && <NavButton buttonType={buttonType} inputType={type} />}
      </div>
    </div>
  );
};
