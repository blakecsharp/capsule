import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import TextInput from "../shared/TextInput";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth, auth } from "../../AuthContext";

import logo from "../shared/whitelogo.png";

import { ADD_USER } from "../../requests";

import { Container, Typography } from "@mui/material";

const Reset = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [values, setValues] = React.useState({
    email: "",
    error: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleReset = async () => {
    const val = await resetPassword(values.email)
      .then(() => {
        navigate(`/login`);
      })
      .catch((error) => {
        var errorMessage;
        if (error.code === "auth/missing-email") {
          errorMessage = `There is no account associated with that email. Please create an account by clicking the "Join Now" button`;
        }
        setValues({ ...values, error: errorMessage });
      });
    console.log(val);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      style={{
        backgroundImage: "url(" + "https://i.imgur.com/tb0m2H2.jpg",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        component="img"
        src={logo}
        sx={{ height: "80px", pt: "1vh", pb: "1vh" }}
      />
      <Box
        sx={{
          width: "60%",
          maxWidth: "800px",
        }}
      >
        <TextInput
          value={values.email}
          handleChange={handleChange("email")}
          placeholder="Email"
          id="email-input"
          type="string"
          adornment={<EmailIcon sx={{ color: "white", mr: 3 }} />}
          style={{ mb: "10px", width: "100%", mb: "20px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: "40%",
              border: 1,
              borderColor: "white",
              backgroundColor: "transparent",
              borderRadius: "10px",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Back to Login
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={handleReset}
            sx={{
              width: "40%",
              border: 1,
              borderColor: "white",
              backgroundColor: "transparent",
              borderRadius: "10px",
              mb: "10px",
            }}
          >
            Send password reset email
          </Button>
        </Box>
        <Typography
          sx={{
            mt: "20px",
          }}
        >
          {values.error}
        </Typography>
      </Box>
    </Container>
  );
};

export default Reset;
