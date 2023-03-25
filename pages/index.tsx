import { About } from "@/components/About";
import { Input } from "@/components/Input";
import { formInputs } from "@/data/form-inputs";
import { about } from "@/data/about";
import { Layout } from "@/components/Layout";

function submit() {
  console.log("submit form");
}

export default function Home() {
  return (
    <Layout>
      <About {...about} />
      <form onSubmit={submit}>
        {formInputs.map((formInput, index) => (
          <Input key={index} {...formInput} />
        ))}
      </form>
    </Layout>
  );
}
