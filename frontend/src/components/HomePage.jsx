import React, { useEffect } from "react";
import Slidebar from "./Slidebar";
import MessageContainer from "./MessageContainer";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { setSocket } from "../redux/soketSlice";
import { setOnlineUser } from "../redux/userSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8080", {
        query: {
          userId: authUser?.userId,
        },
      });
      socket.on("connect", () => {
        // console.log("user connected", socket.id);
        console.log("socket", socket);

        dispatch(setSocket(socket));

        socket.on("getOnlineUsers", (onlineusers) => {
          dispatch(setOnlineUser(onlineusers));
          console.log("onlineUsers", onlineusers);
        });
      });

      return () => {
        socket.close();
        // dispatch(setSoket(null)); // Reset socket in Redux store
      };
    } else {
      if (!authUser) {
        dispatch(setSocket(null));
        dispatch(setOnlineUser(null));
      }
    }
  }, [authUser]);
  return (
    <>
      {authUser && (
        <Container>
          <div className="container">
            <Slidebar />

            <MessageContainer />
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #1a1071;
  gap: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    display: flex;
    height: 85vh;
    width: 85vw;
    background-color: #1a3cb7;
  }
`;

export default HomePage;
