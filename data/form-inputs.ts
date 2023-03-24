import { InputProps } from "@/models/InputProps";

export const formInputs: InputProps[] = [
  {
    title: "What's your first name?",
    type: "TEXT",
    mandatory: true,
  },
  {
    title: "and your last name, <name>?",
    type: "TEXT",
    mandatory: true,
  },
  {
    title: "What industry is your company in?",
    subtitle: "We will personalize your learning experience accordingly",
    type: "DROPDOWN",
    mandatory: true,
  },
  {
    title: "Your role in your company?",
    subtitle: "We want to understand how you spend your time right now.",
    type: "SELECT",
    mandatory: true,
  },
  {
    title: "<name>, what's your professional goal for the next 12 months?",
    type: "SELECT",
    numSelections: 2,
    mandatory: true,
  },
  {
    title: "Email you'd like to register with?",
    subtitle:
      "We will keep all our communications with you through this email. Do check your spam inbox if you can't find our application received email.",
    type: "TEXT",
    subtype: "EMAIL",
    mandatory: true,
  },
];
