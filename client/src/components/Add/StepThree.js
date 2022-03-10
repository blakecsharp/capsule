import * as React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import TextInput from "../shared/TextInput";
import EditIcon from "@mui/icons-material/Edit";
import TextsmsIcon from "@mui/icons-material/Textsms";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicRecorder from "mic-recorder-to-mp3";

const StepThree = ({ values, handleChange, handleAudio }) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [inType, setInType] = React.useState(false);
  const [inRecord, setInRecord] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [recorder, setRecorder] = React.useState(null);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
  }

  React.useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then((recorder) => {
          console.log("request!");
          setRecorder(recorder);
        }, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
      // recorder.getTracks().forEach((track) => track.stop());
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      let audioURL = URL.createObjectURL(e.data);
      handleAudio(e.data, audioURL);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const start = () => {
    setIsRecording(true);
  };

  const stop = () => {
    setIsRecording(false);
  };

  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <Container maxWidth={false} disableGutters sx={{ mb: "40px" }}>
      <Typography variant="h2" sx={{ mt: "7px", mb: "30px", fontWeight: 'bold' }}>
        {values.title}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          component="img"
          style = {{borderRadius: "15px"}}
          sx={{
            width: "13%",
            height: "13%",
          }}
          alt={`Image`}
          src={values.previewImages[0] ? values.previewImages[0] : null}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            ml: "20px",
          }}
        >
          <TextInput
            value={values.date}
            handleChange={handleChange("date")}
            placeholder="Date memento was acquired"
            id="date-input"
            type="string"
            border="#9567E0"
            adornment={<EditIcon sx={{ color: "#9567E0", mr: 3 }} />}
            style={{ mb: "20px" }}
          />
          <TextInput
            value={values.location}
            handleChange={handleChange("location")}
            placeholder="Location of the memento"
            id="location-input"
            type="string"
            border="#9567E0"
            adornment={<EditIcon sx={{ color: "#9567E0", mr: 3 }} />}
            style={{}}
          />
        </Box>
      </Box>
      {!inType && !inRecord && (
        <Box
          sx={{
            mt: "30px",
          }}
        >
          <Typography variant="h3" sx={{fontWeight: 'bold'}}>Add a memory about this memento</Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "80vw",
              justifyContent: "left",
              alignItems: "left",
              mt: "20px",
              mb: "10px",
            }}
          >
            <Box
              sx={{
                border: 1,
                borderColor: "#9567E0",
                borderRadius: "10px",
                justifyContent: "center",
                alignItems: "center",
                width: "40%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                mr: "20px",
              }}
              onClick={() => {
                setInType(true);
              }}
            >
              <TextsmsIcon
                sx={{ color: "#9567E0", height: "50px", width: "50px" }}
              />
              <Typography variant="subtitle2">Type</Typography>
            </Box>
            <Box
              sx={{
                border: 1,
                borderColor: "#9567E0",
                borderRadius: "10px",
                justifyContent: "center",
                alignItems: "center",
                width: "40%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => {
                setInRecord(true);
              }}
            >
              <KeyboardVoiceIcon
                sx={{ color: "#9567E0", height: "50px", width: "50px" }}
              />
              <Typography variant="subtitle2">Record</Typography>
            </Box>
          </Box>
        </Box>
      )}
      {!inType && inRecord && (
        <Box
          sx={{
            border: 1,
            borderColor: "white",
            borderRadius: "10px",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
            display: "flex",
            flexDirection: "column",
            mb: "20px",
          }}
        >
          <KeyboardVoiceIcon sx={{ height: "50px", width: "50px" }} />
          <Button onClick={start} disabled={isRecording}>
            Record
          </Button>
          <Button onClick={stop} disabled={!isRecording}>
            Stop
          </Button>
          {isRecording && (
            <Box
              sx={{
                height: "15px",
                width: "15px",
                borderRadius: "15px",
                border: 0,
                mr: 1,
                backgroundColor: "red",
              }}
            />
          )}
          <audio
            src={values.audioURLs[values.audioMemoryIndex]}
            controls="controls"
          />
        </Box>
      )}

      {inType && !inRecord && (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              mr: "0",
            }}
          >
            <TextInput
              multiline
              rows={4}
              value={values.currentTextMemory}
              handleChange={handleChange("currentTextMemory")}
              placeholder="Type here"
              id="memory-input"
              type="string"
              border="#9567E0"
              style={{
                mt: "10px",
                width: "100%",
              }}
            />
          </Box>
          <Button
            onClick={() => {
              setInType(false);
              setInRecord(false);
            }}
          >
            {" "}
            Back to text and audio selection{" "}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default StepThree;
