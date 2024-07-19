import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Welcome = () => {
  const { authUser } = useSelector((store) => store.user);

  return (
    <Container>
      <Title>Welcome to My ChatApp</Title>
      <Description>
        {" "}
        <span>{authUser.username}</span> please select user for start
        conversation
      </Description>
      <img src={authUser?.profilepic} alt="login-user" />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: white;
  background-color: #45419b;
  img {
    height: 5rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: #c4bfbf;
  line-height: 1.6;
  span {
    color: #f0f0ff;
    cursor: pointer;

    &:hover {
      font-size: 2rem;
    }
  }
`;
export default Welcome;
