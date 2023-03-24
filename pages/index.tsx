import { Input } from "@/components/Input";
import { formInputs } from "@/data/form-inputs";

export default function Home() {
  return (
    <>
      <div className="snap-y snap-mandatory h-screen overflow-scroll sm:px-20 px-10">
        {formInputs.map((formInput) => (
          <Input {...formInput} />
        ))}
      </div>
    </>
  );
}
