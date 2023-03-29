import { useEffect, useRef, useState } from "react";
import Error from "@/components/Error";
import NavButton from "@/components/NavButton";
import SelectField from "@/components/SelectField";
import MobileNumberField from "@/components/MobileNumberField";
import MultiSelectField from "@/components/MultiSelectField";
import TextInput from "@/components/TextInput";
import Dropdown from "@/components/Dropdown";
import { FormField } from "@/models/form-field.model";
import { Option } from "@/models/option.model";
import { TextInputRef } from "@/models/text-input-ref.model";
import { Form } from "@/models/form.model";

import { formOptionsMapping } from "@/data/form-options-mapping";

type Props = FormField & {
  scrollToNextWindow: (index: number) => void;
  curWindowIndex: number;
  allowScroll: (scroll: boolean) => void;
  updateForm: (
    change: { label: string; value: string | string[] },
    index: number
  ) => void;
  form: Form;
  numInputs: number;
  isMobile: boolean;
};

export default function Input({
  title,
  subtitle,
  type,
  subtype,
  mandatory,
  numSelections,
  optionIds,
  dependentOptionIds,
  scrollToNextWindow,
  curWindowIndex,
  allowScroll,
  updateForm,
  form,
  parentFieldId,
  id: fieldId,
  numInputs,
  isMobile = true,
}: Props) {
  const [error, setError] = useState<string | null>();
  const [options, setOptions] = useState<Option[]>([]);
  const inputRef = useRef<TextInputRef>(null);

  //Replace {FORMX-<questionId>} with the value of the question
  const question = title.replace(
    /\{FORMX-([^}]+?)\}/g,
    (match: string, questionId: string) => {
      return (form[parseInt(questionId)]?.value as string) || "";
    }
  );

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
    if ((type === "select" || type === "dropdown") && optionIds?.length) {
      const optionsForSelectField = optionIds.map((optionId) => ({
        id: optionId,
        label: formOptionsMapping[optionId],
      }));
      setOptions(optionsForSelectField);
    }
  }, [optionIds, type]);

  // Handle Dependent field select options here
  useEffect(() => {
    if (type === "dependent_select" && dependentOptionIds && parentFieldId) {
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
    }
  }, [form, dependentOptionIds, parentFieldId, type]);

  useEffect(() => {
    allowScroll(!error);
  }, [error, allowScroll]);

  return (
    <div className="h-screen flex flex-col justify-center snap-start snap-always max-w-3xl mx-auto">
      <div>
        <div className="sm:text-2xl text-xl">
          {question} {mandatory && <span>*</span>}
        </div>
        <div className="sm:text-xl text-base opacity-70 mt-2">{subtitle}</div>
        {type === "text" && (
          <TextInput
            ref={inputRef}
            title={title}
            type={subtype || type}
            mandatory={mandatory}
            handleChange={handleInputChange}
          ></TextInput>
        )}

        {type === "number" && subtype === "tel" && (
          <MobileNumberField
            ref={inputRef}
            title={title}
            type={subtype || type}
            mandatory={mandatory}
            handleChange={handleInputChange}
          />
        )}

        {type === "dropdown" && (
          <Dropdown
            ref={inputRef}
            fieldName={title}
            options={options}
            mandatory={mandatory}
            handleChange={handleInputChange}
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
            submitButton={curWindowIndex === numInputs}
            inputType={type}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
}
