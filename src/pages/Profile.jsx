/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Templates/Navbar";

export const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="mx-40 my-5">
        <h1>My Profile "nama user"</h1>
        <button
          className="my-5 px-5 py-2 rounded-xl bg-red-400 hover:bg-red-300 hover:text-gray-600"
          onClick={() => Logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
