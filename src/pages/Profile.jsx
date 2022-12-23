/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/api";
import { Loading } from "../components/Templates/Loading";
import { AuthContext } from "../contexts/AuthContext";

export const Profile = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/profiles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenUser")}`,
        },
      });
      const data = await response.json();
      console.log(JSON.stringify(data));
      if (data.messages === "success") {
        setUser(data.user);
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("tokenUser");
    setAuthUser(false);
    navigate("/login");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="py-5 w-full h-screen">
          <h1>My Profile</h1>
          <img
            src="https://ui-avatars.com/api/?name=alfyando&background=random"
            alt="user"
            className="rounded-full"
          />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>Username: {user.username}</h1>
          <h1>Phone: {user.phone}</h1>
          <button
            className="my-5 px-5 py-2 rounded-xl bg-green-400 hover:bg-green-300 hover:text-gray-600"
            onClick={() => navigate("/transaction")}
          >
            My Transaction
          </button>

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
