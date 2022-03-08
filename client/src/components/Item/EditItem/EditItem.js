import * as React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useMutation } from "@apollo/client";

import TextInput from "../../shared/TextInput";
import EditIcon from "@mui/icons-material/Edit";
import TextsmsIcon from "@mui/icons-material/Textsms";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CustomButton from "../../shared/Button";
import { EDIT_ITEM } from "../../../requests";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditItem = ({
  audio,
  isRecording,
  setIsRecording,
  title,
  itemId,
  setShowAddTextOrAudio,
  uploadBy,
}) => {
  const [inType, setInType] = React.useState(false);
  const [inRecord, setInRecord] = React.useState(false);
  const [textMemory, setTextMemory] = React.useState("");
  const [editItem] = useMutation(EDIT_ITEM);

  const start = () => {
    setIsRecording(true);
  };

  const stop = () => {
    setIsRecording(false);
  };

  const handleUpdateItem = async () => {
    var audioURL = "";
    if (Object.keys(audio).length != 0) {
      const storage = getStorage();
      const relPath = `/audio/${title}/audioMemory${Math.floor(
        Math.random() * 256
      )}`;
      const storageRef = ref(storage, relPath);
      const metadata = {
        contentType: audio.blob.type,
      };
      const uploadTask = await uploadBytes(storageRef, audio.blob, metadata);
      audioURL = await getDownloadURL(ref(storage, relPath));
    }

    editItem({
      variables: {
        itemId: itemId,
        addedBy: uploadBy,
        textMemory: textMemory,
        audio: audioURL,
      },
    }).then((response) => {
      if (response) {
        setShowAddTextOrAudio(false);
      }
    });
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ mb: "40px" }}>
      {!inType && !inRecord && (
        <Box
          sx={{
            mt: "30px",
          }}
        >
          <Typography variant="h3">Add a memory</Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "80vw",
              justifyContent: "center",
              alignItems: "center",
              mt: "20px",
              mb: "20px",
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
                height: "10vh",
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
                height: "10vh",
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

          <audio src={audio.url} controls="controls" />
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
              value={textMemory}
              handleChange={(e) => {
                setTextMemory(e.target.value);
              }}
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
        </Box>
      )}
      {inRecord && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: "10px",
          }}
        >
          <Button
            onClick={() => {
              setInType(false);
              setInRecord(false);
            }}
          >
            Back to text and audio selection
          </Button>
          <CustomButton
            onClick={() => {
              handleUpdateItem();
            }}
            text="Add memory"
            isLoggedIn
          />
        </Box>
      )}
      {inType && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: "10px",
          }}
        >
          <Button
            onClick={() => {
              setInType(false);
              setInRecord(false);
            }}
          >
            Back to text and audio selection
          </Button>
          <CustomButton
            onClick={() => {
              handleUpdateItem();
            }}
            text="Add memory"
            isLoggedIn
          />
        </Box>
      )}
    </Container>
  );
};

export default EditItem;
