import { BiDownvote } from "react-icons/bi";
import { BiUpvote } from "react-icons/bi";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import useAccPro from "../../Hooks/useAccPro";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Products = () => {
  const [acceptedProducts, , refetch] = useAccPro();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync: voteIncrement } = useMutation({
    mutationFn: async ({ id, userEmail }) =>
      await axiosSecure.put(`/voteCount/${id}`, { userEmail }),
  });
  const handleVoteCount = async (product) => {
    if (!user) {
      navigate("/login");
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
  return (
    <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {acceptedProducts?.map((product) => (
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
  );
};

export default Products;
