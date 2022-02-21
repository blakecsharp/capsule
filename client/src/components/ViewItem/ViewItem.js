import * as React from "react";
import { GET_USER } from "../../requests";
import { Container } from "@mui/material";

const ViewItem = () => {
  /*
  const { data, loading, error } = useQuery(GET_USER, {
    context: { clientName: 'apiv2' },
    variables: {
      userId: authUser?.uid,
    },
  });
  */

  console.log(data);
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

export default ViewItem;
