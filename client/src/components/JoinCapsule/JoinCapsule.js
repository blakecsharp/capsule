import * as React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";

import NavigationBar from "../shared/NavigationBar";
import CustomButton from "../shared/Button";

const Join = () => {
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
        <Typography variant="h4">
          Tell your friend or family member to join Capsule and use this ID to
          join the capsule:
          <Typography variant="subtitle2">
            {location.state.capsuleId}
          </Typography>
        </Typography>
      </Box>
      <CustomButton
        onClick={() => {
          navigate("/capsule", {
            state: {
              capsuleId: location.state.capsuleId,
            },
          });
        }}
        text="Back"
        isLoggedIn
      />
    </Container>
  );
};

export default Join;
