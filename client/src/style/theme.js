import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  shadows: ["none"],
  palette: {
    background: {
      main: "#9a7fae",
    },
    primary: {
      main: "#9567e0",
      light: "#ffffff",
    },
    secondary: {
      main: "#86ba83",
    },
  },
  typography: {
    fontFamily: [
      "Futura",
      "Futura-CondensedExtraBold",
      "Futura-CondensedMedium",
      "Futura-Medium",
      "Futura-MediumItalic",
    ].join(","),
  },
});

export default theme;
