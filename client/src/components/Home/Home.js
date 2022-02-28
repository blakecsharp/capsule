import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import NavigationBar from "../shared/NavigationBar";
import { GET_USER } from "../../requests";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  const {
    loading: dataLoading,
    error: dataError,
    data,
  } = useQuery(GET_USER, {
    variables: {
      userId: user.uid || "",
    },
  });

  if (loading) {
    return null;
  }

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
        alignItems: "center",
      }}
    >
      <NavigationBar isLoggedIn={true} />
      {!loading && data && (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" sx={{ mb: "20px" }}>
            Hi {data.response.firstName}!
          </Typography>

          {!data.response.capsules || data.response.capsules.length < 1 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
              }}
            >
              Looks like you are not a part of any capsules.
              <Button
                variant="contained"
                disableElevation
                sx={{
                  width: "50%",
                }}
                onClick={() => {
                  navigate("/create");
                }}
              >
                Click here to create your first capsule
              </Button>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  width: "50%",
                }}
                onClick={() => {
                  navigate("/create");
                }}
              >
                Click here to join your first capsule
              </Button>
            </Box>
          ) : (
            <Container
              sx={{
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {data.response.capsules.map((capsule, index) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "60%",
                      maxWidth: "800px",
                      pt: "5px",
                      pb: "5px",
                      border: 1,
                      borderColor: "black",
                      borderRadius: 16,
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      jusitfyContent: "center",
                    }}
                    onClick={() => {
                      navigate("/capsule", {
                        state: {
                          capsuleId: capsule.id,
                        },
                      });
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {capsule.title}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pb: "10px",
                      }}
                      variant="body1"
                    >
                      {capsule.items
                        ? `${capsule.items.length} memento${
                            capsule.items.length > 1 ? "s" : ""
                          }`
                        : ""}
                    </Typography>

                    <Stack direction="row" spacing={2}>
                      {capsule.items &&
                        capsule.items.map((item, key) => {
                          return (
                            <Avatar
                              sx={{ height: 80, width: 80 }}
                              alt="item"
                              src={item.photos[0]}
                            />
                          );
                        })}
                    </Stack>

                    {!capsule.items && (
                      <Box>
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pl: "10px",
                          }}
                        >
                          Looks like this capsule is empty.
                        </Typography>
                        <Button
                          variant="contained"
                          disableElevation
                          sx={{
                            width: "25%",
                          }}
                          onClick={() => {
                            navigate("/add", {
                              state: {
                                capsuleId: capsule.id,
                              },
                            });
                          }}
                        >
                          Add a memento
                        </Button>
                      </Box>
                    )}
                  </Box>
                );
              })}
              <Button
                onClick={() => {
                  navigate("/create");
                }}
              >
                Click here to create a new capsule
              </Button>
            </Container>
          )}
        </Container>
      )}
    </Container>
  );
};

export default Home;
