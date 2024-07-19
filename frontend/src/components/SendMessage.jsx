import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SendHorizontal } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/messageSlice";

const SendMessage = () => {
  const [sendMessage, setSendMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `/api/v2/message/send/${selectedUser?._id}`,
        { message: sendMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Response:", res);
      dispatch(setMessage([...messages, res?.data?.newMessage]));
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
    setSendMessage("");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="mess">
          <input
            type="text"
            placeholder="send message..."
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
          />
          <button type="submit">
            <SendHorizontal />
          </button>
        </div>
      </form>
    </Container>
  );
};
const Container = styled.div`
  form {
    .mess {
      position: relative;
      input {
        padding: 1rem;
        width: 97%;
        padding-left: 1rem;
        border-radius: 1rem;
        font-size: larger;
      }
      button {
        position: absolute;
        right: 3rem;
        background-color: transparent;
        cursor: pointer;
        top: 0.8rem;
        border: none;
      }
    }
  }
`;
export default SendMessage;
