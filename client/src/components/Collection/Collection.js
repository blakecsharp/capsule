import * as React from "react";
import { Container } from "@mui/material";

import NavigationBar from "../shared/NavigationBar";

const Collection = () => {
  console.log(window.user);
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ backgroundColor: "#9567e0" }}
    >
      <NavigationBar />
      Hey
    </Container>
  );
};

export default Collection;
