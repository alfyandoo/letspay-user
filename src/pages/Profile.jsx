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

  return (
    <div className="w-full">
      <Navbar />
      <h1>My Profile "nama user"</h1>
    </div>
  );
};
