import { BiDownvote, BiUpvote } from "react-icons/bi";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../../../Layout/Loader";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const FeaturedProduct = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["featuredPro"],
    queryFn: async () => await axiosPublic.get("/featuredPro"),
  });

  const allFeaturedProduct = data?.data;

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
    <>
      <section className="bg-white mt-10 dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            Featured Products
          </h1>
          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-10 md:grid-cols-2">
            {allFeaturedProduct?.slice(0, 4).map((featured) => (
              <div key={featured._id} className="lg:flex">
                <img
                  className="object-cover w-full h-56 rounded-lg lg:w-64"
                  src={featured.productImage}
                  alt=""
                />
                <div className="flex flex-col lg:mx-6">
                  <a className="text-3xl mt-2 font-semibold text-gray-800 hover:underline dark:text-white">
                    {featured.productName}
                  </a>
                  <a className="text-sm mt-4 font-semibold text-gray-500  dark:text-white">
                    {new Date(featured.timestamp).toLocaleString()}
                  </a>
                  <div className="flex flex-wrap mt-6 gap-3 items-center">
                    {Array.isArray(featured?.tags) &&
                      featured?.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-600 py-1 px-2 rounded-3xl text-sm font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                  <div className="flex mt-10 gap-2">
                    <button
                      onClick={() => {
                        if (featured.voters?.includes(user?.email)) {
                          toast.error("You've already voted this product");
                        } else {
                          handleVoteCount(featured);
                        }
                      }}
                      disabled={user?.email === featured?.email}
                      className={`py-1 px-4 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-300 h-8 text-sm flex items-center gap-1 lg:gap-2 ${
                        user?.email === featured?.email
                          ? "cursor-not-allowed opacity-60 hover:text-black"
                          : ""
                      }`}
                    >
                      <BiUpvote className="text-xl"></BiUpvote>
                      <span className="text-lg">{featured.upVote || 0}</span>
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
        </div>
      </section>
    </>
  );
};

export default FeaturedProduct;
