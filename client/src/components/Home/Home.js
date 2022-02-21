import * as React from "react";
import { Container, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Button } from "@mui/material";

import NavigationBar from "../shared/NavigationBar";
import { GET_USER } from "../../requests";
import { useAuth } from "../../AuthContext";
import { getAuth } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  const currentUser = useAuth();

  const auth = getAuth();
  const user = auth.currentUser;

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: user.uid },
  });

  console.log("loading", loading);
  console.log("error", error);
  console.log(data);

  if (loading) {
    return null;
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: "#9567e0",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NavigationBar />
      {!loading && data && (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginBottom: "20px" }}>
            Hi {data.response.firstName}!
          </Typography>

          {!data.response.capsules || data.response.capsules.length < 1 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
              }}
            >
              Looks like you are not a part of any capsules.
              <Button
                variant="contained"
                disableElevation
                sx={{
                  width: "50%",
                }}
                onClick={() => {
                  navigate("/create");
                }}
              >
                Click here to create your first capsule
              </Button>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  width: "50%",
                }}
                onClick={() => {
                  navigate("/create");
                }}
              >
                Click here to join your first capsule
              </Button>
            </Box>
          ) : (
            <Box></Box>
          )}
        </Container>
      )}
    </Container>
  );
};

export default Home;
