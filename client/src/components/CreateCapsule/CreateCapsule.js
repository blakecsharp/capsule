import * as React from "react";
import { CREATE_CAPSULE } from "../../requests";
import { useMutation } from "@apollo/client";
import { Container } from "@mui/material";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import TextInput from "../shared/TextInput";

const CreateCapsule = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [values, setValues] = React.useState({
    title: "",
  });
  const [createCapsule, { data, loading, error }] = useMutation(CREATE_CAPSULE);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCreate = () => () => {
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
        backgroundColor: "#9567e0",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "60%",
          maxWidth: "800px",
        }}
      >
        <TextInput
          value={values.title}
          handleChange={handleChange("title")}
          placeholder="Name of your new Capsule"
          id="title-input"
          type="string"
        />
        <Button variant="contained" disableElevation onClick={handleCreate()}>
          Create Capsule
        </Button>
      </Box>
    </Container>
  );
};

export default CreateCapsule;
