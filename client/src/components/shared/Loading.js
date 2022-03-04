import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  "@keyframes hingeRight": {
    "0%": {
      transform: "rotate(0)",
      transformOrigin: "top right",
      animationTimingFunction: "ease-in-out",
    },
    "50%": {
      transform: "rotate(120deg) translateX(5px) translateY(-2px)",
      transformOrigin: "top right",
      animationTimingFunction: "ease-in-out",
    },
    "100%": {
      transform: "rotate(0)",
      transformOrigin: "top right",
      animationTimingFunction: "ease-in-out",
    },
  },
  "@keyframes hingeLeft": {
    "0%": {
      transform: "rotate(0)",
      transformOrigin: "top left",
      animationTimingFunction: "ease-in-out",
    },
    "50%": {
      transform: "rotate(-120deg) translateX(-5px) translateY(-2px)",
      transformOrigin: "top left",
      animationTimingFunction: "ease-in-out",
    },
    "100%": {
      transform: "rotate(0)",
      transformOrigin: "top left",
      animationTimingFunction: "ease-in-out",
    },
  },
  hingeRight: {
    animation: "$hingeRight 6s ease-in-out",
    animationFillMode: "forwards",
    animationIterationCount: "infinite",
  },
  hingeLeft: {
    animation: "$hingeLeft 6s ease-in-out",
    animationFillMode: "forwards",
    animationIterationCount: "infinite",
  },
});

const Loading = () => {
  const styles = useStyles();
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#9567E0",
          height: "60px",
          width: "10px",
          position: "absolute",
          top: 100,
          left: "55%",
        }}
        className={"Left"}
      />
      <Box
        sx={{
          backgroundColor: "#9567E0",
          height: "60px",
          width: "10px",
          top: 100,
          left: "45%",
          position: "absolute",
        }}
        className={"Right"}
      />
      <Box
        sx={{
          backgroundColor: "#9567E0",
          height: "10px",
          width: "10%",
          top: 150,
          left: "45%",
          position: "absolute",
        }}
        className={"Bottom"}
      />
      <Box
        sx={{
          backgroundColor: "#9567E0",
          height: "10px",
          width: "5%",
          top: 100,
          left: "45%",
          position: "absolute",
        }}
        className={styles.hingeLeft}
      />
      <Box
        sx={{
          backgroundColor: "#9567E0",
          height: "10px",
          width: "5%",
          top: 100,
          left: "51%",
          position: "absolute",
        }}
        className={styles.hingeRight}
      />
    </Box>
  );
};

export default Loading;
