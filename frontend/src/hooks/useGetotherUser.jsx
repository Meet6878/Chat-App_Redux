import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
const useGetotherUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const featchOheruser = async () => {
      try {
        const res = await axios.get("/api/v1/users/otheruser");
        dispatch(setOtherUsers(res.data.otherUsers));
        // console.log(res.data.otherUsers);
      } catch (error) {
        console.log(error);
      }
    };
    featchOheruser();
  }, []);
};

export default useGetotherUser;
