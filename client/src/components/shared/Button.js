import * as React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CustomButton = ({ onClick, text, disabled, style, isLoggedIn }) => {
  return (
    <Button
      disableElevation
      disabled={disabled}
      sx={{
        ...style,
        backgroundImage: isLoggedIn
          ? "linear-gradient(to right, #9567E0, #B64FE7)"
          : "white",
        borderRadius: "10px",
        border: 0,
        borderWidth: 0,
        color: "white",
        p: "10px",
        pr: "20px",
        pl: "20px",
      }}
      onClick={onClick}
    >
      <Typography style={{fontSize: "14px"}}>{text}</Typography>
    </Button>
  );
};

export default CustomButton;
