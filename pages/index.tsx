import { About } from "@/components/About";
import { Input } from "@/components/Input";
import { formInputs } from "@/data/form-inputs";
import { about } from "@/data/about";
import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <About {...about} />
      {formInputs.map((formInput, index) => (
        <Input key={index} {...formInput} />
      ))}
    </Layout>
  );
}
