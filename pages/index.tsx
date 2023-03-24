import { Input } from "@/components/Input";

export default function Home() {
  return (
    <>
      <div className="snap-y snap-mandatory h-screen overflow-scroll sm:px-20 px-10">
        <Input></Input>
        <div className="h-screen flex items-center justify-center snap-start snap-always">
          <div>And what's your last name?</div>
        </div>
        <div className="h-screen flex items-center justify-center snap-start snap-always">
          <div>And here's the next question</div>
        </div>
        <div className="h-screen flex items-center justify-center snap-start snap-always">
          <div>And the final question comes here</div>
        </div>
      </div>
    </>
  );
}
