import React, { memo, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Box } from "@mui/material";

import NavigationBar from "../shared/NavigationBar";
import { ADD_ITEM } from "../../requests";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";

import Breadcrumb from "./Breadcrumb";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  // const { capsuleId } = route.params;

  const [addItem] = useMutation(ADD_ITEM);
  const [imageFiles, setImageFiles] = React.useState([]);
  const [values, setValues] = React.useState({
    title: "",
    mementoType: "",
    date: "",
    location: "",
    currentTextMemory: "",
    textMemories: [],
    textMemoryIndex: -1,
    files: [],
    previewImages: [],
    capturedMedia: "",
    audioBlobs: [],
    audioURLs: [],
    audioMemoryIndex: -1,
  });

  console.log(values);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handlePreviewImages = (images) => {
    setValues({
      ...values,
      previewImages: images,
    });
  };

  const handledCapturedMedia = (media) => {
    setValues({
      ...values,
      capturedMedia: media,
    });
  };

  const handleTextMemory = () => {
    let memories = values.textMemories;
    if (memories) {
      memories.push(values.currentTextMemory);
    } else {
      memories = [values.currentTextMemory];
    }

    let newIndex = values.textMemoryIndex + 1;
    setValues({
      ...values,
      textMemories: memories,
      textMemoryIndex: newIndex,
    });
  };

  const clearCurrentTextMemory = () => {
    setValues({
      ...values,
      currentTextMemory: "",
    });
  };

  const handleAudio = (audio, url) => {
    setValues({
      ...values,
      audioBlobs: [...values.audioBlobs, audio],
      audioMemoryIndex: values.audioMemoryIndex + 1,
      audioURLs: [...values.audioURLs, url],
    });
  };

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }
    const storage = getStorage();

    var firebaseImages = [];

    console.log(imageFiles);

    for (var i = 0; i < imageFiles.length; i++) {
      const imagePath = `/images/${values.title}/${imageFiles[i].name}`;
      const storageRef = ref(storage, imagePath);
      const metadata = {
        contentType: imageFiles[i].type,
      };
      const uploadTask = await uploadBytes(storageRef, imageFiles[i], metadata);
      const url = await getDownloadURL(ref(storage, imagePath));
      firebaseImages.push(url);
    }
    if (values.capturedMedia) {
      const imagePath = `/images/${values.title}/capturedImage${Math.floor(
        Math.random() * 256
      )}`;
      const storageRef = ref(storage, imagePath);

      const encodedString = btoa(values.capturedMedia);

      const uploadTask = await uploadString(
        storageRef,
        encodedString,
        "base64"
      );
      const url = await getDownloadURL(ref(storage, imagePath));
      firebaseImages.push(url);
    }
    var audioBlobURLs = [];
    if (values.audioBlobs) {
      for (var i = 0; i < values.audioBlobs.length; i++) {
        const audioPath = `/audio/${values.title}/audioMemory${Math.floor(
          Math.random() * 256
        )}`;
        const storageRef = ref(storage, audioPath);
        const metadata = {
          contentType: values.audioBlobs[i].type,
        };
        const uploadTask = await uploadBytes(
          storageRef,
          values.audioBlobs[i],
          metadata
        );
        const url = await getDownloadURL(ref(storage, audioPath));
        audioBlobURLs.push(url);
      }
    }

    // GET CAPSULE ID
    addItem({
      variables: {
        uploadedBy: user.uid,
        location: values.location,
        title: values.title,
        mementoType: values.mementoType,
        date: values.date,
        textMemories: values.textMemories,
        images: firebaseImages,
        audio: audioBlobURLs,
        capsuleId: location.state.capsuleId,
      },
    }).then((response) => {
      if (response) {
        setShowConfirmation(true);
      }
    });
  };

  const handleBack = async () => {
    if (currentStep > -1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: "#ffffff",
        height: "100vh",
        width: "100vw",
        ml: "20px",
        mr: "20px",
      }}
    >
      <NavigationBar isLoggedIn={true} />
      {!showConfirmation && (
        <Box sx={{ ml: "8vw", mr: "8vw" }}>
          {currentStep == 0 ? (
            <StepOne values={values} handleChange={handleChange} />
          ) : currentStep == 1 ? (
            <StepTwo
              values={values}
              handleChange={handleChange}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              handlePreviewImages={handlePreviewImages}
              handledCapturedMedia={handledCapturedMedia}
            />
          ) : currentStep == 2 ? (
            <StepThree
              values={values}
              handleChange={handleChange}
              handleTextMemory={handleTextMemory}
              handleAudio={handleAudio}
            />
          ) : currentStep == 3 ? (
            <StepFour
              values={values}
              handleChange={handleChange}
              setCurrentStep={setCurrentStep}
              clearCurrentTextMemory={clearCurrentTextMemory}
            />
          ) : (
            <Typography> Oops something went wrong </Typography>
          )}
          <Box
            sx={{
              width: "100%",
              bottom: "0",
              mb: "5vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                onClick={handleBack}
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                Back
              </Button>

              <Button
                variant="contained"
                disableElevation
                onClick={handleNext}
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                {currentStep != 3 ? "Next" : "Done"}
              </Button>
            </Box>
            <Breadcrumb currentStep={currentStep} />
          </Box>
        </Box>
      )}
      {showConfirmation && (
        <Box
          sx={{
            mb: "5vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: "20px",
          }}
        >
          <Typography>Item successfully added to your capsule.</Typography>
          <Button
            onClick={() => {
              navigate("/home");
            }}
          >
            Return to the home screen
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Add;
