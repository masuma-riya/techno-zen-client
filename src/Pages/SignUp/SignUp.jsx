import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import SocialLogin from "../../SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useAuth();

  const [registerError, setRegisterError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setRegisterError("");

    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        // Update user profile with name and photoURL
        updateUserProfile(data.name, data.photo)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              isMember: false,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                // Reset the form after successful registration
                reset();

                toast.success("Congratulation! Registration Successful");

                // Go to home page after Registration and profile update
                navigate("/");
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        if (error.code === "auth/email-already-in-use") {
          setRegisterError("! This Email is already in use !");
        } else {
          setRegisterError(error.message);
        }
      });
  };

  return (
    <div className="">
      {" "}
      <div className="p-8 lg:w-1/2 mx-auto">
        {" "}
        <div className="bg-gray-200 rounded-t-lg p-4">
          {" "}
          <p className="text-center italic mb-5 text-4xl text-gray-700 font-bold">
            Sign up with
          </p>{" "}
          <SocialLogin></SocialLogin>
        </div>{" "}
        <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
          {" "}
          <i>
            <p className="text-center text-2xl text-red-900 font-semibold">
              {" "}
              Or sign up with credentials{" "}
            </p>
          </i>{" "}
          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            {" "}
            <div className="relative mb-2">
              {" "}
              <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md   
rounded-md w-full py-3 focus:outline-none text-lg placeholder-neutral-500 font-semibold"
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="Your Name"
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            {errors.name && (
              <span className="text-red-600 font-semibold text-lg ">
                Name is required ! Please Enter Your Name !
              </span>
            )}
            <div className="relative mt-3 mb-2">
              {" "}
              <input
                className="appearance-none text-lg placeholder-gray-500 font-semibold border
         pl-12 border-gray-100 shadow-sm focus:shadow-md 
            rounded-md w-full py-3 focus:outline-none"
                type="email"
                placeholder="Enter Your Email"
                name="email"
                {...register("email", { required: true })}
              />{" "}
              <div className="absolute left-0 inset-y-0 flex items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />{" "}
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />{" "}
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            {errors.email && (
              <span className="text-red-600 font-semibold text-lg ">
                Email is required ! Please Enter Your Email !
              </span>
            )}
            <div className="relative mt-3">
              {" "}
              <input
                className="appearance-none text-lg placeholder-gray-500 font-semibold border
         pl-12 border-gray-100 shadow-sm focus:shadow-md 
            rounded-md w-full py-3 focus:outline-none"
                type="text"
                placeholder="Photo URL"
                {...register("photo")}
                name="photo"
              />{" "}
              <div className="absolute left-0 inset-y-0 flex items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />{" "}
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />{" "}
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            <div className="relative mt-3 mb-2">
              {" "}
              <input
                className="appearance-none border text-lg pl-12 border-gray-100 shadow-sm 
focus:shadow-md placeholder-gray-500 font-semibold rounded-md 
w-full py-3 focus:outline-none"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[a-z])(?=.*[A-Z]).+/,
                })}
                name="password"
              />{" "}
              <div className="absolute left-0 inset-y-0 flex items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />{" "}
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            {errors.password?.type === "required" && (
              <p className="text-red-600 font-semibold text-lg">
                Please Enter a Password!
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 font-semibold text-lg">
                ! Password must be 6 Characters or longer !
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600 font-semibold text-lg">
                ! Password must be less than 20 Characters !
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600 font-semibold text-lg">
                Password must have one Uppercase and one Lowercase !
              </p>
            )}
            <div className="relative mt-3 mb-2">
              {" "}
              <input
                className="appearance-none border text-lg pl-12 border-gray-100 shadow-sm 
focus:shadow-md placeholder-gray-500 font-semibold rounded-md 
w-full py-3 focus:outline-none"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  validate: (value) => value === watch("password"),
                })}
                name="confirmPassword"
                required
              />{" "}
              <div className="absolute left-0 inset-y-0 flex items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />{" "}
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            {errors.confirmPassword?.type === "validate" && (
              <p className="text-red-600 font-semibold text-lg">
                Password and confirm password did&apos;t matched!
              </p>
            )}
            {errors.terms && (
              <p className="text-red-600 font-semibold text-lg">
                Please accept our Privacy Policy.
              </p>
            )}
            <div className="mt-4 flex items-center text-gray-500">
              {" "}
              <input
                type="checkbox"
                id="terms"
                {...register("terms", { required: true })}
                name="terms"
                className="mr-2"
              />{" "}
              <label
                className="text-lg font-semibold text-neutral-800"
                htmlFor="terms"
              >
                I agree with the{" "}
                <a className="text-indigo-500" href="#">
                  Privacy Policy
                </a>
                <p />{" "}
              </label>
            </div>{" "}
            {registerError && (
              <i>
                <p className="md:text-xl text-base pt-4 font-bold text-center text-red-600">
                  {registerError}
                </p>
              </i>
            )}
            <div className="flex items-center justify-center mt-4">
              {" "}
              <button
                type="submit"
                className="text-white py-2 px-4 uppercase rounded
bg-indigo-500 hover:bg-indigo-600 shadow 
hover:shadow-lg font-medium transition 
transform hover:-translate-y-0.5"
              >
                {" "}
                Create Account{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
          <i>
            <p className="text-center mt-4 text-red-950 text-lg font-semibold">
              Already have an account ? Please{" "}
              <Link className="text-xl font-semibold text-blue-600" to="/login">
                Login
              </Link>
            </p>
          </i>
        </div>{" "}
      </div>
    </div>
  );
};

export default SignUp;
