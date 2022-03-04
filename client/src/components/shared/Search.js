import * as React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextInput from "./TextInput";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ toSearch }) => {
  const [searchContent, setSearchContent] = React.useState("");
  const [displayContent, setDisplayContent] = React.useState();
  return (
    <Box>
      <TextInput
        value={searchContent}
        handleChange={(e) => {
          setSearchContent(e.target.values);
        }}
        placeholder="Search"
        id="search"
        adornment={<SearchIcon sx={{ color: "purple", mr: 3 }} />}
        style={{ mb: "10px", width: "100%" }}
      />
    </Box>
  );
};

export default Search;
