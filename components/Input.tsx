import TextField from "@mui/material/TextField";
import { FormField } from "@/models/form-field.model";
import { useEffect, useState } from "react";
import { Error } from "@/components/Error";
import { NavButton } from "@/components/NavButton";
import { SelectField } from "@/components/SelectField";
import { formOptionsMapping } from "@/data/form-inputs";
import { Option } from "@/models/option.model";
import { MultiSelectField } from "./MultiSelectField";

type Props = FormField & {
  scrollToNextWindow: (index: number) => void;
  curWindowIndex: number;
  allowScroll: (scroll: boolean) => void;
};

export const Input = ({
  title,
  subtitle,
  type,
  subtype,
  mandatory,
  numSelections,
  buttonType,
  optionIds,
  dependentOptionIds,
  scrollToNextWindow,
  curWindowIndex,
  allowScroll,
}: Props) => {
  const [value, setValue] = useState<string>();
  const [error, setError] = useState<string | null>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    handleBlur();
  };

  let options: Option[] = [];
  if (type === "select" && optionIds?.length) {
    options = optionIds.map((optionId) => ({
      id: optionId,
      label: formOptionsMapping[optionId],
    }));
  }

  // Handle Dependent field select options here
  if (type === "dependent_select" && dependentOptionIds) {
    //TODO: Removing the hardcoding of field id 102
    options = dependentOptionIds[102].map((optionId) => ({
      id: optionId,
      label: formOptionsMapping[optionId],
    }));
  }

  const handleBlur = () => {
    if (!value || value.trim().length === 0) {
      setError("Please fill this in");
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    allowScroll(!error);
  }, [error]);

  const onCtaClicked = () => scrollToNextWindow(curWindowIndex);

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
        {type === "text" && (
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
        )}

        {type === "select" && options?.length && (
          <SelectField options={options}></SelectField>
        )}

        {/* Replace type to be of MULTI_SELECT */}
        {type === "dependent_select" && options?.length && (
          <MultiSelectField
            options={options}
            numSelections={numSelections}
          ></MultiSelectField>
        )}

        {error && <Error error={error} />}
        {!error && (
          <NavButton
            onCtaClicked={onCtaClicked}
            buttonType={buttonType}
            inputType={type}
          />
        )}
      </div>
    </div>
  );
};
