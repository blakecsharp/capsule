import * as React from "react";
import { Container, Box, Button } from "@mui/material";

const purple = "#9567e0";

const Breadcrumb = ({ currentStep }) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 5
      }}
    >
      <Box
        sx={{
          height: "10px",
          width: "10px",
          borderRadius: "15px",
          borderColor: purple,
          border: 1,
          mr: 1,
          backgroundColor: currentStep == 0 ? purple : "None",
        }}
      />
      <Box
        sx={{
          height: "10px",
          width: "10px",
          borderRadius: "15px",
          borderColor: "white",
          border: 1,
          mr: 1,
          backgroundColor: currentStep == 1 ? purple : "None",
        }}
      />
      <Box
        sx={{
          height: "10px",
          width: "10px",
          borderRadius: "15px",
          borderColor: "white",
          border: 1,
          mr: 1,
          backgroundColor: currentStep == 2 ? purple: "None",
        }}
      />
      <Box
        sx={{
          height: "10px",
          width: "10px",
          borderRadius: "15px",
          borderColor: "white",
          border: 1,
          mr: 1,
          backgroundColor: currentStep == 3 ? purple : "None",
        }}
      />
    </Container>
  );
};

export default Breadcrumb;
