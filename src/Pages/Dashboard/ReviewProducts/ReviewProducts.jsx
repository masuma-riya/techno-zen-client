import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useProducts from "../../../Hooks/useProducts";

const ReviewProducts = () => {
  const [products, , refetch] = useProducts();
  const axiosPublic = useAxiosPublic();

  // getitem from localStorage
  const initialDisabledButtons =
    JSON.parse(localStorage.getItem("disabledButtons")) || {};
  const [disabledButtons, setDisabledButtons] = useState(
    initialDisabledButtons
  );

  useEffect(() => {
    // setitem to localstorage
    localStorage.setItem("disabledButtons", JSON.stringify(disabledButtons));
  }, [disabledButtons]);

  const handleAcceptProduct = async (productId) => {
    try {
      await axiosPublic.put(`/acceptedProduct/${productId}`, {
        status: "Accepted",
      });
      setDisabledButtons((prev) => ({ ...prev, [productId]: true }));
      refetch();
      console.log("Product accepted successfully");
    } catch (error) {
      console.error("Error accepting product:", error);
    }
  };
  const handleRejectProduct = async (productId) => {
    try {
      await axiosPublic.put(`/rejectedProduct/${productId}`, {
        status: "Rejected",
      });
      setDisabledButtons((prev) => ({ ...prev, [productId]: true }));
      refetch();
      console.log("Product rejected successfully");
    } catch (error) {
      console.error("Error rejecting product:", error);
    }
  };

  // Sort products based on ProductStatus
  const sortedProducts = [...products].sort((a, b) => {
    if (a.ProductStatus === "Pending") {
      return -1; // Move 'a' before 'b' if 'a' is "Pending"
    }
    if (a.ProductStatus === "Accepted" && b.ProductStatus === "Rejected") {
      return -1; // Move 'a' before 'b' if 'a' is "Accepted" and 'b' is "Rejected"
    }
    if (a.ProductStatus === "Rejected" && b.ProductStatus !== "Rejected") {
      return 1; // Move 'b' before 'a' if 'a' is "Rejected" and 'b' is not "Rejected"
    }
    return 0; // Keep the order unchanged otherwise
  });

  return (
    <>
      {/* component */}
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="p-6 overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                    Product Image
                  </p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                    Product Name
                  </p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                    Status
                  </p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                    Accept
                  </p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                    Reject
                  </p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                    Featured
                  </p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                    Details
                  </p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70" />
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => (
                <tr key={product._id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.productImage}
                        className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-semibold italic text-gray-700 text-xl leading-normal text-blue-gray-900">
                      {product.productName}
                    </p>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <div
                        className="relative mx-3 grid items-center font-sans font-bold whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md"
                        style={{ opacity: 1 }}
                      >
                        <span>{product.ProductStatus}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      onClick={() => handleAcceptProduct(product._id)}
                      disabled={disabledButtons[product._id]}
                      className={`mx-4 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline ${
                        disabledButtons[product._id]
                          ? "cursor-not-allowed bg-blue-300 hover:bg-blue-300"
                          : ""
                      }`}
                    >
                      Accept
                    </button>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      onClick={() => handleRejectProduct(product._id)}
                      disabled={disabledButtons[product._id]}
                      className={`text-[15px] bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline ${
                        disabledButtons[product._id]
                          ? "cursor-not-allowed bg-red-200 hover:bg-red-200"
                          : ""
                      }`}
                    >
                      Reject
                    </button>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900">
                      <span className="relative px-4 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Make Feature
                      </span>
                    </button>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white">
                      <span className="relative px-4 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        View Details
                      </span>
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

export default ReviewProducts;
