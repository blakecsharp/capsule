import * as React from "react";
import { useQuery } from "@apollo/client";
import {
  Container,
  Box,
  Button,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { GET_CAPSULE } from "../../requests";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SortingBar from "../shared/SortingBar";
import MementoTypes from "../../constants/constants";
import CustomButton from "../shared/Button";

import NavigationBar from "../shared/NavigationBar";

const Capsule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const [sort, setSort] = React.useState("all");

  const {
    loading: dataLoading,
    error: dataError,
    data,
  } = useQuery(GET_CAPSULE, {
    variables: {
      capsuleId: location.state.capsuleId,
    },
  });

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
  });

  console.log(dimensions);

  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  return (
    <Container maxWidth={false} disableGutters sx={{}}>
      <NavigationBar isLoggedIn />
      <Box
        sx={{
          width: "100%",
          ml: "100px",
          mr: "100px",
        }}
      >
        <SortingBar
          sort={sort}
          setSort={setSort}
          capsuleId={location.state.capsuleId}
        />
        {sort === "all" && (
          <ImageList
            sx={{ width: "80vw" }}
            cols={parseInt((dimensions.width * 0.75) / 300)}
            rowHeight={500}
          >
            {data &&
              data.response.map((item, key) => (
                <ImageListItem
                  key={key}
                  sx={{
                    border: 1,
                    borderRadius: "15px",
                    borderColor: "#9567E0",
                    padding: "10px",
                    mr: "10px",
                    mb: "10px",
                    width: "300px",
                  }}
                  onClick={() => {
                    navigate("/item", {
                      state: {
                        itemId: item.id,
                        capsuleId: location.state.capsuleId,
                      },
                    });
                  }}
                >
                  <img src={item.photos[0]} alt={item.title} loading="lazy" />
                  <ImageListItemBar
                    position="below"
                    title={item.title}
                    actionIcon={
                      <ArrowForwardIosIcon sx={{ color: "#9567E0" }} />
                    }
                    sx={{
                      mt: "10px",
                      pl: "10px",
                      pr: "10px",
                    }}
                  />
                </ImageListItem>
              ))}
          </ImageList>
        )}

        {sort === "mementoType" && (
          <Box sx={{ mt: "20px", maxWidth: "80%" }}>
            {MementoTypes.map((type, key) => {
              return (
                <Box
                  key={key}
                  sx={{
                    m: "10px",
                    p: "10px",
                    border: 1,
                    borderRadius: "15px",
                    borderColor: "#9567E0",
                  }}
                >
                  <Typography variant="h5" sx={{ pl: "5px" }}>
                    {type}
                  </Typography>
                  <ImageList sx={{}} cols={4} rowHeight={500}>
                    {data &&
                      data.response.map((item, key) => {
                        if (item.mementoType != type) {
                          return;
                        } else {
                          return (
                            <ImageListItem
                              key={key}
                              sx={{
                                padding: "10px",
                                mr: "10px",
                                width: "300px",
                              }}
                              onClick={() => {
                                navigate("/item", {
                                  state: {
                                    itemId: item.id,
                                    capsuleId: location.state.capsuleId,
                                  },
                                });
                              }}
                            >
                              <img
                                src={item.photos[0]}
                                alt={item.title}
                                loading="lazy"
                              />
                              <ImageListItemBar
                                position="below"
                                title={item.title}
                                actionIcon={
                                  <ArrowForwardIosIcon
                                    sx={{ color: "#9567E0" }}
                                  />
                                }
                                sx={{
                                  mt: "10px",
                                  pl: "10px",
                                  pr: "10px",
                                }}
                              />
                            </ImageListItem>
                          );
                        }
                      })}
                  </ImageList>
                </Box>
              );
            })}
          </Box>
        )}
        <Box sx={{ display: "flex", flexDirection: "column", width: "25%" }}>
          <CustomButton
            disableElevation
            onClick={() => {
              navigate("/add", {
                state: {
                  capsuleId: location.state.capsuleId,
                },
              });
            }}
            style={{
              border: 1,
              borderColor: "#9567E0",
              borderRadius: "10px",
              mb: "20px",
            }}
            text="Add item to capsule"
            isLoggedIn
          />
          <Button
            disableElevation
            onClick={() => {
              navigate("/home");
            }}
            sx={{
              border: 1,
              borderRadius: "10px",
            }}
            isLoggedIn
          >
            Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Capsule;
