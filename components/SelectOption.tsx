import DoneIcon from "@mui/icons-material/Done";

type Props = {
  id: string;
  label: string;
  selected: boolean;
  onOptionClicked: (option: any) => void;
};

export const SelectOption = ({
  id,
  label,
  selected,
  onOptionClicked,
}: Props) => {
  return (
    <div
      className={`flex items-center bg-white/10 hover:bg-white/30 rounded-[3px] h-10 mt-2 ${
        selected ? "shadow-btn-selected" : "shadow-btn"
      }`}
      onClick={() => onOptionClicked(label)}
    >
      <div
        className={`flex justify-center items-center p-1 mx-2 my-1 w-6 border border-solid rounded-[3px] text-xs 
          ${
            selected
              ? "text-black bg-white border-white"
              : "border-white/60 bg-black"
          }`}
      >
        <strong>{id}</strong>
      </div>
      <div className="text-xl">{label}</div>
      <div className={`ml-auto px-4 ${selected ? "visible" : "invisible"}`}>
        <DoneIcon />
      </div>
    </div>
  );
};
