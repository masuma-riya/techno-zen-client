import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DarkMode from "./DarkMode";
import logo from "../../assets/logo/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("User logged out Successfully");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav className="bg-white border-b dark:border-black shadow-sm dark:bg-gray-900 dark:text-white duration-200 lg:sticky lg:top-0 lg:z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div>
            <a className="font-bold text-2xl sm:text-3xl flex gap-4">
              <img src={logo} alt="Logo" className="md:w-10 w-7" />
              Techno Zen
            </a>
          </div>
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white font-extrabold"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:block">
            <div className="flex items-center space-x-4">
              <NavLink
                to="/"
                className="text-black dark:text-white hover:text-blue-600 px-3 py-2 rounded-md text-lg italic font-semibold"
              >
                Home
              </NavLink>
              <NavLink
                to="/contact-us"
                className="text-black dark:text-white hover:text-blue-600 px-3 py-2 rounded-md text-lg italic font-semibold"
              >
                Contact Us
              </NavLink>
              <NavLink
                to="/dashboard"
                className="text-black dark:text-white hover:text-blue-600 px-3 py-2 rounded-md text-lg italic font-semibold"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/our-menu"
                className="text-black dark:text-white hover:text-blue-600 px-3 py-2 rounded-md text-lg italic font-semibold"
              >
                Our Menu
              </NavLink>
              <NavLink
                to="/order-food/salads"
                className="text-black dark:text-white hover:text-blue-600 px-3 py-2 rounded-md text-lg italic font-semibold"
              >
                Order Food
              </NavLink>
            </div>
          </div>

          <div>
            <DarkMode></DarkMode>
          </div>

          <div className="hidden lg:block">
            {user ? (
              <div className="flex gap-6 items-center">
                <div className="relative">
                  <img
                    className="w-12 mt-4 mb-4 h-12 rounded-full border-blue-600 cursor-pointer"
                    src={
                      user?.photoURL || "https://i.ibb.co/FBZQVTZ/defalt.jpg"
                    }
                    alt=""
                    title={user.displayName} // Add the title attribute here
                  />
                </div>
                <button
                  onClick={handleSignOut}
                  className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 font-semibold italic text-white py-1 px-6 rounded-full flex items-center text-lg"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="ml-4 flex items-center md:ml-6">
                <Link to="/login">
                  <button className="bg-teal-500 hover:bg-teal-600 hover:scale-105 duration-200 font-semibold italic text-white py-1 px-6 rounded-full flex items-center text-lg gap-3">
                    Login
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button className="bg-teal-500 hover:bg-teal-600 hover:scale-105 duration-200 font-semibold italic text-white py-1 px-5 rounded-full flex text-lg items-center mx-4 gap-3">
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} lg:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
          <NavLink
            to="/"
            className="text-black hover:text-blue-600 block px-4 py-2 rounded-md dark:text-white text-lg md:text-xl italic font-semibold"
          >
            Home
          </NavLink>
          <NavLink
            to="/contact-us"
            className="text-black dark:text-white text-lg md:text-xl italic font-semibold hover:text-blue-600 block px-3 py-2 rounded-md"
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/dashboard"
            className="text-black dark:text-white text-lg md:text-xl italic font-semibold hover:text-blue-600 block px-3 py-2 rounded-md"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/our-menu"
            className="text-black dark:text-white text-lg md:text-xl italic font-semibold hover:text-blue-600 block px-3 py-2 rounded-md"
          >
            Our Menu
          </NavLink>
          <NavLink
            to="/order-food/salads"
            className="text-black dark:text-white text-lg md:text-xl italic font-semibold hover:text-blue-600 block px-3 py-2 rounded-md"
          >
            Order Food
          </NavLink>
          <div className="mt-2">
            {user ? (
              <div className="flex gap-6 items-center">
                <div className="relative">
                  <img
                    className="w-12 mt-4 mb-4 h-12 rounded-full border-blue-600 cursor-pointer"
                    src={
                      user?.photoURL || "https://i.ibb.co/FBZQVTZ/defalt.jpg"
                    }
                    alt=""
                    title={user.displayName} // Add the title attribute here
                  />
                </div>
                <button
                  onClick={handleSignOut}
                  className="bg-teal-500 hover:bg-teal-600 hover:scale-105 duration-200 font-semibold italic text-white py-1 px-6 rounded-full flex items-center text-lg"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="block mt-1 md:w-1/2 w-full text-white font-semibold text-xl px-4 py-2 rounded-md italic bg-teal-500 hover:bg-teal-600 hover:scale-105 duration-200">
                    Login
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button className="block mt-1 md:w-1/2 text-white font-semibold text-xl w-full px-4 py-2 rounded-md italic bg-teal-500 hover:bg-teal-600 hover:scale-105 duration-200">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
