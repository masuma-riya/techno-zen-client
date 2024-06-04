import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Pages/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Toaster } from "react-hot-toast";

const Root = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  if (!loaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="font-raleway dark:bg-black">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer position="top-right" autoClose={1000} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Root;
