import * as React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import firebase from "firebase/app";
import { storage } from "../../AuthContext";
import "firebase/storage";

import UploadIcon from "@mui/icons-material/Upload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { TabletView, isBrowser, isTablet } from "react-device-detect";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";

const StepTwo = ({
  values,
  handleChange,
  handlePreviewImages,
  imageFiles,
  setImageFiles,
  handledCapturedMedia,
}) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [inUpload, setInUpload] = React.useState(false);
  const [inCapture, setInCapture] = React.useState(false);
  const [isIpad, setIsiPad] = React.useState(false);

  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);

  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [mode, setMode] = React.useState("photo");

  if (isTablet) {
    setIsiPad(true);
  }

  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  const handleMode = (event, mode) => {
    setMode(mode);
  };

  /*
  const upload = async () => {
    // const storage = getStorage();

    console.log(images);
    console.log(typeof images);

    
    const storageRef = ref(
      storage,
      `/images/${values.title}/${images.name}.png`
    );
    const metadata = {
      contentType: images.type,
    };
    const uploadTask = await uploadBytes(storageRef, images, metadata);
    console.log(uploadTask);

    e) => {
              // const img = e.target.files[0];
              // const image = URL.createObjectURL(img);
              // console.log(image);
              console.log(e.target.files[0]);
              let imagesUploaded = images;
              imagesUploaded.push(e.target.files[0]);
              setImages(imagesUploaded);

              let previewImageURLs = previewImages;
              const prevImage = URL.createObjectURL(e.target.files[0]);
              previewImageURLs.push(prevImage);
              console.log(prevImage);
              setPreviewImages(previewImageURLs);
            }
    
  };
  */

  const updateImages = () => {
    console.log(imageFiles);
    let previewImageURLs = [];
    for (var i = 0; i < imageFiles.length; i++) {
      let prevImage = URL.createObjectURL(imageFiles[i]);
      previewImageURLs.push(prevImage);
    }
    handlePreviewImages(previewImageURLs);
  };

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    handledCapturedMedia(imageSrc);
  }, [webcamRef]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      console.log(url);
      handledCapturedMedia(url);
      // window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);

  return (
    <Container maxWidth={false} disableGutters sx={{}}>
      <Typography sx={{ mb: "20px" }}>Add a photo or video</Typography>

      {!inUpload && !inCapture && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "80vw",
            justifyContent: "center",
            alignItems: "center",
            mb: "50px",
          }}
        >
          <Box
            sx={{
              border: 1,
              borderColor: "black",
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
              setInUpload(true);
            }}
          >
            <UploadIcon sx={{ height: "50px", width: "50px" }} />
            Upload
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: "black",
              borderRadius: "10px",
              justifyContent: "center",
              alignItems: "center",
              width: "40%",
              height: "10vh",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              setInCapture(true);
            }}
          >
            <CameraAltIcon sx={{ height: "50px", width: "50px" }} />
            Capture
          </Box>
        </Box>
      )}
      {inUpload && !inCapture && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80vw",
            justifyContent: "center",
            alignItems: "center",
            mb: "50px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <input
              type="file"
              multiple
              onChange={(e) => {
                if (imageFiles) {
                  setImageFiles([...imageFiles, e.target.files[0]]);
                } else {
                  setImageFiles([e.target.files[0]]);
                }
              }}
            />
            <Button onClick={updateImages}> Add Image </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {values.previewImages &&
              values.previewImages.map((item, index) => (
                <Box
                  key={index}
                  component="img"
                  sx={{
                    maxWidth: "300px",
                    maxHeight: "500px",
                  }}
                  alt={`Image${index}`}
                  src={item}
                />
              ))}
          </Box>
          <Button
            onClick={() => {
              setInUpload(false);
              setInCapture(false);
            }}
          >
            Back to media selection
          </Button>
        </Box>
      )}

      {!inUpload && inCapture && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80vw",
            justifyContent: "center",
            alignItems: "center",
            mb: "50px",
          }}
        >
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleMode}
            aria-label="media-mode"
            sx={{
              mb: "20px",
            }}
          >
            <ToggleButton value="photo" aria-label="photo">
              Photo
            </ToggleButton>
            <ToggleButton value="video" aria-label="photo">
              Video
            </ToggleButton>
          </ToggleButtonGroup>
          <Webcam audio={false} ref={webcamRef} />
          {mode === "photo" && <Button onClick={capture}>Capture photo</Button>}
          {mode === "video" && capturing && (
            <Button onClick={handleStopCaptureClick}>Stop Capture</Button>
          )}
          {mode === "video" && !capturing && (
            <Button onClick={handleStartCaptureClick}>Start Capture</Button>
          )}
          {recordedChunks.length > 0 && (
            <Button onClick={handleDownload}>See Video</Button>
          )}

          {values.capturedMedia && (
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt={`CapturedImage`}
              src={values.capturedMedia}
            />
          )}

          <Button
            onClick={() => {
              setInUpload(false);
              setInCapture(false);
            }}
          >
            Back to media selection
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default StepTwo;