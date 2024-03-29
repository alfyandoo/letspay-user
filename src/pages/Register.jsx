import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/api";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Register = ({ setShowRegister }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          name,
          Phone,
        }),
      });

      const data = await response.json();

      if (data.messages === "error insert user") {
        Swal.fire({
          icon: "error",
          title: "Register Failed",
          html: `Fill all field correctly | username or email already exist`,
          confirmButtonText: "OK",
          showCancelButton: false,
        });
      }

      if (data.messages === "success") {
        Swal.fire({
          icon: "success",
          title: "Register Success",
          html: `Please Sign In`,
          confirmButtonText: "OK",
          showCancelButton: false,
        });
        setShowRegister(false);
        navigate("/login");
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-screen bg-black/40 z-10"
      onClick={() => setShowRegister((prevState) => !prevState)}
    >
      <div
        className="fixed w-[90%] sm:w-[80%] md:w-[50%] h-fit left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 box-border rounded-lg shadow-lg bg-[#FFFDF8]"
        onClick={(event) => event.stopPropagation()}
      >
        <h1 className="text-center my-5 font-bold text-2xl">Register</h1>
        <div className="flex flex-col mx-5 mb-5">
          <input
            type="email"
            className="border-2 rounded-lg px-2 mb-3 py-4"
            placeholder="input email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
          <input
            type="text"
            className="border-2 rounded-lg px-2 mb-3 py-4"
            placeholder="input username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="border-2 rounded-lg px-2 mb-3 py-4 w-full"
              placeholder="input password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword((prevState) => !prevState)}
                className="absolute cursor-pointer text-xl top-3 right-4 bottom-40 translate-y-1/2 text-gray-300 hover:text-gray-200"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword((prevState) => !prevState)}
                className="absolute cursor-pointer text-xl top-3 right-4 bottom-40 translate-y-1/2 text-gray-300 hover:text-gray-200"
              />
            )}
          </div>
          <input
            type="text"
            className="border-2 rounded-lg px-2 mb-3 py-4"
            placeholder="input your name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="text"
            className="border-2 rounded-lg px-2 mb-3 py-4"
            placeholder="input your phone number"
            value={Phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <p>
            Do you have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer text-blue-800 hover:text-gray-400"
            >
              Sign in
            </span>
          </p>
          <button
            className="my-3 py-3 rounded-lg text-white bg-blue-400 hover:bg-blue-300"
            onClick={() => register()}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
