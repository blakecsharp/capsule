import * as React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

import whitelogo from "./whitesmalllogo.png";
import blanklogo from "./smalllogoblank.png";
import purplelogo from "./smallpurplelogo.png";
import purplelogoblank from "./smallpurpleblank.png";
import HelpIcon from "@mui/icons-material/Help";
import CustomButton from "./Button";

const purple = "#9567e0";

const NavigationBar = ({ isLoggedIn }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        position: "static",
        width: "100vw",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={isLoggedIn ? purplelogo : whitelogo}
        sx={{
          display: "flex",
          height: "42px",
          width: "50px",
          pt: "1vh",
          pb: "1vh",
          ml: "10vw",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      />
      <Box
        sx={{
          marginLeft: "auto",
          mr: "10vw",
          justifyContent: "flex-start",
          display: "flex",
          alignItems: "center",
        }}
      >
        <HomeIcon
          sx={{
            color: isLoggedIn ? purple : "white",
            height: "60px",
            width: "50px",
            mr: "20px",
          }}
          onClick={() => {
            navigate(`/home`);
          }}
        />

        <HelpIcon
          sx={{
            color: isLoggedIn ? purple : "white",
            height: "60px",
            width: "50px",
            mr: "20px",
          }}
          onClick={() => {
            navigate(`/faq`);
          }}
        />

        <CustomButton
          variant="contained"
          disableElevation
          isLoggedIn={isLoggedIn}
          sx={{
            height: "75%",
          }}
          onClick={() => {
            console.log("logging out");
            navigate("/login");
            logout();
          }}
          text="Sign Out"
        />
      </Box>
    </Box>
  );
};

export default NavigationBar;
