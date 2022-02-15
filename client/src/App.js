import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import theme from "./style/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login/Login";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
