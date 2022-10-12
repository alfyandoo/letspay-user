/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Templates/Navbar";

export const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // getProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="mx-5 sm:mx-10 md:mx-20 lg:mx-40 my-5">
        <h1>My Profile "nama user"</h1>
        <button
          className="my-5 px-5 py-2 rounded-xl bg-red-400 hover:bg-red-300 hover:text-gray-600"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </>
  );
};
