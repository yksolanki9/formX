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
import throttle from "lodash/throttle";

type FormOption = {
  label: string;
  value: string | string[];
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [formState, setFormState] = useState<Form>({});
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const windowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const inputRefs = useRef<Array<{ handleInputSubmit: () => {} }>>([]);
  const activeWindowIdx = useRef<number>(0);
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
    activeWindowIdx.current = nextIndex;
  };

  const checkInputValidity = () => {
    if (activeWindowIdx.current > 0) {
      const inputRef = inputRefs?.current[activeWindowIdx.current - 1];
      inputRef.handleInputSubmit();
    } else {
      scrollToNextWindow(activeWindowIdx.current);
    }
  };

  const scrollToPrevWindow = () => {
    const nextIndex = activeWindowIdx.current - 1;
    const nextRef = windowRefs?.current[nextIndex];
    nextRef?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    activeWindowIdx.current = nextIndex;
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
    if (inputRefs.current) {
      inputRefs.current = inputRefs.current.slice(0, formInputs.length);
    }
  }, [formInputs]);

  const throttledStart = throttle(
    (event) => {
      if (event.deltaY < 0) {
        scrollToPrevWindow();
      } else if (event.deltaY > 0) {
        checkInputValidity();
      }
    },
    2000,
    { leading: true, trailing: false }
  );

  useEffect(() => {
    window.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        throttledStart(event);
      },
      { passive: false }
    );
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout scroll={false}>
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
                      updateForm={updateFormState}
                      numInputs={formInputs.length}
                      isMobile={isMobile}
                      ref={(ref) =>
                        inputRefs &&
                        (inputRefs.current[index] = ref as {
                          handleInputSubmit: () => {};
                        })
                      }
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
