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
import MementoTypes from "../../constants/constants";

const purple = "#9567e0";

const StepOne = ({ values, handleChange }) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  return (
    <Container maxWidth={false} disableGutters>
      <Typography variant="h2" sx={{ pt: "20px", mb: "20px" }}>
        Add a memento
      </Typography>
      <Box sx={{ width: "60%", maxWidth: "800px", borderRadius: "10px"}}>
        <Typography 
          style = {{
            fontSize: 20, 
            color: purple,
          }}
          sx={{ pt: "10px", pb: "10px"}}>
        
        Give your memento a name</Typography>
        
        <TextInput
          value={values.title}
          handleChange={handleChange("title")}
          placeholder="Name of your memento"
          id="title-input"
          type="string"
          adornment={<EditIcon sx={{ color: "#9567E0", pr: 3 }} />}
          style={{ mb: "10px", width: "100%" }}
          border="#9567E0"
          borderRadius="20"
        />
      </Box>
      <Box style={{height: "20px"}}></Box>
      <Box>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group"  
            style = {{
              fontSize: 20, 
              color: purple,
            }}
            sx={{ pt: "10px"}}>
            Select memento type
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={values.mementoType}
            onChange={handleChange("mementoType")}
            style = {{
              color: "black",
            }}
            sx={{ pb: "20px"}}
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
