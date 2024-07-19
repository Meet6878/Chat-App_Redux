import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSelectedUser } from "../redux/userSlice";

const SingleUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(user._id);
  // console.log("user", user);
  const handleSelectedUser = (user) => {
    dispatch(setSelectedUser(user));
    console.log("selected user", user);
  };

  return (
    <Container>
      <div
        // className={`${selectedUser._id === user._id ? "susers" : "users"}`}
        className="users "
        onClick={() => handleSelectedUser(user)}
      >
        <div className="userimg ">
          <img src={user.profilepic} alt="user" />
          {isOnline && <OnlineBadge>Online</OnlineBadge>}
        </div>
        <div className="username">{user.username}</div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  .users {
    min-height: 5rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #141ea4;
    margin: 1rem 1rem;
    cursor: pointer;
    color: white;

    &:hover {
      background-color: #474d9d8c;
    }
    .userimg {
      position: relative;
      img {
        height: 4rem;
        position: relative;
      }
    }

    .username {
      font-size: 1.6rem;
    }
  }
  .susers {
    min-height: 5rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #565cab;
    margin: 1rem 1rem;
    cursor: pointer;
    color: black;

    .userimg {
      position: relative;
      img {
        height: 4rem;
        position: relative;
      }
    }
  }
`;

const OnlineBadge = styled.div`
  position: absolute;
  top: 0.1rem;
  left: 2.5rem;
  background-color: #4caf50;
  color: white;
  padding: 0.3rem;
  border-radius: 50%;
  font-size: 0.8rem;
`;
export default SingleUser;
