import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket) {
      socket?.on("newMessage", (newMessage) => {
        dispatch(setMessage([...messages, newMessage]));
      });
    }

    return () => socket?.off("newMessage");
  }, [socket, setMessage, messages]);
};

export default useGetRealTimeMessage;
