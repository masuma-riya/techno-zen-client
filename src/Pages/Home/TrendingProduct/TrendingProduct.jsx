import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../../Layout/Loader";
import { useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const TrendingProduct = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filter, setFilter] = useState("desc");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["trendingProducts"],
    queryFn: async () =>
      await axiosPublic.get(`/trendingProducts/?upVote=${filter}`),
  });

  const allTrendingProduct = data?.data;

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

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader></Loader>
      </div>
    );
  }
  return (
    <div className="w-11/12 mx-auto mt-16">
      <h1 className="text-3xl mb-10 font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
        Trending Products
      </h1>
      <div className="grid gap-24 w-full h-full lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {allTrendingProduct?.slice(0, 6).map((trending) => (
          <div key={trending._id} className="rounded overflow-hidden shadow-lg">
            <img
              className="w-full h-64"
              src={trending.productImage}
              alt="Sunset in the mountains"
            />
            <div className="flex justify-end mt-3 mr-4 gap-5">
              <button
                onClick={() => {
                  if (trending.voters?.includes(user?.email)) {
                    toast.error("You've already voted this product");
                  } else {
                    handleVoteCount(trending);
                  }
                }}
                disabled={user?.email === trending?.email}
                className={`py-1 px-4 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-300 h-8 text-sm flex items-center gap-1 lg:gap-2 ${
                  user?.email === trending?.email
                    ? "cursor-not-allowed opacity-60 hover:text-black"
                    : ""
                }`}
              >
                <BiUpvote className="text-xl"></BiUpvote>
                <span className="text-lg">{trending.upVote || 0}</span>
              </button>
              <button className="py-1 px-4 hover:text-red-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2">
                <BiDownvote className="hover:text-red-600 text-xl"></BiDownvote>
                <span className="text-lg">0</span>
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-2xl mb-1">
                {trending.productName}
              </div>
            </div>
            <div className="px-6 pb-6 flex flex-wrap gap-3">
              {Array.isArray(trending?.tags) &&
                trending?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 rounded-full px-3 py-1 text-base font-semibold text-green-600  mr-2"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProduct;
