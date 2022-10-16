import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/api";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      console.log(data);

      if (data.messages === "success") {
        localStorage.setItem("tokenUser", data.token);
        navigate("/");
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <>
      <h1 className="text-center">Login</h1>
      <div className="flex flex-col m-5">
        <input
          type="text"
          className="border-2 rounded-lg px-2 mb-3 py-4"
          placeholder="input username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          className="border-2 rounded-lg px-2 mb-3 py-4"
          placeholder="input password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
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
    </>
  );
};
