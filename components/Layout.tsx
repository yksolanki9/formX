import Image from "next/image";
import logo from "@/public/images/formX.png";
import { forwardRef, ForwardRefRenderFunction } from "react";

type Props = {
  scroll: boolean;
  children: React.ReactNode;
  onScroll?: (e: any) => void;
};

const Layout: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { children, scroll, onScroll }: Props,
  ref
) => {
  return (
    <>
      <div className="absolute w-full z-10 bg-black p-4">
        <Image alt="logo" src={logo} height="30" width="90" />
      </div>
      <div
        className={`snap-y snap-mandatory h-screen sm:px-20 px-10 ${
          scroll ? "overflow-scroll" : "overflow-hidden"
        }`}
        onScroll={onScroll}
        ref={ref}
      >
        {children}
      </div>
    </>
  );
};

export default forwardRef(Layout);
