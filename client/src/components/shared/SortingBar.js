import * as React from "react";

import { Container, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const SortingBar = ({ sort, setSort }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <ToggleButtonGroup
        value={sort}
        exclusive
        onChange={setSort}
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
      <Button>Invite someone to this capsule</Button>
    </Box>
  );
};

export default SortingBar;
