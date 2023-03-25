import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import TextField from "@mui/material/TextField";

type Props = {
  title: string;
  subtitle?: string;
  type: string;
  subtype?: string;
  mandatory?: boolean;
  numSelections?: number;
};

export const Input = ({
  title,
  subtitle,
  type,
  subtype,
  mandatory,
  numSelections,
}: Props) => {
  return (
    <div className="h-screen flex flex-col justify-center snap-start snap-always max-w-3xl mx-auto">
      <div>
        {/*TODO: Add a number to the left of the title */}
        {/* <div>
          <div>
          <span>1</span>
          <ArrowForwardIcon />
          </div>
        </div> */}
        <div className="text-2xl">
          {title} {mandatory && <span>*</span>}
        </div>
        <div className="text-xl opacity-70 mt-2">{subtitle}</div>
        <TextField
          required
          fullWidth
          id="standard-required"
          placeholder="Type your answer here"
          variant="standard"
          color="info"
          className="mt-8 border-b border-slate-600 border-solid focus:border-b-2 focus:border-white "
          inputProps={{
            className: "text-3xl text-white placeholder:font-thin",
          }}
        />
        <div className="pt-4">
          <Button variant="contained" endIcon={<DoneIcon />}>
            OK
          </Button>
          {type === "TEXT" && (
            <span className="text-xs pl-4">
              press <strong>Enter ↵ </strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
