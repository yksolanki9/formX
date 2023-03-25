import Button from "@mui/material/Button";

type Props = {
  title: string;
  subtitle: string;
  listHeader: string;
  listItems: string[];
  action: string;
};

export const About = ({
  title,
  subtitle,
  listHeader,
  listItems,
  action,
}: Props) => {
  return (
    <div className="h-screen flex flex-col justify-center snap-start snap-always max-w-3xl mx-auto">
      <div>
        <div className="text-2xl">{title}</div>
        <div className="text-xl opacity-70">
          <div className="mt-2">{subtitle}</div>
          <div className="mt-8">{listHeader}</div>
          {listItems.map((listItem, index) => (
            <p key={index}>- {listItem}</p>
          ))}
        </div>
        <div className="pt-4">
          <Button className="normal-case" variant="contained">
            {action}
          </Button>
          <span className="text-xs pl-4">
            press <strong>Enter ↵ </strong>
          </span>
        </div>
      </div>
    </div>
  );
};
