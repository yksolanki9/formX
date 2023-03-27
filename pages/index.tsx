import { About } from "@/components/About";
import { Input } from "@/components/Input";
import { formInputs } from "@/data/form-inputs";
import { about } from "@/data/about";
import { Layout } from "@/components/Layout";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Loading } from "@/components/Loading";

function submit() {
  console.log("submit form");
}

type FormOption = {
  label: string;
  value: string | string[];
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [scroll, setScroll] = useState<boolean>(true);
  const [formState, setFormState] = useState<any[]>([]);

  const windowRefs: MutableRefObject<HTMLDivElement>[] = [];
  for (let i = 0; i <= formInputs.length; i++) {
    windowRefs.push(useRef() as MutableRefObject<HTMLDivElement>);
  }

  setTimeout(() => setLoading(false), 1200);

  const formChanged = (event: any) => {
    console.log(event.target.value);
  };

  const scrollToNextWindow = (curIndex: number) => {
    const nextIndex = curIndex + 1;
    const nextRef = windowRefs[nextIndex];
    nextRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const updateFormState = (change: FormOption, index: number) => {
    const updatedFormState = formState;
    updatedFormState[index] = change;
    setFormState(updatedFormState);
    console.log("UPDATEFORMSTATE", updatedFormState);
    console.log("formState", formState);
  };

  useEffect(() => console.log("PARENT FORM", formState), [formState]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout scroll={scroll}>
          <div ref={windowRefs[0]}>
            <About
              curWindowIndex={0}
              scrollToNextWindow={scrollToNextWindow}
              {...about}
            />
          </div>
          <form onChange={formChanged} onSubmit={submit}>
            {formInputs.map((formInput, index) => (
              <div key={index} ref={windowRefs[index + 1]}>
                <Input
                  curWindowIndex={index + 1}
                  scrollToNextWindow={scrollToNextWindow}
                  allowScroll={setScroll}
                  updateForm={updateFormState}
                  {...formInput}
                />
              </div>
            ))}
          </form>
        </Layout>
      )}
    </>
  );
}
