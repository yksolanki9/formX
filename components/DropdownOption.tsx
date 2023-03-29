import DoneIcon from "@mui/icons-material/Done";
import styles from "@/styles/DropdownOption.module.css";

type Props = {
  label: string;
  selected: boolean;
};

export default function DropdownOption({ label, selected }: Props) {
  return (
    <div
      className={
        styles.dropdownOption + " " + (selected ? styles.selected : "")
      }
    >
      <div id="label" className={styles.label}>
        {label}
      </div>
      <div className={styles.icon + " " + (!selected ? styles.noIcon : "")}>
        <DoneIcon />
      </div>
    </div>
  );
};
