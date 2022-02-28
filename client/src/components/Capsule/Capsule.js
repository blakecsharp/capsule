import * as React from "react";
import { useQuery } from "@apollo/client";
import { Container, Box, Button, ImageListItemBar } from "@mui/material";
import { auth } from "../../AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { GET_CAPSULE } from "../../requests";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SortingBar from "../shared/SortingBar";

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

  console.log(location);

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
        <SortingBar sort={sort} setSort={setSort} />
        <ImageList sx={{ width: "80vw" }} cols={4} rowHeight={500}>
          {data &&
            data.response.map((item, key) => (
              <ImageListItem
                key={key}
                sx={{
                  border: 1,
                  borderRadius: "15px",
                  borderColor: "black",
                  padding: "10px",
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
                  actionIcon={<ArrowForwardIosIcon />}
                  sx={{
                    pl: "10px",
                    pr: "10px",
                  }}
                />
              </ImageListItem>
            ))}
        </ImageList>
        <Button
          onClick={() => {
            navigate("/add", {
              state: {
                capsuleId: location.state.capsuleId,
              },
            });
          }}
        >
          Add item to capsule
        </Button>
      </Box>
    </Container>
  );
};

export default Capsule;
