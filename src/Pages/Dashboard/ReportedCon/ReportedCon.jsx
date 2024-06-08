import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Layout/Loader";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const ReportedCon = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["reportedProduct"],
    queryFn: async () => await axiosSecure.get("/reportedProduct"),
  });

  const allReportedContent = data?.data;

  const queryClient = useQueryClient();
  const { mutateAsync: deleteFood } = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["reportedPro"]);
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this Food!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteFood(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your Food has been deleted.",
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
      {/* component */}
      <div className="w-2/3 mx-auto">
        <div className="bg-white shadow-md rounded my-6">
          <table className="text-left w-full border-collapse">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Product Name
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Product Details
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allReportedContent?.map((reported) => (
                <tr key={reported._id} className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 text-2xl font-medium border-b border-grey-light">
                    {reported.productName}
                  </td>
                  <td className="py-4 px-7 border-b border-grey-light">
                    <NavLink to={`/details/${reported._id}`}>
                      {" "}
                      <button className="text-white font-bold py-1 px-3 rounded text-base bg-green-600 dark:hover:bg-green-600">
                        View Details
                      </button>
                    </NavLink>
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    <button
                      onClick={() => handleDelete(reported._id)}
                      className="text-white font-bold py-1 px-3 rounded text-base bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReportedCon;
