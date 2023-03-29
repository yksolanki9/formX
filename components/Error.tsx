import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

type Props = {
  error: string;
};

export default function Error({ error }: Props) {
  return (
    <div className="bg-light-pink rounded h-8 mt-4 flex items-center py-1 px-2 sm:pr-3 font-sans w-full sm:w-fit">
      <WarningRoundedIcon color="error" sx={{ fontSize: 18 }} />
      <div className="text-pink-900 text-sm pl-1">{error}</div>
    </div>
  );
};
