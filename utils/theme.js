import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Questrial, sans-serif",
  },
  palette: {
    primary: {
      main: "#0066FF",
    },
    info: {
      main: "#FFFFFF",
    },
    error: {
      main: "rgb(175, 4, 4)",
    },
  },
});
