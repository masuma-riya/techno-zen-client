import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ReportedCon = () => {
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["reportedProduct"],
    queryFn: async () => await axiosSecure.get("/reportedProduct"),
  });

  const allReportedContent = data?.data;
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
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 text-2xl font-medium border-b border-grey-light">
                  New York
                </td>
                <td className="py-4 px-7 border-b border-grey-light">
                  <button className="text-white font-bold py-1 px-3 rounded text-base bg-green-600 dark:hover:bg-green-600">
                    View Details
                  </button>
                </td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <button className="text-white font-bold py-1 px-3 rounded text-base bg-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReportedCon;
