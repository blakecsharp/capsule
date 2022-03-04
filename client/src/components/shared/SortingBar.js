import * as React from "react";

import { Container, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const SortingBar = ({ sort, setSort, capsuleId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  return (

    <div style={{display: "flex"}}>
    
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "flex-end",
        maxWidth: "100vw",
      }}
    >
      <div style={{alignItems: "left"}}>
      <ToggleButtonGroup
        value={sort}
        exclusive
        onChange={(e) => {
          setSort(e.target.value);
        }}
        aria-label="sorting"
        sx={{
          mt: "20px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ToggleButton value="all" aria-label="all">
          All mementos
        </ToggleButton>
        <ToggleButton value="familyMmeber" aria-label="family">
          By family member
        </ToggleButton>
        <ToggleButton value="mementoType" aria-label="mementoType">
          By memento type
        </ToggleButton>
      </ToggleButtonGroup>
      </div>
      
      <div style={{alignSelf: "right", marginLeft: "auto", marginRight: parseInt(dimensions.width/5)}}>
      <Button
        sx={{
          height: "48px",
          border: 1,
          borderColor: "#9567E0",
          borderRadius: 2,
        }}
        onClick={() => {
          navigate("/invite", {
            state: {
              capsuleId: capsuleId,
            },
          });
        }}
      >
        Invite someone to this capsule
      </Button>
    </div>
    
    </Box>
    
    </div>
  );
};

export default SortingBar;
