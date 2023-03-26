import { About } from "@/components/About";
import { Input } from "@/components/Input";
import { formInputs } from "@/data/form-inputs";
import { about } from "@/data/about";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Loading } from "@/components/Loading";

function submit() {
  console.log("submit form");
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 1200);

  const formChanged = (event: any) => {
    console.log(event.target.value);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <About {...about} />
          <form onChange={formChanged} onSubmit={submit}>
            {formInputs.map((formInput, index) => (
              <Input key={index} {...formInput} />
            ))}
          </form>
        </Layout>
      )}
    </>
  );
}
