import { FormField } from "@/models/form-field.model";

export const formInputs: FormField[] = [
  {
    title: "What's your first name?",
    type: "text",
    mandatory: true,
  },
  {
    title: "and your last name, <name>?",
    type: "text",
    mandatory: true,
  },
  {
    title: "What industry is your company in?",
    subtitle: "We will personalize your learning experience accordingly",
    type: "dropdown",
    mandatory: true,
  },
  {
    title: "Your role in your company?",
    subtitle: "We want to understand how you spend your time right now.",
    type: "select",
    mandatory: true,
  },
  {
    title: "<name>, what's your professional goal for the next 12 months?",
    type: "select",
    numSelections: 2,
    mandatory: true,
  },
  {
    title: "Email you'd like to register with?",
    subtitle:
      "We will keep all our communications with you through this email. Do check your spam inbox if you can't find our application received email.",
    type: "text",
    subtype: "email",
    mandatory: true,
    buttonType: "submit",
  },
];
