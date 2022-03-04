import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";

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
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "Poppins",
      "Poppins-CondensedExtraBold",
      "Poppins-CondensedMedium",
      "Poppins-Medium",
      "Poppins-MediumItalic",
    ].join(","),
    h2: {
      fontSize: 48,
      background: "-webkit-linear-gradient(45deg, #9567E0, #B64FE7)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    h3: {
      fontSize: 36,
      background: "-webkit-linear-gradient(45deg, #9567E0, #B64FE7)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    h4: {
      fontSize: 28,
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: 24,
      fontWeight: 100,
    },
    subtitle2: {
      fontSize: 24,
      fontWeight: 100,
      color: "#9567E0",
    },
  },
});

export default theme;
