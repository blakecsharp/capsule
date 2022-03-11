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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIosRounded";
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

  const numCols = parseInt(dimensions.width / 370);

  console.log((dimensions.width * 0.88) / numCols);

  React.useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  return (
    <Container maxWidth={false} disableGutters sx={{}}>
      <NavigationBar isLoggedIn />
      <Box
        sx={{
          pl: "11%",
          pr: "11%",
        }}
      >
        <SortingBar
          sort={sort}
          setSort={setSort}
          capsuleId={location.state.capsuleId}
        />

        <div style={{ display: "flex", flexDirection: "row", paddingTop: 3 }}>
          <div style={{ flex: 1 }}>
            <Button
              disableElevation
              onClick={() => {
                navigate("/home");
              }}
              sx={{
                border: 1,
                borderRadius: "10px",
                justifySelf: "flex-start",
                mb: "20px",
              }}
              isLoggedIn
            >
              Back
            </Button>
          </div>

          <div style={{}}>
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
                justifySelf: "flex-end",
                border: 1,
                borderColor: "#9567E0",
                borderRadius: "10px",
                marginLeft: "auto",
                marginRight: 0,
                mb: "20px",
              }}
              text="Add memento"
              isLoggedIn
            />
          </div>
        </div>

        {sort === "all" && (
          <ImageList cols={numCols} rowHeight={350}>
            {data &&
              data.response.map((item, key) => (
                <ImageListItem
                  key={key}
                  sx={{
                    border: 1,
                    borderRadius: "15px",
                    borderColor: "#9567E0",
                    pt: "15px",
                    pl: "15px",
                    pr: "15px",
                    mb: "10px",
                  }}
                  style={{ cursor: "pointer" }}
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
                    style={{
                      borderRadius: 12,
                      width: "100%",
                      height: "253px",
                      resizeMode: "stretch",
                    }}
                  />

                  <ImageListItemBar
                    position="below"
                    title={item.title}
                    actionIcon={
                      <img
                        src="https://i.imgur.com/6jtTC7P.png"
                        alt=""
                        style={{ width: "25px", paddingTop: "4px" }}
                      ></img>
                      // <ArrowForwardIosIcon sx={{ pt: "4px", color: "#9567E0" }} />
                    }
                    sx={{
                      mt: "5px",
                      pl: "5px",
                      pr: "5px",
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
                  }}
                >
                  <Typography variant="h5" sx={{ pl: "5px" }}>
                    {type}
                  </Typography>
                  <ImageList sx={{}} cols={4} rowHeight={350}>
                    {data &&
                      data.response.map((item, key) => {
                        if (item.mementoType != type) {
                          return;
                        } else {
                          return (
                            <ImageListItem
                              style={{ cursor: "pointer" }}
                              key={key}
                              sx={{
                                pt: "15px",
                                pl: "15px",
                                pr: "15px",
                                mr: "10px",
                                width: "253px",
                                border: 1,
                                borderRadius: "15px",
                                borderColor: "#9567E0",
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
                                style={{
                                  width: "253px",
                                  height: "253px",
                                  borderRadius: "12px",
                                  resizeMode: "stretch",
                                }}
                                loading="lazy"
                              />
                              <ImageListItemBar
                                position="below"
                                title={item.title}
                                actionIcon={
                                  <img
                                    src="https://i.imgur.com/6jtTC7P.png"
                                    alt=""
                                    style={{ width: "25px", paddingTop: "4px" }}
                                  ></img>
                                }
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
      </Box>
    </Container>
  );
};

export default Capsule;
