import { FormField } from "@/models/form-field.model";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Error from "@/components/Error";
import NavButton from "@/components/NavButton";
import SelectField from "@/components/SelectField";
import { formOptionsMapping } from "@/data/form-options-mapping";
import { Option } from "@/models/option.model";
import MultiSelectField from "./MultiSelectField";
import TextInput from "./TextInput";
import { TextInputRef } from "@/models/text-input-ref.model";
import { Form } from "@/models/form.model";
import Dropdown from "./Dropdown";
import MobileNumberField from "./MobileNumberField";

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
  activeWindowIndex: number;
};

const Input: ForwardRefRenderFunction<
  {
    handleInputSubmit: () => void;
  },
  Props
> = (
  {
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
    activeWindowIndex,
    isMobile = true,
  }: Props,
  ref
) => {
  const [error, setError] = useState<string | null>();
  const [options, setOptions] = useState<Option[]>([]);

  //Replace {FORMX-<questionId>} with the value of the question
  const question = title.replace(
    /\{FORMX-([^}]+?)\}/g,
    (match: string, questionId: string) => {
      return (form[parseInt(questionId)]?.value as string) || "";
    }
  );

  useEffect(() => {
    if ((type === "select" || type === "dropdown") && optionIds?.length) {
      const optionsForSelectField = optionIds.map((optionId) => ({
        id: optionId,
        label: formOptionsMapping[optionId],
      }));
      setOptions(optionsForSelectField);
    }
  }, [optionIds, type]);

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

  const handleInputChange = (change: {
    label: string;
    value: string | string[];
  }) => {
    setError(null);
    updateForm(change, fieldId);
  };

  useImperativeHandle(ref, () => ({
    handleInputSubmit: () => {
      if (activeWindowIndex === curWindowIndex) {
        handleInputSubmit();
      }
    },
  }));

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
  }, [error, allowScroll]);

  const inputRef = useRef<TextInputRef>(null);

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
};

export default forwardRef(Input);
