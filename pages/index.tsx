import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import TextField from "@mui/material/TextField";

export default function Home() {
  return (
    <>
      <div className="snap-y snap-mandatory h-screen overflow-scroll sm:px-20 px-10">
        <div className="h-screen flex flex-col justify-center snap-start snap-always max-w-3xl mx-auto">
          <div className="text-2xl">What's your first name?</div>
          <TextField
            required
            fullWidth
            id="standard-required"
            placeholder="Type your answer here"
            variant="standard"
            className="mt-8"
            inputProps={{
              className:
                "text-3xl text-white border-2 border-white hover:border-2 hover:border-white placeholder:font-thin",
            }}
          />
          <div className="pt-4">
            <Button variant="contained" endIcon={<DoneIcon />}>
              OK
            </Button>
          </div>
        </div>
        <div className="h-screen flex items-center justify-center snap-start snap-always">
          <div>And what's your last name?</div>
        </div>
        <div className="h-screen flex items-center justify-center snap-start snap-always">
          <div>And here's the next question</div>
        </div>
        <div className="h-screen flex items-center justify-center snap-start snap-always">
          <div>And the final question comes here</div>
        </div>
      </div>
    </>
  );
}
