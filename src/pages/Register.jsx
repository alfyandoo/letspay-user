import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/api";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    console.log({ email, username, password, name, Phone });
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
      console.log(data);

      if (data.messages === "success") {
        navigate("/login");
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <>
      <h1 className="text-center">Register</h1>
      <div className="flex flex-col m-5">
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
        <input
          type="password"
          className="border-2 rounded-lg px-2 mb-3 py-4"
          placeholder="input password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
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
    </>
  );
};
