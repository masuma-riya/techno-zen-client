import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UpdateUser from "../Pages/SignUp/UpdateUser/UpdateUser";
import Dashboard from "../Layout/Dashboard";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import Users from "../Pages/Dashboard/Users/Users";
import Statistics from "../Pages/Dashboard/Statistics/Statistics";
import Coupons from "../Pages/Dashboard/Coupons/Coupons";
import AdminRoute from "./AdminRoute/AdminRoute";
import ReviewProducts from "../Pages/Dashboard/ReviewProducts/ReviewProducts";
import ReportedCon from "../Pages/Dashboard/ReportedCon/ReportedCon";
import ModeratorRoute from "./ModeratorRoute/ModeratorRoute";
import Products from "../Pages/Products/Products";
import Details from "../Pages/Details/Details";
import PrivateRoute2 from "./PrivateRoute2/PrivateRoute2";
import Payment from "../Pages/Payment/Payment";
import UpdateProduct from "../Pages/Dashboard/MyProducts/UpdateProduct/UpdateProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute2>
            <Details></Details>
          </PrivateRoute2>
        ),
      },
      {
        path: "/updateProduct/:id",
        element: (
          <PrivateRoute2>
            <UpdateProduct></UpdateProduct>
          </PrivateRoute2>
        ),
      },
      {
        path: "/update-user",
        element: (
          <PrivateRoute2>
            {" "}
            <UpdateUser></UpdateUser>
          </PrivateRoute2>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Users Route
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "addProduct",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "myProducts",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      // admin routes
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <Statistics></Statistics>
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users></Users>
          </AdminRoute>
        ),
      },
      {
        path: "coupons",
        element: (
          <AdminRoute>
            <Coupons></Coupons>
          </AdminRoute>
        ),
      },
      // moderator routes
      {
        path: "reviewProducts",
        element: (
          <ModeratorRoute>
            <ReviewProducts></ReviewProducts>
          </ModeratorRoute>
        ),
      },
      {
        path: "reportedContents",
        element: (
          <ModeratorRoute>
            <ReportedCon></ReportedCon>
          </ModeratorRoute>
        ),
      },
    ],
  },
]);
