/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../api/api";

export const Navbar = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [user, setUser] = useState([]);
  const [navbar, setNavbar] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/profiles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenUser")}`,
        },
      });
      const data = await response.json();

      if (data.messages === "success") {
        setUser(data.user);
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem("tokenUser");
    setShowLogout(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-primary shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <h2 className="text-2xl font-extrabold text-secondary hover:text-white">
              LETS<span className="text-white">PAY</span>!
            </h2>
            <div className="md:hidden">
              <button
                type="button"
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293
                      4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {authUser && (
                <>
                  <li className="text-white  hover:text-secondary">
                    <Link
                      to="/"
                      className="py-4 px-4 font-semibold hover:text-secondary rounded-md"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="text-white  hover:text-secondary">
                    <Link
                      to="/product"
                      className="py-4 px-4 font-semibold hover:text-secondary rounded-md"
                    >
                      Product
                    </Link>
                  </li>
                  <li className="text-white  hover:text-secondary">
                    <Link
                      to="/transaction"
                      className="py-4 px-4 font-semibold hover:text-secondary rounded-md"
                    >
                      Transaction
                    </Link>
                  </li>
                  <div
                    className="px-4 flex items-center relative z-10 cursor-pointer"
                    onMouseEnter={() => {
                      setShowLogout(true);
                    }}
                    onMouseLeave={() => {
                      setShowLogout(false);
                    }}
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    <img
                      src={
                        !!user &&
                        `https://ui-avatars.com/api/?name=${user.username}&background=random`
                      }
                      alt="user"
                      className="w-12 h-12 rounded-full bg-blue-100"
                    />
                    {showLogout && (
                      <div className="absolute -bottom-16 left-0 flex flex-col items-center rounded-xl -z-10 justify-center bg-primary shadow-sm">
                        <h1 className="pt-20 text-white">{user?.username}</h1>
                        <button
                          type="button"
                          onClick={() => logout()}
                          className=" bg-white w-20 mt-1 h-8 text-red-500 rounded-b-xl hover:bg-red-700 hover:text-white shadow-lg"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
