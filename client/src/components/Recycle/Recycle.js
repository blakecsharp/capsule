import * as React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import { Box, Button, Typography } from "@mui/material";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIosRounded";

import TextInput from "../shared/TextInput";

import NavigationBar from "../shared/NavigationBar";
import { GET_ITEM } from "../../requests";
import CustomButton from "../shared/Button";

/*
    Get family members associated with the account
*/

const Recycle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [member, setMember] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
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

  const handleChange = (event) => {
    setMember(event.target.value);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: "#ffffff",
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
                style={{borderRadius: "15px"}}
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
            </Box>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          ml: "100px",
          mr: "100px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            mb: "20px",
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: "10px" }}>
            Donation centers near you
          </Typography>
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1X6w3csR3qYLRH6h622Su-Pi_dQuRrb9Z&ehbc=2E312F"
            width="50%"
            height="480"
          ></iframe>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "50%",
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
              width: "25%",
            }}
            isLoggedIn
          >
            Back
          </Button>

          <CustomButton
            variant="contained"
            onClick={() => {
              navigate("/item", {
                state: {
                  itemId: location.state.itemId,
                },
              });
            }}
            style={{
              width: "25%",
              maxWidth: "400px",
            }}
            text={"Done"}
            isLoggedIn
          />
        </Box>
        <Typography>{errorMessage}</Typography>
      </Box>
    </Container>
  );
};

export default Recycle;
