import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../../requests";
import { Container } from "@mui/material";

const Login = () => {
  const { data, loading, error } = useQuery(GET_USER);
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

export default Login;
