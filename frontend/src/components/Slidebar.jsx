import React, { useState } from "react";
import styled from "styled-components";
import { Search, LogOut } from "lucide-react";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
const Slidebar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { otherUsers } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handlelogout = async () => {
    try {
      const res = await axios.get("/api/v1/users/logout");
      dispatch(setAuthUser(null));
      dispatch(setSelectedUser(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchUser = otherUsers?.find((user) =>
      user?.username.toLowerCase().includes(search.toLowerCase())
    );
    if (searchUser) {
      dispatch(setOtherUsers([searchUser]));
    } else {
      toast.error("user not found");
    }
  };

  return (
    <Container>
      <div>
        <form onSubmit={handleSearch}>
          <div className="search">
            <input
              type="text"
              placeholder="search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn-search" type="submit">
              <Search />
            </button>
            <button className="logout" type="button" onClick={handlelogout}>
              <LogOut />
            </button>
          </div>
        </form>
      </div>
      <div>
        <OtherUsers />
      </div>
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 30%;
  background-color: #03136e;

  .search {
    display: flex;
    background-color: #0b209a;
    position: relative;

    input {
      margin: 1rem 2rem;
      padding: 1rem;
      width: 18rem;
      border-radius: 1.2rem;
      font-size: 1rem;
    }
    .btn-search {
      position: absolute;

      top: 1.7rem;
      right: 12rem;
      cursor: pointer;
      background: transparent;
      border: none;
    }
    .logout {
      margin-left: 6rem;
      height: 3rem;
      margin-top: 1rem;
      margin-right: 1rem;
      cursor: pointer;
      background-color: #03136e;
      color: white;
      padding: 0.3rem;

      &:hover {
        background-color: #0b209a;
      }
    }
  }
`;
export default Slidebar;
