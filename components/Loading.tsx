import Image from "next/image";
import logo from "@/public/images/formX.png";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-40">
          <div className="flex justify-center">
            <Image alt="logo" src={logo} height="30" width="90" />
          </div>
          <div className="mt-4">
            <LinearProgress />
          </div>
        </div>
      </div>
    </>
  );
};
