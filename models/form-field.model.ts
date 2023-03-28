//TODO: Create enum for type, subtype

export interface FormField {
  id: number;
  title: string;
  subtitle?: string;
  type: "text" | "select" | "dependent_select" | "dropdown" | "number";
  subtype?: "email" | "password" | "tel";
  mandatory: boolean;
  numSelections?: number;
  optionIds?: number[];
  parentFieldId?: number;
  dependentOptionIds?: { [key: number]: number[] };
}
