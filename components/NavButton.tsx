import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";

type Props = {
  buttonType?: "submit" | "button";
  inputType: "text" | "select" | "dropdown" | "dependent_select";
};

export const NavButton = ({ buttonType, inputType }: Props) => {
  return (
    <div className="pt-4">
      <Button
        type={buttonType || "button"}
        variant="contained"
        endIcon={<DoneIcon />}
      >
        OK
      </Button>
      {inputType === "text" && (
        <span className="text-xs pl-4">
          press <strong>Enter ↵ </strong>
        </span>
      )}
    </div>
  );
};
