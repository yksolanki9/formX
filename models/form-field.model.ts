//TODO: Create enum for type, subtype, buttonType
export interface FormField {
  title: string;
  subtitle?: string;
  type: "text" | "select" | "dropdown";
  subtype?: "email" | "password";
  mandatory?: boolean;
  numSelections?: number;
  buttonType?: "submit" | "button";
}
