import * as React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/HomeRounded";
import SignOutIcon from '@mui/icons-material/ExitToAppRounded';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import "./NavigationBar.css"
import whitelogo from "./whitesmalllogo.png";
import blanklogo from "./smalllogoblank.png";
import purplelogo from "./whitesmalllogo.png";
import purplelogoblank from "./smallpurpleblank.png";
import HelpIcon from "@mui/icons-material/HelpCenter";
import CustomButton from "./Button";

const purple = "#9567e0";

const NavigationBar = ({ isLoggedIn }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(to right, #9567E0, #B64FE7, #A082F8)",
        display: "flex",
        flexDirection: "row",
        position: "static",
        mt: "-0.93%",
        ml: "-1%",
        mr: "-1%",
        mb: "10px",
        width: "101.5%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={whitelogo}
        sx={{
          display: "flex",
          height: "42px",
          width: "50px",
          pt: "1vh",
          pb: "1vh",
          ml: "12%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      />
      <Box
        sx={{
          marginLeft: "auto",
          mr: "12%",
          justifyContent: "flex-start",
          display: "flex",
          alignItems: "center",
        }}
      >
        <HomeIcon
          style={{cursor:'pointer'}}
          sx={{
            color: "white",
            height: "60px",
            width: "50px",
            mr: "5%",
          }}
          onClick={() => {
            navigate(`/home`);
          }}
        />

        <HelpIcon
          style={{cursor:'pointer'}}
          sx={{
            color: "white",
            height: "60px",
            width: "50px",
            mr: "5%",
          }}
          onClick={() => {
            navigate(`/faq`);
          }}
        />

        <SignOutIcon
          style={{cursor:'pointer'}}
          sx={{
            color: "white",
            height: "60px",
            width: "50px",
          }}
          onClick={() => {
            console.log("logging out");
            navigate(`/login`);
          }}
        />
      </Box>
    </Box>
  );
};

export default NavigationBar;
