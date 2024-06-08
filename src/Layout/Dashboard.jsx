import { NavLink, Outlet } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { RiProductHuntLine } from "react-icons/ri";
import { RiCoupon2Line } from "react-icons/ri";
import { SiStatista } from "react-icons/si";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineReportProblem } from "react-icons/md";
import { GoCodeReview } from "react-icons/go";
import "../Layout/Dashboard.css";
import useAdmin from "../Hooks/useAdmin";
import useModerator from "../Hooks/useModerator";
import useAuth from "../Hooks/useAuth";
import { useEffect, useState } from "react";
import Loader from "../Layout/Loader";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  const { user } = useAuth();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  if (!loaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader></Loader>
      </div>
    );
  }

  return (

    
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* sidebar */}
        <div className="md:flex md:flex-col md:w-64 bg-gray-800">
          <div className="flex items-center justify-center h-16 bg-gray-900">
            {user && isAdmin && (
              <span className="text-white font-bold uppercase">
                Admin Dashboard
              </span>
            )}
            {user && isModerator && !isAdmin && (
              <span className="text-white font-bold uppercase">
                Moderator Dashboard
              </span>
            )}
            {user && !isAdmin && !isModerator && (
              <span className="text-white font-bold uppercase">
                User Dashboard
              </span>
            )}
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">
              {isAdmin ? (
                <>
                  <NavLink
                    to="/dashboard/statistics"
                    className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
                  >
                    <SiStatista className="mr-2"></SiStatista>
                    Statistics
                  </NavLink>

                  <NavLink
                    to="/dashboard/users"
                    className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
                  >
                    <FaUsers className="mr-2 text-xl"></FaUsers>
                    Manage Users
                  </NavLink>
                  <NavLink
                    to="/dashboard/coupons"
                    className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
                  >
                    <RiCoupon2Line className="mr-2 text-xl"></RiCoupon2Line>
                    Manage Coupons
                  </NavLink>
                </>
              ) : isModerator ? (
                <>
                  <NavLink
                    to="/dashboard/reviewProducts"
                    className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
                  >
                    <GoCodeReview className="mr-2"></GoCodeReview>
                    Review Products
                  </NavLink>
                  <NavLink
                    to="/dashboard/reportedContents"
                    className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
                  >
                    <MdOutlineReportProblem className="mr-2"></MdOutlineReportProblem>
                    Reported Contents
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/dashboard/profile"
                    className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
                  >
                    <FaRegUser className="mr-2"></FaRegUser>
                    My Profile
                  </NavLink>

                  <NavLink
                    to="/dashboard/addProduct"
                    className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
                  >
                    <IoBagAddOutline className="mr-2"></IoBagAddOutline>
                    Add Product
                  </NavLink>
                  <NavLink
                    to="/dashboard/myProducts"
                    className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
                  >
                    <BsCart4 className="mr-2"></BsCart4>
                    My Products
                  </NavLink>
                </>
              )}
              {/* shared navlink */}
              <div className="divider text-white"></div>
              <NavLink
                to="/"
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <AiOutlineHome className="mr-2"></AiOutlineHome>
                Home
              </NavLink>
              <NavLink
                to="/products"
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <RiProductHuntLine className="mr-2"></RiProductHuntLine>
                Products
              </NavLink>
              <NavLink
                to="/"
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <FcAbout className="mr-2"></FcAbout>
                About Us
              </NavLink>
            </nav>
          </div>
        </div>

        <div className="w-full">
          <Outlet></Outlet>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Dashboard;
