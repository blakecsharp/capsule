import * as React from "react";
import { Container, Typography, Box, IconButton } from "@mui/material";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TextsmsIcon from "@mui/icons-material/Textsms";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

/*
.MuiTimelineItem-missingOppositeContent:before { content: none }
*/

const StepFour = ({
  values,
  handleChange,
  setCurrentStep,
  clearCurrentTextMemory,
}) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const memories = [];
  for (var i = 0; i < values.textMemories.length; i++) {
    memories.push(
      <TimelineItem>
        <TimelineOppositeContent style={{ flex: "0.1" }} />
        <TimelineSeparator>
          {i == 0 ? <TimelineConnector /> : null}
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {values.textMemories[i]}
        </TimelineContent>
      </TimelineItem>
    );
  }

  console.log(values.audioBlobs[0]);

  for (var i = 0; i < values.audioURLs.length; i++) {
    memories.push(
      <TimelineItem>
        <TimelineOppositeContent style={{ flex: "0.1" }} />
        <TimelineSeparator>
          {i == 0 && values.textMemories.length == 0 ? (
            <TimelineConnector />
          ) : null}
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <audio key={i} src={values.audioURLs[i]} controls="controls" />
        </TimelineContent>
      </TimelineItem>
    );
  }

  memories.push(
    <TimelineItem>
      <TimelineOppositeContent style={{ flex: "0.1" }} />
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        Add another memory
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mr: "20px",
              justifyContent: "center",
              alignItems: "center",
              border: 1,
              borderRadius: "10px",
              p: "10px",
              width: "100px",
            }}
            onClick={() => {
              setCurrentStep(2);
              clearCurrentTextMemory();
            }}
          >
            Type
            <TextsmsIcon />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mr: "20px",
              justifyContent: "center",
              alignItems: "center",
              border: 1,
              borderRadius: "10px",
              p: "10px",
              width: "100px",
            }}
            onClick={() => {
              setCurrentStep(2);
            }}
          >
            Record
            <KeyboardVoiceIcon />
          </Box>
        </Box>
      </TimelineContent>
    </TimelineItem>
  );

  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  return (
    <Container maxWidth={false} disableGutters sx={{}}>
      <Typography sx={{ mb: "20px" }}>{values.title}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          component="img"
          sx={{
            width: "20%",
            height: "20%",
          }}
          alt={`Image`}
          src={values.previewImages[0]}
        />
        <Box sx={{ display: "flex", flexDirection: "column", ml: "30px" }}>
          <Typography>Date: </Typography>

          <Typography>{values.date}</Typography>

          <Typography>Location: </Typography>

          <Typography>{values.location}</Typography>
        </Box>
      </Box>
      <Box sx={{ mt: "30px" }}>
        <Typography sx={{ mb: "30px" }}>Memory Lane</Typography>

        <Timeline>{memories}</Timeline>
      </Box>
    </Container>
  );
};

export default StepFour;
