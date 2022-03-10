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
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextInput from "../shared/TextInput";

import NavigationBar from "../shared/NavigationBar";
import { GET_ITEM } from "../../requests";
import CustomButton from "../shared/Button";

/*
    Get family members associated with the account
*/

const Request = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [member, setMember] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showConfirmation, setShowConfirmation] = React.useState(false);

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
                Current location of the memento:
              </Typography>
              <Typography variant="subtitle1">
                {data.response.location}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      {!showConfirmation && (
        <Box
          sx={{
            ml: "100px",
            mr: "100px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl
            sx={{
              width: "50%",
              mb: "20px",
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={member}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value={"Mary"}>Mary</MenuItem>
              <MenuItem value={"Joe"}>Joe</MenuItem>
              <MenuItem value={"Sue"}>Sue</MenuItem>
              <MenuItem value={"Jill"}>Jill</MenuItem>
            </Select>
            <FormHelperText>Request more information from</FormHelperText>
          </FormControl>

          <Typography>Add a note to your request</Typography>
          <TextInput
            multiline
            rows={4}
            value={message}
            handleChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Type here"
            id="memory-input"
            type="string"
            border="#9567E0"
            style={{
              mb: "20px",
              width: "50%",
            }}
          />
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
              disabled={message == "" ? true : false}
              onClick={() => {
                if (member && message) {
                  setShowConfirmation(true);
                } else {
                  setErrorMessage(
                    "You must pick a family member and add a note"
                  );
                }
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
      )}
      {showConfirmation && (
        <Box
          sx={{
            ml: "100px",
            mr: "100px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>
            An email to {member} requesting more information on{" "}
            {data.response.title} has been sent.
          </Typography>

          <Typography>Note: {message}</Typography>

          <Button
            disableElevation
            onClick={() => {
              navigate("/item", {
                state: {
                  itemId: location.state.itemId,
                },
              });
            }}
            sx={{
              border: 1,
              borderRadius: "10px",
              width: "25%",
              mt: "20px",
            }}
            isLoggedIn
          >
            Back to your item
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Request;
