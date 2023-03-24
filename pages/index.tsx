import { About } from "@/components/About";
import { Input } from "@/components/Input";
import { formInputs } from "@/data/form-inputs";
import { about } from "@/data/about";

export default function Home() {
  return (
    <>
      <About {...about} />
      <div className="snap-y snap-mandatory h-screen overflow-scroll sm:px-20 px-10">
        {formInputs.map((formInput, index) => (
          <Input key={index} {...formInput} />
        ))}
      </div>
    </>
  );
}
