import * as React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { Container, Button } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";

import NavigationBar from "../shared/NavigationBar";
import CustomButton from "../shared/Button";
import TextInput from "../shared/TextInput";

const FAQ = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);

  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NavigationBar isLoggedIn />

      <Button
        disableElevation
        onClick={() => {
          navigate("/home", {});
        }}
        sx={{
          border: 1,
          borderRadius: "10px",
        }}
      >
        Back
      </Button>
    </Container>
  );
};

export default FAQ;
