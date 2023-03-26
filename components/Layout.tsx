import Image from "next/image";
import logo from "@/public/images/formX.png";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="absolute w-full z-10 bg-black p-4">
        <Image alt="logo" src={logo} height="30" width="90" />
      </div>
      <div className="snap-y snap-mandatory h-screen overflow-scroll sm:px-20 px-10">
        {children}
      </div>
    </>
  );
};
