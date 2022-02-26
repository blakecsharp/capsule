import * as React from "react";

import TextField from "@mui/material/TextField";

const TextInput = ({
  value,
  handleChange,
  placeholder,
  id,
  type,
  adornment,
  multiline,
  rows,
  maxRows,
  border,
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
      multiline={multiline ? multiline : false}
      rows={multiline ? rows : 1}
      maxRows={multiline ? maxRows : 1}
      sx={{
        m: 1,
        width: "100%",

        "& .MuiOutlinedInput-root:hover": {
          "& > fieldset": {
            borderColor: border ? border : "white",
          },
        },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": {
            borderColor: border ? border : "white",
            color: "white",
          },
        },
        "& .MuiOutlinedInput-root:focused": {
          "& > fieldset": {
            borderColor: border ? border : "white",
          },
        },
        "& .MuiOutlinedInput-root:active": {
          "& > fieldset": {
            borderColor: border ? border : "white",
            color: border ? border : "white",
          },
        },
      }}
    />
  );
};

export default TextInput;
