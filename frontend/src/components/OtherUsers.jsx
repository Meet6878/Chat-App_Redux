import React from "react";
import styled from "styled-components";
import SingleUser from "./SingleUser";
import useGetotherUser from "../hooks/useGetotherUser";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  useGetotherUser();
  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers) return;

  return (
    <Container className="users">
      {otherUsers?.map((user, index) => {
        return <SingleUser key={index} user={user} />;
      })}
    </Container>
  );
};
const Container = styled.div`
  overflow: auto;
  height: 45rem;
`;
export default OtherUsers;
