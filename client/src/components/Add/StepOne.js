import * as React from "react";
import { Container, Typography, Box } from "@mui/material";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextInput from "../shared/TextInput";

const MementoTypes = [
  "Photograph",
  "Clothing",
  "Furniture",
  "Art",
  "Recipes",
  "Letters and Diaries",
  "Children's toys",
  "Other",
];

const StepOne = ({ values, handleChange }) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  return (
    <Container maxWidth={false} disableGutters>
      <Typography sx={{ mb: "20px" }}>Add a memento</Typography>
      <Box sx={{ width: "60%", maxWidth: "800px" }}>
        <Typography>Give your memento a name:</Typography>
        <TextInput
          value={values.title}
          handleChange={handleChange("title")}
          placeholder="ex: My Journal"
          id="title-input"
          type="string"
          border="black"
          adornment={<EditIcon sx={{ color: "white", pr: 3 }} />}
        />
      </Box>
      <Box>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Memento Type
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={values.mementoType}
            onChange={handleChange("mementoType")}
          >
            {MementoTypes.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item}
                control={<Radio />}
                label={item}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Container>
  );
};

export default StepOne;