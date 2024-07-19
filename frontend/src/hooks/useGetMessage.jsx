import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessage } from "../redux/messageSlice";

const useGetMessage = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8080/api/v2/message/getmessage/${selectedUser._id}`
        );
        if (res.status === 200) {
          console.log("Response:", res.data);
          dispatch(setMessage(res.data));
        }
      } catch (error) {
        console.error("Error fetching message:", error);
        dispatch(setMessage(null));
      }
    };

    if (selectedUser) {
      fetchMessage();
    }
  }, [selectedUser]);
};

export default useGetMessage;
