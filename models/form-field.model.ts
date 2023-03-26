//TODO: Create enum for type, subtype, buttonType

export interface FormField {
  id: number;
  title: string;
  subtitle?: string;
  type: "text" | "select" | "dependent_select" | "dropdown";
  subtype?: "email" | "password";
  mandatory?: boolean;
  numSelections?: number;
  buttonType?: "submit" | "button";
  optionIds?: number[];
  parentFieldId?: number;
  dependentOptionIds?: { [key: number]: number[] };
}
