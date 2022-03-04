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

const Login = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { login } = useAuth();

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    error: "",
    joinNow: false,
    addFirstName: "",
    addLastName: "",
    addEmail: "",
    addPW: "",
    addPWConf: "",
  });

  const [addUser] = useMutation(ADD_USER);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleLogin = () => () => {
    const val = login(values.email, values.password)
      .then(() => {
        navigate(`/home`);
      })
      .catch((error) => {
        const errorCode = error.code;
        var errorMessage;
        console.log(error.code);
        if (errorCode === "auth/missing-email") {
          errorMessage = `There is no account associated with that email. Please create an account by clicking the "Join Now" button`;
        }
        if (errorCode === "auth/wrong-password") {
          errorMessage = `Incorrect password. Please try again.`;
        }
        setValues({ ...values, error: errorMessage });
      });
  };

  const handleAddUser = () => {
    if (values.addPW != values.addPWConf) {
      setValues({ ...values, error: "Your passwords must match" });
    }
    const val = signup(values.addEmail, values.addPW)
      .then((user) => {
        addUser({
          variables: {
            id: user.user.uid,
            firstName: values.addFirstName,
            lastName: values.addLastName,
            email: values.addEmail,
          },
        });
        setValues({ ...values, joinNow: false });
      })
      .catch((error) => {
        setValues({ ...values, error: error.message });
      });
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: "#9567e0",
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
        {!values.joinNow ? (
          <Box>
            <TextInput
              value={values.email}
              handleChange={handleChange("email")}
              placeholder="Email"
              id="email-input"
              type="string"
              adornment={<EmailIcon sx={{ color: "white", mr: 3 }} />}
              style={{ mb: "10px", width: "100%" }}
            />
            <TextInput
              value={values.password}
              handleChange={handleChange("password")}
              placeholder="Password"
              id="password-input"
              type="password"
              adornment={<LockIcon sx={{ color: "white", mr: 3 }} />}
              style={{ width: "100%" }}
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
                  width: "30%",
                  border: 1,
                  borderColor: "white",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  setValues({ ...values, joinNow: true, error: "" });
                }}
              >
                Join now
              </Button>
              <Box>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleLogin()}
                  sx={{
                    width: "100%",
                    border: 1,
                    borderColor: "white",
                    borderRadius: "10px",
                    mb: "10px",
                  }}
                >
                  Log in
                </Button>

                <Typography
                  onClick={() => {
                    navigate("/reset");
                  }}
                  variant="body1"
                  sx={{
                    color: "white",
                  }}
                >
                  Forgot password?
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                mb: "10px",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <TextInput
                  value={values.addFirstName}
                  handleChange={handleChange("addFirstName")}
                  placeholder="First Name"
                  id="first-name-input"
                  type="string"
                  style={{
                    width: "50%",
                  }}
                />

                <TextInput
                  value={values.addLastName}
                  handleChange={handleChange("addLastName")}
                  placeholder="Last Name"
                  id="last-name-input"
                  type="string"
                  style={{
                    width: "50%",
                  }}
                />
              </Box>
            </Box>
            <TextInput
              value={values.addEmail}
              handleChange={handleChange("addEmail")}
              placeholder="Email"
              id="email-add-input"
              type="string"
              adornment={<EmailIcon sx={{ color: "white", mr: 3 }} />}
              style={{ mb: "10px", width: "100%" }}
            />
            <TextInput
              value={values.addPW}
              handleChange={handleChange("addPW")}
              placeholder="Password"
              id="password-add-input"
              type="password"
              adornment={<LockIcon sx={{ color: "white", mr: 3 }} />}
              style={{ mb: "10px", width: "100%" }}
            />

            <TextInput
              value={values.addPWConf}
              handleChange={handleChange("addPWConf")}
              placeholder="Confirm Password"
              id="add-password-confirm-input"
              type="password"
              adornment={<LockIcon sx={{ color: "white", mr: 3 }} />}
              style={{ mb: "10px", width: "100%" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                disableElevation
                sx={{
                  width: "30%",
                  border: 1,
                  borderColor: "white",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  setValues({ ...values, joinNow: false, error: "" });
                }}
              >
                Back to Login
              </Button>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  width: "30%",
                  border: 1,
                  borderColor: "white",
                  borderRadius: "10px",
                }}
                onClick={handleAddUser}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        )}
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

export default Login;
