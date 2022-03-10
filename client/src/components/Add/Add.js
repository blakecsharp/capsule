import React, { memo, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import CustomButton from "../shared/Button";

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
  const [errorMessage, setErrorMessage] = React.useState();
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
      previewImages: [...values.previewImages, media],
    });
    setImageFiles([...imageFiles, media]);
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

  const validate = () => {
    if (currentStep == 0) {
      if (values.title === "") {
        return "Please give your memento a name.";
      }
      if (values.mementoType === "") {
        return "Please choose a memento category.";
      }
      return "";
    }
    if (currentStep == 1) {
      if (imageFiles.length == 0) {
        return "Please upload at least one image.";
      }
      return "";
    }
    if (currentStep == 2) {
      if (values.location === "") {
        return "Please add the memento's current location.";
      }
      if (values.currentTextMemory === "" && values.audioBlobs.length === 0) {
        return "Please add either a text or audio memory for the memento.";
      }
    }
  };

  const handleNext = async () => {
    let errorMessage = validate();
    setErrorMessage(errorMessage);
    if (errorMessage) {
      return;
    }
    if (currentStep == 2 && values.currentTextMemory != "") {
      handleTextMemory();
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }
    // setShowConfirmation(true);

    const storage = getStorage();

    var firebaseImages = [];

    for (var i = 0; i < imageFiles.length; i++) {
      if (typeof imageFiles[i] === "string") {
        const imagePath = `/images/${values.title}/capturedImage${Math.floor(
          Math.random() * 256
        )}.png`;
        const storageRef = ref(storage, imagePath);

        const uploadTask = await uploadString(
          storageRef,
          imageFiles[i],
          "data_url"
        );
        const url = await getDownloadURL(ref(storage, imagePath));
        firebaseImages.push(url);
      } else {
        const imagePath = `/images/${values.title}/${imageFiles[i].name}`;
        const storageRef = ref(storage, imagePath);
        const metadata = {
          contentType: imageFiles[i].type,
        };
        const uploadTask = await uploadBytes(
          storageRef,
          imageFiles[i],
          metadata
        );
        const url = await getDownloadURL(ref(storage, imagePath));
        firebaseImages.push(url);
      }
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
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: "#ffffff",
        width: "100vw",
        ml: "20px",
        mr: "20px",
      }}
    >
      <NavigationBar isLoggedIn={true} />
      {!showConfirmation && (
        <Box sx={{ ml: "8vw", mr: "8vw", height: "100%" }}>
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
            <Typography> Oops! Something went wrong </Typography>
          )}
          <Typography variant="h6"  sx={{
            fontWeight: 'bold',
            }}>{errorMessage} </Typography>
          <Box
            sx={{
              width: "100%",
              bottom: "0",
              mb: "5vh",
              position: "static",
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
              <CustomButton
                variant="contained"
                disableElevation
                onClick={handleBack}
                disabled={currentStep == 0 ? true : false}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                }}
                text="Back"
                isLoggedIn
              />

              <CustomButton
                variant="contained"
                onClick={handleNext}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                }}
                text={currentStep != 3 ? "Next" : "Done"}
                isLoggedIn
              />
            </Box>
            <Breadcrumb currentStep={currentStep} />

            <Button
              disableElevation
              onClick={() => {
                navigate("/home");
              }}
              sx={{
                border: 1,
                borderRadius: "10px",
                mt: "10px",
              }}
              isLoggedIn
            >
              Back to home
            </Button>
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
          <CustomButton
            onClick={() => {
              navigate("/home");
            }}
            text="Return to the home screen"
            isLoggedIn
          />
        </Box>
      )}
    </Container>
  );
};

export default Add;
