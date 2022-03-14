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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NavigationBar isLoggedIn />
      <Box sx={{ lineHeight: 1.3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography variant="h2" sx={{ mb: "15px", mt: "5px" }}>
            FAQ
          </Typography>
        </Box>
        <Box
          sx={{
            mr: "10%",
            ml: "10%",
          }}
        >
          <Box sx={{ pb: "30px" }}>
            <Typography variant="subtitle2">
              Can I belong to multiple capsules?
            </Typography>
            <Typography style={{fontSize: 14}} variant="h5">
              Yes! You can belong to an unlimited number of capsules. 
            </Typography>
          </Box>
          <Box sx={{ pb: "30px" }}>
            <Typography variant="subtitle2">
           How do I invite my family members or friends to join my capsule? 
            </Typography>
            <Typography style={{fontSize: 14}} variant="h5">
           Enter the home page for the capsule you’d like to invite someone to and
              click the “Invite someone to this capsule” button. This will
              provide you with a unique ID for the capsule that your loved one
              can enter when they sign up to join.
            </Typography>
          </Box>
          <Box
            sx={{
              pb: "30px",
            }}
          >
            <Typography variant="subtitle2">
              Are there guidelines for how to upload good photo or video content
              of mementos?
            </Typography>
            <Typography style={{fontSize: 14}} variant="h5">
              If the item is 3D, we suggest that you take multiple photos to
              capture all sides of the memento or one video that shows the
              memento in its entirety. If the memento is written like a recipe
              or letter, we suggest taking multiple close-up photos of sections
              of the written piece to capture high enough quality to read the
              digital copy. If the memento is a photo, we recommend avoiding
              direct overhead light that may cause a glare on the photo.
            </Typography>
          </Box>
          <Box
            sx={{
              pb: "30px",
            }}
          >
            <Typography variant="subtitle2">
              How will I know if someone requests more information on one of my
              uploaded mementos?
            </Typography>
            <Typography style={{fontSize: 14}} variant="h5">
              You will receive an email notifying you of the request to the
              email address you signed up with.
            </Typography>
          </Box>
        </Box>
      </Box>

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
