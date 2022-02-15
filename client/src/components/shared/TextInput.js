import * as React from "react";

import TextField from "@mui/material/TextField";

const TextInput = ({
  value,
  handleChange,
  placeholder,
  id,
  type,
  adornment,
}) => {
  return (
    <TextField
      id={id}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      InputProps={{
        startAdornment: adornment,
      }}
      sx={{
        m: 1,
        width: "100%",

        "& .MuiOutlinedInput-root:hover": {
          "& > fieldset": {
            borderColor: "white",
          },
        },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": {
            borderColor: "white",
            color: "white",
          },
        },
        "& .MuiOutlinedInput-root:focused": {
          "& > fieldset": {
            borderColor: "white",
          },
        },
        "& .MuiOutlinedInput-root:active": {
          "& > fieldset": {
            borderColor: "white",
            color: "white",
          },
        },
      }}
    />
  );
};

export default TextInput;
