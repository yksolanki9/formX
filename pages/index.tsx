import { About } from "@/components/About";
import { Input } from "@/components/Input";
import { formInputs } from "@/data/form-inputs";
import { about } from "@/data/about";
import { Layout } from "@/components/Layout";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Loading } from "@/components/Loading";
import { Form } from "@/models/form.model";

type FormOption = {
  label: string;
  value: string | string[];
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [scroll, setScroll] = useState<boolean>(true);
  const [formState, setFormState] = useState<Form>({});
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const windowRefs: MutableRefObject<HTMLDivElement>[] = [];
  for (let i = 0; i <= formInputs.length; i++) {
    windowRefs.push(useRef() as MutableRefObject<HTMLDivElement>);
  }

  setTimeout(() => setLoading(false), 1200);

  const submitForm = () => {
    console.log("SUBMIT FORM", formState);
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
    const updatedFormState = { ...formState };
    updatedFormState[index] = change;
    setFormState(updatedFormState);
  };

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
              isMobile={isMobile}
              {...about}
            />
          </div>
          <form onSubmit={submitForm}>
            {formInputs.map((formInput, index) => (
              <div key={index} ref={windowRefs[index + 1]}>
                <Input
                  form={formState}
                  curWindowIndex={index + 1}
                  scrollToNextWindow={scrollToNextWindow}
                  allowScroll={setScroll}
                  updateForm={updateFormState}
                  numInputs={formInputs.length}
                  isMobile={isMobile}
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
