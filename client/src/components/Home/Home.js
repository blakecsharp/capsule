import * as React from "react";
import { Container } from "@mui/material";

const Home = () => {
  /*
  const { data, loading, error } = useQuery(GET_USER, {
    context: { clientName: 'apiv2' },
    variables: {
      userId: authUser?.uid,
    },
  });
  */
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ backgroundColor: "#9567e0" }}
    >
      Hey
    </Container>
  );
};

export default Home;
