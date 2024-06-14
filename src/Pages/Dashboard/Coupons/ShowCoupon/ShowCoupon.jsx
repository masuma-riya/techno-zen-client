import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../../Layout/Loader";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const ShowCoupon = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => await axiosPublic.get("/coupons"),
  });

  const allCoupons = data?.data;

  const queryClient = useQueryClient();
  const { mutateAsync: deleteCoupon } = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/allCoupons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["couponsPro"]);
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this Coupon!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCoupon(id);
          Swal.fire({
            title: "Deleted!",
            text: "Coupon has been deleted.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Request failed",
          });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader></Loader>
      </div>
    );
  }
  return (
    <>
      <table className="min-w-full mt-4 mb-10">
        <thead>
          <tr>
            <th className="px-6 py-3 text-center text-base font-semibold text-gray-800 uppercase tracking-wider">
              Coupon Code
            </th>

            <th className="px-6 py-3 text-center text-base font-semibold text-gray-800 uppercase tracking-wider">
              Expire Date
            </th>

            <th className="px-6 py-3 text-center text-base font-semibold text-gray-800 uppercase tracking-wider">
              Coupon Description
            </th>

            <th className="px-6 py-3 text-center  text-base font-semibold text-gray-800 uppercase tracking-wider">
              Discount Amount
            </th>

            <th className="px-6 py-3 text-center text-base font-semibold text-gray-800 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {allCoupons.map((coupon) => (
            <tr key={coupon._id}>
              <td className="px-6 text-center py-4 text-lg font-medium italic whitespace-nowrap text-gray-700">
                {coupon?.couponCode}
              </td>
              <td className="text-center py-4 text-xl font-medium whitespace-nowrap text-gray-700">
                {coupon?.expireDate}
              </td>
              <td className="text-center py-4 text-lg font-medium whitespace-nowrap text-gray-700">
                {coupon?.description}
              </td>
              <td className="text-center py-4 text-xl font-medium whitespace-nowrap text-gray-700">
                ${coupon?.amount}
              </td>

              <td className="px-6 flex gap-6 justify-center py-4 whitespace-nowrap">
                <Link to={`/editCoupon/${coupon._id}`}>
                  <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(coupon._id)}
                  className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ShowCoupon;
