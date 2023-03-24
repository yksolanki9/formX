import { AboutProps } from "@/models/AboutProps";
import Button from "@mui/material/Button";

export const About = (props: AboutProps) => {
  return (
    <div className="h-screen flex flex-col justify-center snap-start snap-always max-w-3xl mx-auto">
      <div>
        <div className="text-2xl">{props.title}</div>
        <div className="text-xl opacity-70">
          <div className="mt-2">{props.subtitle}</div>
          <div className="mt-8">{props.listHeader}</div>
          {props.listItems.map((listItem, index) => (
            <p key={index}>- {listItem}</p>
          ))}
        </div>
        <div className="pt-4">
          <Button className="normal-case" variant="contained">
            {props.action}
          </Button>
          <span className="text-xs pl-4">
            press <strong>Enter ↵ </strong>
          </span>
        </div>
      </div>
    </div>
  );
};
