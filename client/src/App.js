import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import React, { useContext, useEffect, useState } from "react";

import theme from "./style/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Collection from "./components/Collection/Collection";
import Add from "./components/Add/Add";
import CreateCapsule from "./components/CreateCapsule/CreateCapsule";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/add" element={<Add />} />
          <Route path="/create" element={<CreateCapsule />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
