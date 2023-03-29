import About from "@/components/About";
import Input from "@/components/Input";
import { formInputs } from "@/data/form-inputs";
import { aboutData } from "@/data/about";
import Layout from "@/components/Layout";
import { useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import { Form } from "@/models/form.model";
import Success from "@/components/Success";
import { successData } from "@/data/success";
import { debounce } from "@mui/material";

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
  const [activeWindowIndex, setActiveWindowIndex] = useState(0);

  const windowRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (windowRefs.current) {
      windowRefs.current = windowRefs.current.slice(0, formInputs.length + 2);
    }
  }, [formInputs]);

  setTimeout(() => setLoading(false), 1200);

  const submitForm = (event: any) => {
    event.preventDefault();
    setFormSubmitted(true);
    console.log("SUBMIT FORM", formState);
  };

  const scrollToNextWindow = (curIndex: number) => {
    const nextIndex = curIndex + 1;
    const nextRef = windowRefs?.current[nextIndex];
    setActiveWindowIndex(nextIndex);
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

  const [scrollDirection, setScrollDirection] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const lastScrollTopRef = useRef(0);
  const inputRef = useRef<{
    handleInputSubmit: () => void;
  }>(null);

  const handleScroll = (event: any) => {
    const { scrollTop } = event.target;
    const direction = scrollTop > lastScrollTopRef.current ? "DOWN" : "UP";
    setScrollDirection(direction);
    lastScrollTopRef.current = scrollTop;
  };

  useEffect(() => {
    if (scrollDirection === "DOWN") {
      console.log(inputRef?.current);
      inputRef?.current?.handleInputSubmit();
    }
  }, [scrollDirection]);
  //   const options = {
  //     root: scrollRef.current,
  //     threshold: 1.0,
  //   };

  //   const observer = new IntersectionObserver(([entry]) => {
  //     // console.log("ENTRY IS", entry);
  //     if (entry.isIntersecting && prevRect) {
  //       if (entry.boundingClientRect.top > prevRect.top) {
  //         setScrollDirection("down");
  //         console.log("scrolling down");
  //       } else {
  //         setScrollDirection("up");
  //         console.log("scrolling up");
  //       }
  //     }
  //     setPrevRect(entry.boundingClientRect);
  //   }, options);

  //   if (scrollRef?.current) {
  //     observer.observe(scrollRef?.current);
  //   }

  //   return () => {
  //     if (scrollRef?.current) {
  //       observer.unobserve(scrollRef.current);
  //     }
  //   };
  // }, [prevRect]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout ref={scrollRef} onScroll={handleScroll} scroll={scroll}>
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
                    // ref={windowRefs.current[index + 1]}
                    ref={(ref) =>
                      windowRefs &&
                      (windowRefs.current[index + 1] = ref as HTMLDivElement)
                    }
                  >
                    <Input
                      ref={inputRef}
                      form={formState}
                      curWindowIndex={index + 1}
                      activeWindowIndex={activeWindowIndex}
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
