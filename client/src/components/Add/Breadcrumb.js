import * as React from "react";
import { Container, Box } from "@mui/material";

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
      }}
    >
      <Box
        sx={{
          height: "15px",
          width: "15px",
          borderRadius: "15px",
          borderColor: "white",
          border: 1,
          mr: 1,
          backgroundColor: currentStep == 0 ? "Black" : "None",
        }}
      />
      <Box
        sx={{
          height: "15px",
          width: "15px",
          borderRadius: "15px",
          borderColor: "white",
          border: 1,
          mr: 1,
          backgroundColor: currentStep == 1 ? "Black" : "None",
        }}
      />
      <Box
        sx={{
          height: "15px",
          width: "15px",
          borderRadius: "15px",
          borderColor: "white",
          border: 1,
          mr: 1,
          backgroundColor: currentStep == 2 ? "Black" : "None",
        }}
      />
      <Box
        sx={{
          height: "15px",
          width: "15px",
          borderRadius: "15px",
          borderColor: "white",
          border: 1,
          mr: 1,
          backgroundColor: currentStep == 3 ? "Black" : "None",
        }}
      />
    </Container>
  );
};

export default Breadcrumb;
