import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIosRounded";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TextsmsIcon from "@mui/icons-material/Textsms";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import ShortcutIcon from "@mui/icons-material/ShortcutRounded";
import CustomButton from "../shared/Button";

import NavigationBar from "../shared/NavigationBar";
import Loading from "../shared/Loading";
import { GET_ITEM, DELETE_ITEM } from "../../requests";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";

const Item = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  const {
    loading: dataLoading,
    error: dataError,
    data,
  } = useQuery(GET_ITEM, {
    variables: {
      itemId: location.state.itemId,
    },
  });

  const [deleteItem] = useMutation(DELETE_ITEM);

  if (dataLoading) {
    return <Loading />;
  }

  const memories = [];

  if (data) {
    for (var i = 0; i < data.response.memories.length; i++) {
      memories.push(
        <TimelineItem>
          <TimelineOppositeContent
            sx={{
              flex: 0.5,
            }}
          />
          <TimelineSeparator>
            {i == 0 ? (
              <TimelineConnector
                sx={{ width: "1px", backgroundColor: "#9567E0" }}
              />
            ) : null}
            <TimelineDot sx={{ width: "1px", backgroundColor: "#9567E0" }} />
            <TimelineConnector
              sx={{ width: "1px", backgroundColor: "#9567E0" }}
            />
          </TimelineSeparator>
          <TimelineContent
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 25,
            }}
          >
            {data.response.memories[i].typeOfMemory == "TEXT" ? (
              <Typography>{data.response.memories[i].text}</Typography>
            ) : (
              <audio
                key={i}
                src={data.response.memories[i].audio}
                controls="controls"
              />
            )}
          </TimelineContent>
        </TimelineItem>
      );
    }
  }

  memories.push(
    <TimelineItem>
      <TimelineOppositeContent
        sx={{
          flex: 0.5,
        }}
      />
      <TimelineSeparator>
        <TimelineDot sx={{ width: "1px", backgroundColor: "#9567E0" }} />
        <TimelineConnector sx={{ width: "1px", backgroundColor: "#9567E0" }} />
      </TimelineSeparator>
      <TimelineContent sx={{ flex: 25 }}>
        Add another memory
        <Box sx={{ display: "flex", flexDirection: "row", mt: "10px" }}>
          <Box
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
              width: "200px",
            }}
            onClick={() => {}}
          >
            <Typography variant="subtitle1" color="black">
              Type or Record
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextsmsIcon
                sx={{
                  mr: "10px",
                  width: "36px",
                  height: "36px",
                  color: "#9567E0",
                }}
              />
              <KeyboardVoiceIcon
                sx={{ width: "36px", height: "36px", color: "#9567E0" }}
              />
            </Box>
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
              borderColor: "#9567E0",
              p: "10px",
              width: "100px",
            }}
            onClick={() => {
              navigate("/request", {
                state: {
                  capsuleId: location.state.capsuleId,
                  itemId: location.state.itemId,
                },
              });
            }}
          >
            <Typography color="black" variant="subtitle1">
              Request
            </Typography>

            <ShortcutIcon
              sx={{ width: "36px", height: "36px", color: "#9567E0" }}
            />
          </Box>
        </Box>
      </TimelineContent>
    </TimelineItem>
  );

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: "#ffffff",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavigationBar isLoggedIn />
      {data && (
        <Box sx={{ ml: "100px", mr: "100px", mt: "50px" }}>
          <Typography variant="h2" sx={{ mb: "20px" }}>
            {data.response.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Card sx={{ maxWidth: 350 }}>
              <CardMedia
                component="img"
                height="300"
                image={
                  data.response.photos[imageIndex]
                    ? data.response.photos[imageIndex]
                    : null
                }
                alt="memento image"
              />
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {imageIndex != 0 ? (
                  <ArrowBackIosIcon
                    onClick={() => {
                      setImageIndex(imageIndex - 1);
                    }}
                  />
                ) : null}
                {imageIndex != data.response.photos.length - 1 ? (
                  <ArrowForwardIosIcon
                    sx={{ right: 0 }}
                    onClick={() => {
                      setImageIndex(imageIndex + 1);
                    }}
                  />
                ) : null}
              </CardActions>
            </Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: "50px",
              }}
            >
              <Typography variant="h4">Date </Typography>{" "}
              <Typography variant="subtitle1">{data.response.date}</Typography>
              <Typography variant="h4">
                Current location of the memento:{" "}
              </Typography>
              <Typography variant="subtitle1">
                {data.response.location}
              </Typography>
              {data.response.uploadedBy === user.uid && (
                <CustomButton
                  onClick={() => {
                    navigate("/recycle", {
                      state: {
                        itemId: location.state.itemId,
                      },
                    });
                  }}
                  text="Find a place to donate this memento"
                  isLoggedIn
                />
              )}
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: "30px" }}>
              MEMORY LANE
            </Typography>
            <Timeline align="left">{memories}</Timeline>
          </Box>
          {showConfirmDelete && (
            <Typography
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
              }}
              variant="subtitle1"
            >
              Are you sure?
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mr: "5vw",
            }}
          >
            <Button
              disableElevation
              onClick={() => {
                navigate("/capsule", {
                  state: {
                    capsuleId: location.state.capsuleId,
                  },
                });
              }}
              sx={{
                border: 1,
                borderRadius: "10px",
              }}
              isLoggedIn
            >
              Back
            </Button>
            {!showConfirmDelete && (
              <CustomButton
                onClick={() => {
                  setShowConfirmDelete(true);
                }}
                text="Delete Object"
                isLoggedIn
              />
            )}
            {showConfirmDelete && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  disableElevation
                  onClick={() => {
                    setShowConfirmDelete(false);
                  }}
                  sx={{
                    border: 1,
                    borderRadius: "10px",
                  }}
                  isLoggedIn
                >
                  No, keep this memento in my capsule.
                </Button>
                <CustomButton
                  onClick={() => {
                    deleteItem({
                      variables: {
                        itemId: location.state.itemId,
                      },
                    });
                    navigate("/capsule", {
                      state: {
                        capsuleId: location.state.capsuleId,
                      },
                    });
                  }}
                  text="Yes, delete this memento from my capsule"
                  isLoggedIn
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Item;
