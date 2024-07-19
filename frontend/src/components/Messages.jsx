import React from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import useGetMessage from "../hooks/useGetMessage";
import styled from "styled-components";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
const Messages = () => {
  useGetMessage();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);
  if (!messages) return;

  return (
    <Container>
      {messages &&
        messages.map((message, index) => {
          return <Message key={index} message={message} />;
        })}
    </Container>
  );
};
const Container = styled.div`
  height: 100%;

  overflow-y: auto;
`;
export default Messages;
