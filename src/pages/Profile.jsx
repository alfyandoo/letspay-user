/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Templates/Navbar";

export const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      {loading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="mx-5 sm:mx-10 md:mx-20 lg:mx-40 my-5">
          <h1>My Profile "nama user"</h1>
          <button
            className="my-5 px-5 py-2 rounded-xl bg-red-400 hover:bg-red-300 hover:text-gray-600"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};
