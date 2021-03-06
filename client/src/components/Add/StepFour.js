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
        <TimelineSeparator >
          {i == 0 ? <TimelineConnector sx={{  backgroundColor: "#9567E0" }}/> : null}
          <TimelineDot sx={{  backgroundColor: "#9567E0" }}/>
          <TimelineConnector sx={{  backgroundColor: "#9567E0" }}/>
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
        <TimelineSeparator >
          {i == 0 && values.textMemories.length == 0 ? (
            <TimelineConnector sx={{  backgroundColor: "#9567E0" }}/>
          ) : null}
          <TimelineDot sx={{  backgroundColor: "#9567E0" }}/>
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
    <TimelineItem>
      <TimelineOppositeContent
        sx={{
          flex: 0.5,
          
        }}
      />

      <TimelineContent sx={{ml: '15px', fontWeight: 'bold'}}>
        <Typography sx={{mt: '10px', fontWeight: 'bold'}}>Add another memory</Typography>
        <Box  sx={{ display: "flex", flexDirection: "row", mt: 1}}>

          <Box
            style={{cursor:"pointer"}}
            sx={{
              display: "flex",
              flexDirection: "column",
              mr: "20px",
              justifyContent: "center",
              alignItems: "center",
              border: 1,
              borderRadius: "10px",
              borderColor: "#9567E0",
              p: "10px",
              width: "100px",
            }}
            onClick={() => {
              setCurrentStep(2);
              clearCurrentTextMemory();
            }}
          >
            <TextsmsIcon sx={{color: "#9567E0"}}/>
            Type
            
          </Box>
          <Box
            style={{cursor:"pointer"}}
            sx={{
              display: "flex",
              flexDirection: "column",
              mr: "20px",
              justifyContent: "center",
              alignItems: "center",
              border: 1,
              borderColor: "#9567E0",
              borderRadius: "10px",
              p: "10px",
              width: "100px",
            }}
            onClick={() => {
              setCurrentStep(2);
            }}
          >
            <KeyboardVoiceIcon sx={{color: "#9567E0"}}/>
            Record
            
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
      <Typography variant="h2" sx={{ fontWeight: 'bold', mb: "30px", mt: "7px" }}>
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
          <Typography fontSize="150%">Date: </Typography>{" "}
          <Typography fontSize="150%">{values.date}</Typography>
          <Typography fontSize="150%">Location: </Typography>
          <Typography fontSize="150%">{values.location}</Typography>
        </Box>
      <Box style={{marginLeft:"6.5%"}}>
        <Typography variant="h3" sx={{ ml: "20%", mb: "30px" }}>
          MEMORY LANE
        </Typography>
      <Timeline style={{justifyContent: "flex-start", marginTop: "-20px"}}>{memories}</Timeline>
      </Box>
      </Box>
    </Container>
  );
};

export default StepFour;
