import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../Layout/Loader";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MyProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => await axiosSecure.get(`/myProducts/${user?.email}`),
  });

  const { mutateAsync: deleteProduct } = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/allProducts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myProducts"]);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader></Loader>
      </div>
    );
  }

  const myProducts = data.data;

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this Product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your Product has been deleted.",
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

  return (
    <>
      <table className="min-w-full mt-10 mb-10 divide-y divide-gray-200">
        <Helmet>
          <title>Techno Zen | My Products</title>
        </Helmet>
        <thead>
          <tr>
            <th className="px-6 py-3 text-center text-lg font-bold text-gray-500 uppercase tracking-wider">
              Name
            </th>

            <th className="px-6 py-3 text-center  text-lg font-bold text-gray-500 uppercase tracking-wider">
              Total Votes
            </th>

            <th className="px-6 py-3 text-center  text-lg font-bold text-gray-500 uppercase tracking-wider">
              Status
            </th>

            <th className="px-6 py-3 text-center  text-lg font-bold text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {myProducts.map((product) => (
            <tr key={product._id}>
              <td className="px-6 text-center py-4 text-xl font-bold italic whitespace-nowrap">
                {product.productName}
              </td>
              <td className="flex justify-center py-4 text-2xl font-medium whitespace-nowrap">
                {product.upVote}
              </td>
              <td className="whitespace-nowrap text-center">
                <span
                  className={`px-3 text-center py-1 text-base font-semibold inline-flex leading-5 rounded-3xl ${
                    product.ProductStatus === "Accepted"
                      ? "bg-green-300 text-slate-700"
                      : product.ProductStatus === "Pending"
                      ? "bg-slate-200 text-slate-700"
                      : "bg-red-300 text-slate-700"
                  }`}
                >
                  {product.ProductStatus}
                </span>
              </td>

              <td className="px-6 flex gap-6 justify-center py-4 whitespace-nowrap">
                <Link to={`/updateProduct/${product._id}`}>
                  <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
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

export default MyProducts;
