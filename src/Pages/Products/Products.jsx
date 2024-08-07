import { BiDownvote } from "react-icons/bi";
import { BiUpvote } from "react-icons/bi";
import useAuth from "../../Hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAccPro from "../../Hooks/useAccPro";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Layout/Loader";

const Products = () => {
  const [acceptedProducts, , refetch] = useAccPro();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const axiosPublic = useAxiosPublic();
  const InputRef = useRef();
  const queryClient = useQueryClient();

  const handleUseRef = () => {
    setSearch(InputRef.current.value);
  };

  const { data = [], isLoading } = useQuery({
    queryKey: [search, "proSearch"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/accPro?tag=${search}`);
      return res.data;
    },
  });

  const productsPerPage = 6;

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { mutateAsync: voteIncrement } = useMutation({
    mutationFn: async ({ id, userEmail }) =>
      await axiosSecure.put(`/voteCount/${id}`, { userEmail }),
    onSuccess: () => queryClient.invalidateQueries(["proSearch"]),
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleVoteCount = async (product) => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      await voteIncrement({ id: product._id, userEmail: user.email });
      refetch();
      toast("Woww! Vote done", {
        icon: "👏",
      });
    } catch (error) {
      // toast.error(error.response?.data?.message || "Error voting for product");
      console.log(error || "Error voting for product");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {/* Search */}

      <label
        className="mx-auto mt-10 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
        htmlFor="search-bar"
      >
        <input
          id=""
          name="searchBar"
          placeholder="Your Keyword here"
          className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
          ref={InputRef}
        />
        <button
          onClick={() => handleUseRef()}
          className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70"
        >
          <div className="relative">
            <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
              <svg
                className="opacity-0 animate-spin w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx={12}
                  cy={12}
                  r={10}
                  stroke="currentColor"
                  strokeWidth={4}
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <div className="flex items-center transition-all opacity-1 valid:">
              <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                Search
              </span>
            </div>
          </div>
        </button>
      </label>

      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {currentProducts?.map((product) => (
          <div
            key={product._id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={product.productImage}
              alt=""
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-72">
              <div className="flex flex-wrap h-16 items-center">
                {Array.isArray(product?.tags) &&
                  product?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="mr-2 mb-2 bg-green-100 text-green-600 py-1 px-2 rounded-full text-sm font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <NavLink to={`/details/${product._id}`}>
                <p className="text-2xl mt-1 hover:underline font-bold text-black">
                  {product.productName}
                </p>
              </NavLink>
              <p className="text-sm mt-4 h-32 font-semibold text-gray-500 italic">
                {product.description}
              </p>
              <button className="px-4 mt-2 bg-green-500 italic text-base text-white font-semibold rounded-xl py-1">
                {product.ProductStatus}
              </button>

              <div className="flex gap-2 mt-4 mb-3 justify-end">
                <button
                  onClick={() => {
                    if (product.voters?.includes(user?.email)) {
                      toast.error("You've already voted this product");
                    } else {
                      handleVoteCount(product);
                    }
                  }}
                  disabled={user?.email === product?.email}
                  className={`py-1 px-4 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-300 h-8 text-sm flex items-center gap-1 lg:gap-2 ${
                    user?.email === product?.email
                      ? "cursor-not-allowed opacity-60 hover:text-black"
                      : ""
                  }`}
                >
                  <BiUpvote className="text-xl"></BiUpvote>
                  <span className="text-lg">{product?.upVote || 0}</span>
                </button>
                <button className="py-1 px-4 hover:text-red-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2">
                  <BiDownvote className="hover:text-red-600 text-xl"></BiDownvote>
                  <span className="text-lg">0</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-14">
        {Array.from({
          length: Math.ceil(acceptedProducts.length / productsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-6 py-2 text-3xl mx-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none ${
              currentPage === index + 1 ? "bg-gray-500" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
