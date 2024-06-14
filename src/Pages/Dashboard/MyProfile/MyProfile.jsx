import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useMember from "../../../Hooks/useMember";
const MyProfile = () => {
  const { user } = useAuth();
  const [isMember] = useMember();

  return (
    <div className="w-5/12 mx-auto mt-16 overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-blue-400">
      <div className="relative  flex justify-center mt-4">
        <img className="w-3/12 rounded-full" src={user?.photoURL} alt="" />
      </div>
      <div className="px-6 py-4">
        <div className="text-xl font-semibold text-gray-800">
          {user?.displayName}
        </div>
        <p className="text-gray-600 mt-2">{user?.email}</p>
      </div>
      <div className="flex mb-8 mt-4 justify-around items-center">
        {!isMember && (
          <Link to="/payment">
            {" "}
            <button className="inline-flex items-center justify-center rounded-xl bg-green-600 py-2 px-4 font-dm text-lg font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
              Purchase Membership <span className="text-2xl ml-3">$ 1000</span>
            </button>
          </Link>
        )}
        {isMember && (
          <span className="inline-block px-4 py-1 font-semibold text-teal-900 bg-teal-200 rounded-full">
            Verified
          </span>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
