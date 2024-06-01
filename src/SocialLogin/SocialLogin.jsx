import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSign = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          toast.success("Google Login Successful!");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGithubSign = () => {
    signInWithGithub()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          toast.success("Google Login Successful!");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div
      id="third-party-auth"
      className="flex items-center justify-around mb-4 flex-wrap"
    >
      <button
        onClick={handleGoogleSign}
        className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
      >
        <img
          className="max-w-[45px]"
          src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
          alt="Google"
        />
      </button>

      <button
        onClick={handleGithubSign}
        className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
      >
        <img
          className="max-w-[45px] filter dark:invert"
          src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
          alt="Github"
        />
      </button>
    </div>
  );
};

export default SocialLogin;
