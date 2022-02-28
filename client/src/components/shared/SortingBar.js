import * as React from "react";

import { Container, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const SortingBar = ({ sort, setSort, capsuleId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "flex-end",
      }}
    >
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
      <Button
        sx={{
          border: 1,
          borderColor: "#9567E0",
        }}
        onClick={() => {
          navigate("/join", {
            state: {
              capsuleId: capsuleId,
            },
          });
        }}
      >
        Invite someone to this capsule
      </Button>
    </Box>
  );
};

export default SortingBar;
