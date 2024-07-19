import React, { useState } from "react";
import styled from "styled-components";
import "../App.css";
import { Link } from "react-router-dom";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ragister } from "../Routes/Route";

const Register = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });
  const hanleShow = () => {
    setShow(!show);
  };
  const hanleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
  };

  async function handleValidate() {
    try {
      const { fullname, username, password, confirmpassword, gender } =
        userData;
      if (!fullname) {
        toast.error("enter fullname", toastOptions);
        return false;
      }
      if (!username) {
        toast.error("enter username", toastOptions);
        return false;
      }
      if (!password) {
        toast.error("enter password", toastOptions);
        return false;
      }
      if (!confirmpassword) {
        toast.error("enter confirmpassword", toastOptions);
        return false;
      }
      if (password !== confirmpassword) {
        toast.error("password and confirm-password not match", toastOptions);
        return false;
      }
      if (!gender) {
        toast.error("select gender", toastOptions);
        return false;
      }
      return true;
    } catch (error) {
      toast.error("error in  validation", toastOptions);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await handleValidate()) {
      try {
        const { fullname, username, password, confirmpassword, gender } =
          userData;
        const response = await axios.post(ragister, userData);

        if (response.data.success) {
          toast.success(response.data.message, toastOptions);
          setTimeout(() => {
            navigate("/login");
          }, 1300);
        } else {
          if (response.error) {
            toast.error(response.error.message, toastOptions);
          }
        }
      } catch (error) {
        toast.error(error.response.data.message, toastOptions);
      }
    } else {
      toast.error("validation fail", toastOptions);
    }
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <div className="formdata">
          <input
            className="inputdata "
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            autoComplete="off"
            value={userData.fullname}
            onChange={handleChange}
          />
          <input
            className="inputdata "
            type="text"
            name="username"
            placeholder="Enter your username"
            autoComplete="off"
            value={userData.username}
            onChange={handleChange}
          />
          <InputPasswordWrapper>
            <input
              className="inputdata "
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleChange}
            />
            <button type="button" className="hide-show" onClick={hanleShow}>
              {show ? <Eye /> : <EyeOff />}
            </button>
          </InputPasswordWrapper>
          <InputPasswordWrapper>
            <input
              className="inputdata "
              type={showConfirm ? "text" : "password"}
              name="confirmpassword"
              placeholder="Enter your confirm-password"
              value={userData.confirmpassword}
              onChange={handleChange}
            />{" "}
            <button
              type="button"
              className="hide-show"
              onClick={hanleShowConfirm}
            >
              {showConfirm ? <Eye /> : <EyeOff />}
            </button>
          </InputPasswordWrapper>
          <div className="gender">
            <label htmlFor="male">Male :</label>{" "}
            <input
              className="male-gender"
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={handleChange}
            />
            <label htmlFor="female"> Female :</label>{" "}
            <input
              className="female-gender"
              id="female"
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
            />
          </div>
          <br />
          <span>
            already have an account ? please <Link to="/login">login</Link>
          </span>
          <br />
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  width: 30rem;
  height: auto;
  border-radius: 3rem;
  padding-top: 1rem;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.267);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h1 {
    font-size: 2.5em;
    color: #2e2e2e;
    font-weight: 700;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .formdata {
    .inputdata {
      width: 100%;
      height: 50px;
      background-color: transparent;
      border: none;
      border-bottom: 2px solid rgb(173, 173, 173);
      border-radius: 20px;
      margin: 10px 0;
      color: black;
      font-size: 1rem;
      font-weight: 500;
      box-sizing: border-box;
      padding-left: 30px;
      &:focus {
        outline: none;
        border-bottom: 2px solid rgb(114, 170, 255);
      }

      &::placeholder {
        color: rgb(80, 80, 80);
        font-size: 1rem;
        font-weight: 500;
      }
    }

    .gender {
      label {
        margin-left: 1.5rem;
        font-size: 1.3rem;
      }
    }
    span {
      font-size: 1.3rem;
      margin-left: 1rem;
      a {
        text-decoration: none;
      }
    }
  }

  @media only screen and (min-min: 600px) {
    width: 100%;
    padding: 2rem;
    box-shadow: none;
    border-radius: 0;

    .formdata {
      .inputdata {
        height: 40px;
        font-size: 0.9rem;
        padding-left: 20px;
      }

      .gender {
        label {
          font-size: 1rem;
        }
      }

      span {
        font-size: 1rem;
        margin-top: 0.5rem;
      }
    }
  }
`;

const InputPasswordWrapper = styled.div`
  position: relative;

  .hide-show {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    svg {
      width: 20px;
      height: auto;
      fill: #aaa;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: 400;
  background-color: #406fe86f;
  text-align: center;
  cursor: pointer;
  margin-top: 1rem;
  margin-left: 30%;

  &:hover {
    background-color: #4070e8c4;
    font-size: 1.1rem;
    font-weight: 500;
  }
  @media (min-width: 360) and (max-width: 480) {
    font-size: 0.9rem;
    padding: 0.8rem 1.5rem;
  }
`;

export default Register;
