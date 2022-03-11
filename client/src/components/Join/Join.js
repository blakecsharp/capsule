import * as React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import { Box, Typograph, Button, Typography } from "@mui/material";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { JOIN_CAPSULE } from "../../requests";
import { useMutation } from "@apollo/client";

import NavigationBar from "../shared/NavigationBar";
import CustomButton from "../shared/Button";
import TextInput from "../shared/TextInput";
import EditIcon from "@mui/icons-material/Edit";

const Join = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const [capsuleId, setCapsuleId] = React.useState("");
  const [joinError, setJoinError] = React.useState("");

  const [joinCapsule] = useMutation(JOIN_CAPSULE);

  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  const handleJoin = async () => {
    await joinCapsule({
      variables: {
        capsuleId: capsuleId,
        userId: user.uid,
      },
    }).then((response) => {
      console.log(response);
      if (response.data.JoinCapsule.error) {
        setJoinError(response.data.JoinCapsule.error);
        return;
      }
      navigate("/home");
    });
  };

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
          mt: "20px",
        }}
      >
        <TextInput
          value={capsuleId}
          handleChange={(e) => {
            setCapsuleId(e.target.value);
          }}
          placeholder="ID of capsule to join"
          id="title-input"
          type="string"
          style={{ mb: "10px", width: "100%" }}
          border="#9567E0"

          adornment={<EditIcon sx={{ color: "black", pr: 3 }} />}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: "20px",
          width: "56.5%"
        }}
      >
        <Button
          disableElevation
          onClick={() => {
            navigate("/home");
          }}
          sx={{
            border: 1,
            borderRadius: "10px",
          }}
          isLoggedIn
        >
          Back to home
        </Button>
      

        <CustomButton
          onClick={() => {
            handleJoin();
          }}
          text="Join Capsule"
          isLoggedIn
        />
      </Box>
      <Typography variant="subtitle1">{joinError}</Typography>
    </Container>
  );
};

export default Join;
