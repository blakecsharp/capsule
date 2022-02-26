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

const StepThree = ({ values, handleChange, handleTextMemory, handleAudio }) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [inType, setInType] = React.useState(false);
  const [inRecord, setInRecord] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [recorder, setRecorder] = React.useState(null);

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
      console.log(e.data);
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
          src={values.previewImages[0] ? values.previewImages[0] : null}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            ml: "20px",
          }}
        >
          <TextInput
            value={values.date}
            handleChange={handleChange("date")}
            placeholder="Date for the objet (if appropriate)"
            id="date-input"
            type="string"
            border="black"
            adornment={<EditIcon sx={{ color: "black", mr: 3 }} />}
          />
          <TextInput
            value={values.location}
            handleChange={handleChange("location")}
            placeholder="Location where the object currently is"
            id="location-input"
            type="string"
            border="black"
            adornment={<EditIcon sx={{ color: "black", mr: 3 }} />}
          />
        </Box>
      </Box>
      {!inType && !inRecord && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "80vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              border: 1,
              borderColor: "white",
              borderRadius: "10px",
              justifyContent: "center",
              alignItems: "center",
              width: "40%",
              height: "10vh",
              display: "flex",
              flexDirection: "column",
              mr: "20px",
            }}
            onClick={() => {
              setInType(true);
            }}
          >
            <TextsmsIcon sx={{ height: "50px", width: "50px" }} />
            Type
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: "white",
              borderRadius: "10px",
              justifyContent: "center",
              alignItems: "center",
              width: "40%",
              height: "10vh",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              setInRecord(true);
            }}
          >
            <KeyboardVoiceIcon sx={{ height: "50px", width: "50px" }} />
            Record
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
          <Box sx={{ width: "60%", maxWidth: "800px" }}>
            <TextInput
              multiline
              rows={4}
              value={values.currentTextMemory}
              handleChange={handleChange("currentTextMemory")}
              placeholder="Type here"
              id="memory-input"
              type="string"
              border="black"
            />
            <Button
              onClick={() => {
                handleTextMemory();
                setInType(true);
                setInRecord(false);
              }}
            >
              Save
            </Button>
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
