import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Heading = styled.h1`
  font-size: 3em;
  margin-bottom: 0.5em;
`;

const Text = styled.p`
  font-size: 1.5em;
  max-width: 80%;
  line-height: 1.6;
`;
const Span = styled.span`
  font-size: 1.5em;
  max-width: 80%;
  line-height: 1.6;

  :hover {
    color: #1dad29;
  }
`;

const PageNotFound = () => {
  return (
    <Container>
      <Heading>404 - Page Not Found</Heading>
      <Text>
        Oops! The page you are looking for might have been removed or its name
        changed or is temporarily unavailable.
      </Text>
      <Span>
        go to the <Link to="/"> home page</Link>
      </Span>
    </Container>
  );
};

export default PageNotFound;
