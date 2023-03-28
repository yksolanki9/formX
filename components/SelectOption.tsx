import DoneIcon from "@mui/icons-material/Done";
import { useRef } from "react";

type Props = {
  id?: string;
  label: string;
  selected: boolean;
  showId?: boolean;
  onOptionSelected: (option: any) => void;
};

export const SelectOption = ({
  id,
  label,
  selected,
  onOptionSelected,
  showId = true,
}: Props) => {
  const otherOptionRef = useRef<HTMLDivElement>(null);

  function onOptionClicked(label: string) {
    if (otherOptionRef.current && label === "Other") {
      const labelDivRef = otherOptionRef.current.querySelector(
        "#label"
      ) as HTMLDivElement;
      if (labelDivRef) {
        labelDivRef.innerText = "";
        labelDivRef.contentEditable = "true";
        labelDivRef.focus();
      }
    } else {
      onOptionSelected(label);
    }
  }

  return (
    <div
      ref={label === "Other" ? otherOptionRef : null}
      className={`flex items-center bg-white/10 hover:bg-white/30 rounded-[3px] h-10 mt-2 cursor-pointer ${
        selected ? "shadow-btn-selected" : "shadow-btn"
      } ${!showId ? "w-full" : ""}`}
      onClick={() => onOptionClicked(label)}
    >
      {showId && (
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
      )}
      <div id="label" className={`text-xl ${!showId ? "mx-3" : ""}`}>
        {label}
      </div>
      <div className={`ml-auto px-4 ${selected ? "visible" : "invisible"}`}>
        <DoneIcon />
      </div>
    </div>
  );
};
