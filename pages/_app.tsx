import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Questrial } from "next/font/google";

const questrial = Questrial({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});

const cache = createCache({
  key: "css",
  prepend: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <div className={questrial.className}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
