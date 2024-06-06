import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeModerator = (user) => {
    axiosSecure.patch(`/users/moderator/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Moderator Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      {/* component */}
      <div className="mt-2">
        <table className="mx-auto table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">Index</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">Name</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">Email</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">Role</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {users?.map((user, index) => (
              <tr
                key={user._id}
                className="bg-white border-b-2 border-gray-200"
              >
                <th>{index + 1}</th>
                <td>
                  <span className="text-center ml-4 font-semibold">
                    {user.name}
                  </span>
                </td>
                <td className="px-24 py-2">
                  <span>{user.email}</span>
                </td>

                <td className="py-2">
                  <div className="dropdown dropdown-click">
                    <button
                      tabIndex={0}
                      className="btn btn-sm rounded-md bg-slate-600 hover:bg-slate-500"
                    >
                      <FaUsers className="text-white text-2xl"></FaUsers>
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu -mt-9 ml-14 shadow bg-base-100 rounded-box w-48"
                    >
                      <li>
                        {user.role === "admin" ? (
                          "Admin"
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="w-full text-left font-semibold text-base"
                          >
                            Make Admin
                          </button>
                        )}
                      </li>
                      <li>
                        {user.role === "moderator" ? (
                          "Moderator"
                        ) : (
                          <button
                            onClick={() => handleMakeModerator(user)}
                            className="w-full text-left font-semibold text-base"
                          >
                            Make Modrator
                          </button>
                        )}
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
