import * as React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

import whitelogo from "./whitesmalllogo.png";
import blanklogo from "./smalllogoblank.png";

const NavigationBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        position: "static",
        width: "100vw",
      }}
    >
      <Box
        component="img"
        src={whitelogo}
        sx={{
          height: "42px",
          width: "50px",
          pt: "1vh",
          pb: "1vh",
          ml: "10vw",
          justifyContent: "flex-start",
        }}
      />
      <Box sx={{ marginLeft: "auto", mr: "10vw" }}>
        <AddIcon
          sx={{ color: "white", height: "60px", width: "50px", pr: "5px" }}
          onClick={() => {
            navigate(`/add`);
          }}
        />
        <Box
          component="img"
          src={blanklogo}
          sx={{
            height: "50px",
            width: "50px",
            pr: "5px",
          }}
          onClick={() => {
            navigate(`/collection`);
          }}
        />
        <HomeIcon
          sx={{ color: "white", height: "60px", width: "50px", pr: "5px" }}
          onClick={() => {
            navigate(`/home`);
          }}
        />

        <Button
          variant="contained"
          disableElevation
          sx={{
            width: "50%",
          }}
          onClick={() => {
            logout()
              .then(() => {
                navigate(`/`);
              })
              .catch((error) => {
                // An error happened.
              });
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};

export default NavigationBar;
