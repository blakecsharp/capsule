import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import theme from "./style/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login/Login";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
