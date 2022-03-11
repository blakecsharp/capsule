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

    <div style={{display: "flex", flexDirection: "row", alignItems: "center", alignSelf: "center", marginTop: "20px", marginBottom: "10px"}}>
    
  
      <div style={{alignSelf: "left", marginRight: "auto", justifyContent: "flex-start"}}>
      <ToggleButtonGroup
        value={sort}
        exclusive
        onChange={(e) => {
          setSort(e.target.value);
        }}
        aria-label="sorting"
        sx={{

          height: "38px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ToggleButton value="all" aria-label="all">
          All mementos
        </ToggleButton>
        <ToggleButton value="mementoType" aria-label="mementoType">
          By memento type
        </ToggleButton>
      </ToggleButtonGroup>
      </div>
      
      <div style={{alignSelf: "right", marginLeft: "auto", justifyContent: "flex-end"}}>
      <Button
        style={{
          justifySelf: "flex-end",
          alignSelf: "flex-end",
          marginLeft: "auto", 
          marginRight: "0px"
        }}
        sx={{
          width: "100%",
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
    
    
    </div>
  );
};

export default SortingBar;
