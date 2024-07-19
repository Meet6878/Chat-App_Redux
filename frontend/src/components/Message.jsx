import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
const Message = ({ message }) => {
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const { authUser, selectedUser } = useSelector((store) => store.user);

  return (
    <Container>
      <div ref={scroll} className="chat-massages">
        <div
          className={`message ${
            message.senderId === authUser.userId ? "sender" : "reciver"
          }`}
        >
          <div className="content">
            <p>{message.message}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  .chat-massages {
    padding: 0 0.5rem;
    gap: 0.5rem;
    overflow-y: auto;
    color: white;

    .message {
      padding: 0.5rem;
      display: flex;
      align-items: center;

      .content {
        border-radius: 1.6rem;
        max-width: 60%;
        overflow-wrap: break-word;
        padding: 0.8rem;
        font-size: 1rem;
      }
    }
    .sender {
      justify-content: flex-end;
      .content {
        background-color: #314e31;
      }
    }
    .reciver {
      justify-content: flex-start;
      .content {
        background-color: #a8a5a5;
        color: black;
      }
    }
  }
`;

export default Message;
