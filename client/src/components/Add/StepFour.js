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
        <TimelineOppositeContent
          sx={{
            flex: 0.5,
          }}
        />
        <TimelineSeparator>
          {i == 0 ? <TimelineConnector /> : null}
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 25,
          }}
        >
          {values.textMemories[i]}
        </TimelineContent>
      </TimelineItem>
    );
  }

  for (var i = 0; i < values.audioURLs.length; i++) {
    memories.push(
      <TimelineItem>
        <TimelineOppositeContent
          sx={{
            flex: 0.5,
          }}
        />
        <TimelineSeparator>
          {i == 0 && values.textMemories.length == 0 ? (
            <TimelineConnector />
          ) : null}
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 25,
          }}
        >
          <audio key={i} src={values.audioURLs[i]} controls="controls" />
        </TimelineContent>
      </TimelineItem>
    );
  }

  memories.push(
    <TimelineItem style={{position: 'absolute', right: '66px', top: '221px'}}>
      <TimelineOppositeContent
        sx={{
          flex: 0.5,
        }}
      />
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent >
        <Typography>Add another memory</Typography>
        <Box  sx={{ display: "flex", flexDirection: "row" }}>
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
      <Typography variant="h2" sx={{ mb: "20px" }}>
        {values.title}
      </Typography>
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
          <Typography variant="h4">Date: </Typography>{" "}
          <Typography variant="subtitle1">{values.date}</Typography>
          <Typography variant="h4">Location: </Typography>
          <Typography variant="subtitle1">{values.location}</Typography>
        </Box>
        <Box style={{position: 'absolute', top: '120px', right: '150px'}}>
        <Typography variant="subtitle2" sx={{ mb: "30px" }}>
          MEMORY LANE
        </Typography>
        <Timeline>{memories}</Timeline>
      </Box>
      </Box>
      
    </Container>
  );
};

export default StepFour;
