import DoneIcon from "@mui/icons-material/Done";

type Props = {
  label: string;
  selected: boolean;
};

export const SelectOption = ({ label, selected }: Props) => {
  console.log(label, selected);
  return (
    <div
      className={`flex items-center bg-white/10 hover:bg-white/30 rounded-[3px] h-10 mt-2 ${
        selected ? "shadow-btn-selected" : "shadow-btn"
      }`}
    >
      <div
        className={`flex justify-center items-center p-1 mx-2 my-1 w-6 border border-solid rounded-[3px] text-xs 
          ${
            selected
              ? "text-black bg-white border-white"
              : "border-white/60 bg-black"
          }`}
      >
        <strong>A</strong>
      </div>
      <div className="text-xl">{label}</div>
      {selected && (
        <div className="ml-auto pr-3">
          <DoneIcon />
        </div>
      )}
    </div>
  );
};
