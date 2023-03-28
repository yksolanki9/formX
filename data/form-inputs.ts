import { FormField } from "@/models/form-field.model";

export const formOptionsMapping: { [key: number]: string } = {
  101: "Founder or CXO",
  102: "Product Team",
  103: "Marketing Team",
  104: "VC",
  105: "Other",
  201: "Get hired",
  202: "Get promoted",
  203: "Connect with like-minded people",
  204: "Structured approach to growth",
  205: "Build a growth team",
};

export const formInputs: FormField[] = [
  {
    id: 1,
    title: "What's your first name?",
    type: "text",
    mandatory: true,
  },
  {
    id: 2,
    title: "and your last name, {FORMX-1}?",
    type: "text",
    mandatory: true,
  },
  {
    id: 3,
    title: "What industry is your company in?",
    subtitle: "We will personalize your learning experience accordingly",
    type: "dropdown",
    mandatory: true,
  },
  {
    id: 4,
    title: "Your role in your company?",
    subtitle: "We want to understand how you spend your time right now.",
    type: "select",
    mandatory: true,
    optionIds: [101, 102, 103, 104, 105],
  },
  {
    id: 5,
    title: "{FORMX-1}, what's your professional goal for the next 12 months?",
    type: "dependent_select",
    numSelections: 2,
    mandatory: true,
    parentFieldId: 4,
    dependentOptionIds: {
      101: [204, 205, 203],
      102: [201, 202, 203, 204, 205],
      103: [201, 202, 203, 204, 205],
      104: [201, 202, 203, 204, 205],
      105: [201, 202, 203, 204, 205],
    },
  },
  {
    id: 6,
    title: "Email you'd like to register with?",
    subtitle:
      "We will keep all our communications with you through this email. Do check your spam inbox if you can't find our application received email.",
    type: "text",
    subtype: "email",
    mandatory: true,
    buttonType: "submit",
  },
];
