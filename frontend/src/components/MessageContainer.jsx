import React, { useEffect } from "react";
import styled from "styled-components";
import SendMessage from "./SendMessage";
import { useSelector } from "react-redux";
import Welcome from "./Welcome";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);

  return (
    <>
      {selectedUser ? (
        <Div>
          <Container
            className="user"
            // style={{ width: "60rem" }}
          >
            <div className="userimg">
              <img
                style={{ height: "3rem" }}
                src={selectedUser.profilepic}
                alt="user"
              />
            </div>

            <div style={{ fontSize: "1.6rem" }} className="username">
              {selectedUser.username}
            </div>
          </Container>
          <div>
            <Messages />
          </div>
          <div>
            <SendMessage />
          </div>
        </Div>
      ) : (
        <Welcome />
      )}
    </>
  );
};

const Div = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
`;
const Container = styled.div`
  height: 5rem;
  background-color: #0c0a30ce;
  width: 71.4rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  color: white;
  padding-left: 0.8rem;
  .user {
    margin: 1rem;
    padding: 1rem;
    display: flex;
    .userimg {
      img {
        min-height: 1rem;
      }
    }
  }
`;
export default MessageContainer;
