import * as React from "react";
import { CREATE_CAPSULE } from "../../requests";
import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import NavigationBar from "../shared/NavigationBar";
import EditIcon from "@mui/icons-material/Edit";

import TextInput from "../shared/TextInput";
import CustomButton from "../shared/Button";

const CreateCapsule = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  const [values, setValues] = React.useState({
    title: "",
  });
  const [createCapsule] = useMutation(CREATE_CAPSULE);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCreate = () => {
    createCapsule({
      variables: {
        createdById: user.uid,
        title: values.title,
      },
    });
    navigate("/home");
  };
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: "#ffffff",
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
          value={values.title}
          handleChange={handleChange("title")}
          placeholder="Name of your new capsule"
          id="title-input"
          type="string"
          adornment={<EditIcon sx={{ color: "black", pr: 3 }} />}
          style={{ mb: "10px", width: "100%" }}
          border="#9567E0"
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: "20px",
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
            onClick={handleCreate}
            text="Create Capsule"
            isLoggedIn
          />
        </Box>
      </Box>
    </Container>
  );
};

export default CreateCapsule;
