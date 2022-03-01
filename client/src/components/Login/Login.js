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

import logo from "./whitelogo.png";

import { ADD_USER } from "../../requests";

import { Container, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { login } = useAuth();

  /*
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return <>Loading...</>;
    }
    if (user) {
      console.log(user);
      navigate("/home");
    }
  }, [user, loading]);
  */

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
        const errorMessage = error.message;
        setValues({ error: errorMessage });
        console.log(errorMessage);
      });
  };

  const handleAddUser = () => {
    if (values.addPW != values.addPWConf) {
      setValues({ error: "Your passwords must match" });
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
                  setValues({ joinNow: true, error: "" });
                }}
              >
                Join now
              </Button>
              <Button
                variant="contained"
                disableElevation
                onClick={handleLogin()}
                sx={{
                  width: "30%",
                  border: 1,
                  borderColor: "white",
                  borderRadius: "10px",
                }}
              >
                Log in
              </Button>
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
              <Box sx={{ width: "90%", mr: "5px" }}>
                <TextInput
                  value={values.addFirstName}
                  handleChange={handleChange("addFirstName")}
                  placeholder="First Name"
                  id="first-name-input"
                  type="string"
                />
              </Box>
              <Box sx={{ width: "90%", ml: "5px" }}>
                <TextInput
                  value={values.addLastName}
                  handleChange={handleChange("addLastName")}
                  placeholder="Last Name"
                  id="last-name-input"
                  type="string"
                  sx={{
                    width: "45%",
                  }}
                />
              </Box>
            </Box>
            <TextInput
              value={values.addEmail}
              handleChange={handleChange("addEmail")}
              placeholder="Email"
              id="add-email-input"
              type="string"
              adornment={<EmailIcon sx={{ color: "white", mr: 3 }} />}
              style={{ mb: "10px" }}
            />
            <TextInput
              value={values.addPW}
              handleChange={handleChange("addPW")}
              placeholder="Password"
              id="add-password-input"
              type="password"
              adornment={<LockIcon sx={{ color: "white", mr: 3 }} />}
              style={{ mb: "10px" }}
            />

            <TextInput
              value={values.addPWConf}
              handleChange={handleChange("addPWConf")}
              placeholder="Confirm Password"
              id="add-password-confirm-input"
              type="password"
              adornment={<LockIcon sx={{ color: "white", mr: 3 }} />}
              style={{ mb: "10px" }}
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
                  setValues({ joinNow: false, error: "" });
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
        <Typography>{values.error}</Typography>
      </Box>
    </Container>
  );
};

export default Login;
