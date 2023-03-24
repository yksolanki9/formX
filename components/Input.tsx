import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import TextField from "@mui/material/TextField";

export const Input = () => {
  return (
    <div className="h-screen flex flex-col justify-center snap-start snap-always max-w-3xl mx-auto">
      <div>
        {/* <div>
          <div>
          <span>1</span>
          <ArrowForwardIcon />
          </div>
        </div> */}
        <div className="text-2xl">
          What's your first name? <span>*</span>
        </div>
        <TextField
          required
          fullWidth
          id="standard-required"
          placeholder="Type your answer here"
          variant="standard"
          color="info"
          className="mt-8  border-b border-slate-600 border-solid focus:border-b-2 focus:border-white "
          inputProps={{
            className: "text-3xl text-white placeholder:font-thin",
          }}
        />
        <div className="pt-4">
          <Button variant="contained" endIcon={<DoneIcon />}>
            OK
          </Button>
          <span className="text-xs pl-4">
            press <strong>Enter ↵ </strong>
          </span>
        </div>
      </div>
    </div>
  );
};
