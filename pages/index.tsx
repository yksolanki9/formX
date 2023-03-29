import { useEffect, useRef, useState } from "react";

import About from "@/components/About";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Success from "@/components/Success";
import { Form } from "@/models/form.model";
import { formInputs } from "@/data/form-inputs";
import { aboutData } from "@/data/about";
import { successData } from "@/data/success";

type FormOption = {
  label: string;
  value: string | string[];
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [scroll, setScroll] = useState<boolean>(true);
  const [formState, setFormState] = useState<Form>({});
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const windowRefs = useRef<Array<HTMLDivElement | null>>([]);
  setTimeout(() => setLoading(false), 1200);

  const submitForm = (event: any) => {
    event.preventDefault();
    setFormSubmitted(true);
    console.log("SUBMIT FORM", formState);
  };

  const scrollToNextWindow = (curIndex: number) => {
    const nextIndex = curIndex + 1;
    const nextRef = windowRefs?.current[nextIndex];
    nextRef?.scrollIntoView({
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

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (windowRefs.current) {
      windowRefs.current = windowRefs.current.slice(0, formInputs.length + 2);
    }
  }, [formInputs]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout scroll={scroll}>
          {!formSubmitted && (
            <>
              <div
                ref={(ref) =>
                  windowRefs && (windowRefs.current[0] = ref as HTMLDivElement)
                }
              >
                <About
                  curWindowIndex={0}
                  scrollToNextWindow={scrollToNextWindow}
                  isMobile={isMobile}
                  {...aboutData}
                />
              </div>
              <form onSubmit={submitForm}>
                {formInputs.map((formInput, index) => (
                  <div
                    key={index}
                    ref={(ref) =>
                      windowRefs &&
                      (windowRefs.current[index + 1] = ref as HTMLDivElement)
                    }
                  >
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
            </>
          )}
          {formSubmitted && <Success {...successData} />}
        </Layout>
      )}
    </>
  );
}
