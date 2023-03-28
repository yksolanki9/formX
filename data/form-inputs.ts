import { FormField } from "@/models/form-field.model";
import { formOptionsMapping } from "./form-options-mapping";

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
    optionIds: [
      301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315,
      316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330,
      331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345,
      346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360,
      361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375,
      376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390,
      391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405,
      406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420,
      421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435,
      436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449,
    ],
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
  },
  {
    id: 7,
    title: "Your phone number",
    subtitle:
      "We won't call you unless it is absolutely required to process your application.",
    type: "number",
    subtype: "tel",
    mandatory: true,
  },
];
