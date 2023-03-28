import DoneIcon from "@mui/icons-material/Done";

type Props = {
  label: string;
  selected: boolean;
};

export const DropdownOption = ({ label, selected }: Props) => {
  return (
    <div
      className={`flex items-center bg-white/10 hover:bg-white/30 rounded-[3px] h-10 mt-2 cursor-pointer w-full ${
        selected ? "shadow-btn-selected" : "shadow-btn"
      }`}
    >
      <div id="label" className="text-xl mx-3">
        {label}
      </div>
      <div className={`ml-auto px-4 ${selected ? "visible" : "invisible"}`}>
        <DoneIcon />
      </div>
    </div>
  );
};
