import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Register } from "./Register";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

export const Login = ({ authUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: username,
          password,
        }),
      });

      const data = await response.json();

      if (data.messages === "username atau password salah") {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          html: `username atau password salah`,
          confirmButtonText: "OK",
          showCancelButton: false,
        });
      }

      if (data.messages === "success") {
        localStorage.setItem("tokenUser", data.token);
        setAuthUser(data)
        navigate("/");
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <>
      {showRegister && <Register setShowRegister={setShowRegister} />}
      <div className="w-full flex flex-col sm:flex-col md:flex-row">
        <div>
          <img
            src="/images/login-img.png"
            alt="login_image"
            className="w-full h-fit hidden sm:hidden md:block"
          />
        </div>
        <div className="flex flex-col justify-start sm:justify-start md:justify-center h-screen">
          <img src="/images/logo-app.png" alt="logo_app" className="w-full" />
          <input
            type="text"
            className="border-2 rounded-lg px-2 mb-3 py-4"
            placeholder="input username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="border-2 rounded-lg px-2 w-full mb-3 py-4"
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
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => setShowRegister((prevState) => !prevState)}
              className="cursor-pointer text-blue-800 hover:text-gray-400"
            >
              Sign up
            </span>
          </p>
          <button
            className="my-3 py-3 rounded-lg text-white bg-blue-400 hover:bg-blue-300"
            onClick={() => login()}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
