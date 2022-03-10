import * as React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { Container, Button } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";

import NavigationBar from "../shared/NavigationBar";
import CustomButton from "../shared/Button";
import TextInput from "../shared/TextInput";
import Loading from "../shared/Loading";

const Invite = () => {
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NavigationBar isLoggedIn />
      <Box
        sx={{
          width: "60%",
          maxWidth: "800px",
          mt: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" style={{marginTop: "40px", fontSize: "25px"}}>
          Join this capsule with the following ID:
          <Typography variant="subtitle2">
            {location.state.capsuleId}
          </Typography>
        </Typography>
      </Box>
      <Button
        disableElevation
        onClick={() => {
          navigate("/capsule", {
            state: {
              capsuleId: location.state.capsuleId,
            },
          });
        }}
        sx={{
          marginTop: 10,
          border: 1,
          borderRadius: "10px",
        }}
      >
        Back
      </Button>
    </Container>
  );
};

export default Invite;
