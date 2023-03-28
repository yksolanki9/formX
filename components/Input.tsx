import { FormField } from "@/models/form-field.model";
import { useEffect, useRef, useState } from "react";
import { Error } from "@/components/Error";
import { NavButton } from "@/components/NavButton";
import { SelectField } from "@/components/SelectField";
import { formOptionsMapping } from "@/data/form-options-mapping";
import { Option } from "@/models/option.model";
import { MultiSelectField } from "./MultiSelectField";
import { TextInput } from "./TextInput";
import { TextInputRef } from "@/models/text-input-ref.model";
import { Form } from "@/models/form.model";
import { Dropdown } from "./Dropdown";

type Props = FormField & {
  scrollToNextWindow: (index: number) => void;
  curWindowIndex: number;
  allowScroll: (scroll: boolean) => void;
  updateForm: (
    change: { label: string; value: string | string[] },
    index: number
  ) => void;
  form: Form;
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
  form,
  parentFieldId,
  id: fieldId,
}: Props) => {
  const [error, setError] = useState<string | null>();
  const [options, setOptions] = useState<Option[]>([]);

  //Replace {FORMX-<questionId>} with the value of the question
  const question = title.replace(
    /\{FORMX-([^}]+?)\}/g,
    (match: string, questionId: string) => {
      return (form[parseInt(questionId)]?.value as string) || "";
    }
  );

  if ((type === "select" || type === "dropdown") && optionIds?.length) {
    const optionsForSelectField = optionIds.map((optionId) => ({
      id: optionId,
      label: formOptionsMapping[optionId],
    }));
    useEffect(() => setOptions(optionsForSelectField), []);
  }

  const getOptionsForDependentField = (
    dependentOptionIds: { [key: number]: number[] },
    parentFieldOptionId: number
  ) =>
    dependentOptionIds[parentFieldOptionId].map((optionId) => ({
      id: optionId,
      label: formOptionsMapping[optionId],
    }));

  const getKeyFromValue = (obj: { [key: number]: string }, value: string) =>
    Object.keys(obj).find((key) => formOptionsMapping[parseInt(key)] === value);

  // Handle Dependent field select options here
  if (type === "dependent_select" && dependentOptionIds && parentFieldId) {
    useEffect(() => {
      let parentFieldValue = form[parentFieldId]?.value as string;
      if (parentFieldValue) {
        const parentFieldOptionId = getKeyFromValue(
          formOptionsMapping,
          parentFieldValue
        );
        if (parentFieldOptionId) {
          const dependentFieldOptions = getOptionsForDependentField(
            dependentOptionIds,
            parseInt(parentFieldOptionId)
          );
          setOptions(dependentFieldOptions);
        }
      }
    }, [form[parentFieldId]]);
  }

  const handleInputChange = (change: {
    label: string;
    value: string | string[];
  }) => {
    setError(null);
    updateForm(change, fieldId);
  };

  const handleInputSubmit = () => {
    const errorMsg = inputRef?.current?.checkError();
    if (errorMsg) {
      setError(errorMsg);
    } else {
      scrollToNextWindow(curWindowIndex);
    }
  };

  useEffect(() => {
    allowScroll(!error);
  }, [error]);

  const inputRef = useRef<TextInputRef>(null);

  return (
    <div className="h-screen flex flex-col justify-center snap-start snap-always max-w-3xl mx-auto">
      <div>
        <div className="text-2xl">
          {question} {mandatory && <span>*</span>}
        </div>
        <div className="text-xl opacity-70 mt-2">{subtitle}</div>
        {type === "text" && (
          <TextInput
            ref={inputRef}
            title={title}
            type={subtype || type}
            mandatory={mandatory}
            handleChange={handleInputChange}
          ></TextInput>
        )}

        {type === "dropdown" && (
          <Dropdown
            fieldName={title}
            options={options}
            mandatory={mandatory}
          ></Dropdown>
        )}

        {type === "select" && options?.length && (
          <SelectField
            ref={inputRef}
            fieldName={title}
            options={options}
            mandatory={mandatory}
            handleChange={handleInputChange}
          ></SelectField>
        )}

        {/* Replace type to be of MULTI_SELECT */}
        {type === "dependent_select" && options?.length && (
          <MultiSelectField
            ref={inputRef}
            fieldName={title}
            options={options}
            numSelections={numSelections}
            mandatory={mandatory}
            handleChange={handleInputChange}
          ></MultiSelectField>
        )}

        {error && <Error error={error} />}

        {!error && (
          <NavButton
            onInputSubmit={handleInputSubmit}
            buttonType={buttonType}
            inputType={type}
          />
        )}
      </div>
    </div>
  );
};
