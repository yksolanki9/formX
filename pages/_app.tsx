import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";

import { Questrial } from "@next/font/google";
const questrial = Questrial({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <div className={questrial.className}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
