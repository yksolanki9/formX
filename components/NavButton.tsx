import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";

type Props = {
  submitButton?: boolean;
  inputType: "text" | "select" | "dropdown" | "dependent_select" | "number";
  onInputSubmit: () => void;
  isMobile: boolean;
};

export const NavButton = ({
  inputType,
  onInputSubmit,
  submitButton = false,
  isMobile = true,
}: Props) => {
  return (
    <div className="pt-4">
      <Button
        variant="contained"
        endIcon={!submitButton && <DoneIcon />}
        onClick={onInputSubmit}
        className="normal-case"
      >
        {submitButton ? "Submit" : "OK"}
      </Button>
      {(inputType === "text" || inputType === "number") && !isMobile && (
        <span className="text-xs pl-4">
          press {submitButton && <strong>Cmd ⌘ + </strong>}
          <strong>Enter ↵ </strong>
        </span>
      )}
    </div>
  );
};
