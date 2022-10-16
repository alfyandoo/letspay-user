import { Link } from "react-router-dom";
import { useState } from "react";
import { Transition } from "@headlessui/react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header>
        <nav className="bg-orange-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="cursor-pointer font-extrabold">
                    LETS<span className="text-white hover:text-black">PAY</span>
                  </h1>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline justify-between space-x-4">
                    <Link
                      to="/"
                      className="hover:text-gray-700 text-white px-3 py-2 font-medium text-2xl rounded-md"
                    >
                      Home
                    </Link>

                    <Link
                      to="/transaction"
                      className="text-white hover:text-gray-700 px-3 py-2 font-medium text-2xl rounded-md"
                    >
                      Transaction
                    </Link>

                    <Link
                      to="/profile"
                      className="text-white hover:text-gray-700 px-3 py-2 font-medium text-2xl rounded-md"
                    >
                      Profile
                    </Link>
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {() => (
              <div className="md:hidden" id="mobile-menu">
                <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link
                    to="/"
                    className="hover:text-gray-700 text-white px-3 py-2 font-medium text-2xl rounded-md"
                  >
                    Home
                  </Link>

                  <Link
                    to="/history"
                    className="text-white hover:text-gray-700 px-3 py-2 font-medium text-2xl rounded-md"
                  >
                    History
                  </Link>

                  <Link
                    to="/profile"
                    className="text-white hover:text-gray-700 px-3 py-2 font-medium text-2xl rounded-md"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </header>
    </>
  );
};
