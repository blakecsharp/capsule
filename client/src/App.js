import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import React, { useContext, useEffect, useState } from "react";

import theme from "./style/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Capsule from "./components/Capsule/Capsule";
import Add from "./components/Add/Add";
import CreateCapsule from "./components/CreateCapsule/CreateCapsule";
import { TabletView, isMobile, isTablet } from "react-device-detect";
import { Typography } from "@mui/material";

function App() {
  if (isMobile) {
    return (
      <Typography>
        Our product looks better on iPad or Desktop. Come back on one of those
        devices.
      </Typography>
    );
  }
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/capsule" element={<Capsule />} />
          <Route path="/add" element={<Add />} />
          <Route path="/create" element={<CreateCapsule />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
