import { FormField } from "@/models/form-field.model";
import { useEffect, useRef, useState } from "react";
import { Error } from "@/components/Error";
import { NavButton } from "@/components/NavButton";
import { SelectField } from "@/components/SelectField";
import { formOptionsMapping } from "@/data/form-inputs";
import { Option } from "@/models/option.model";
import { MultiSelectField } from "./MultiSelectField";
import { TextInput } from "./TextInput";
import { TextInputRef } from "@/models/text-input-ref.model";

type Props = FormField & {
  scrollToNextWindow: (index: number) => void;
  curWindowIndex: number;
  allowScroll: (scroll: boolean) => void;
  updateForm: (
    change: { label: string; value: string | string[] },
    index: number
  ) => void;
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
  updateForm,
}: Props) => {
  const [error, setError] = useState<string | null>();
  const [showError, setShowError] = useState<boolean>(true);

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

  const handleInputError = (errorMessage: string | null) => {
    console.log("ERROR", errorMessage);
    setError(errorMessage);
  };

  const handleInputChange = (change: {
    label: string;
    value: string | string[];
  }) => {
    setShowError(false);
    updateForm(change, curWindowIndex - 1);
  };

  const onCtaClicked = () => {
    const newError = inputRef?.current?.checkError();
    setError(newError);
    // console.log("ERROR IS", newError);
    // if (error) {
    //   setShowError(true);
    // } else {
    //   scrollToNextWindow(curWindowIndex);
    // }
  };

  useEffect(() => {
    allowScroll(!error);
  }, [error]);

  const inputRef = useRef<TextInputRef>(null);

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
          <TextInput
            ref={inputRef}
            title={title}
            type={subtype || type}
            handleChange={handleInputChange}
            // handleError={handleInputError}
          ></TextInput>
        )}

        {type === "select" && options?.length && (
          <SelectField fieldName={title} options={options}></SelectField>
        )}

        {/* Replace type to be of MULTI_SELECT */}
        {type === "dependent_select" && options?.length && (
          <MultiSelectField
            options={options}
            numSelections={numSelections}
          ></MultiSelectField>
        )}

        {showError && error && <Error error={error} />}

        {/* {!showError && ( */}
        <NavButton
          onCtaClicked={onCtaClicked}
          buttonType={buttonType}
          inputType={type}
        />
        {/* )} */}
      </div>
    </div>
  );
};
