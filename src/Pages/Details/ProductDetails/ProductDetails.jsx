import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loader from "../../../Layout/Loader";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import PostReview from "../PostReview/PostReview";
import AllReviews from "../AllReviews/AllReviews";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";

const ProductDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => await axiosSecure.get(`/allProducts/${id}`),
  });

  const { mutateAsync: voteIncrement } = useMutation({
    mutationFn: async () =>
      await axiosSecure.put(`/voteCount/${id}`, { userEmail: user?.email }),
  });

  const handleVoteCount = async () => {
    try {
      await voteIncrement();
      refetch();
      toast("Woww! Vote done", {
        icon: "👏",
      });
    } catch (error) {
      // toast.error(error.response?.data?.message || "Error voting for product");
      console.log(error || "Error voting for product");
    }
  };

  const handleReportedProduct = async (productId) => {
    try {
      await axiosSecure.put(`/reportdProduct/${productId}`, {
        status: "Reported",
      });
      refetch();
      console.log("Product Feedback change successfully");
      toast.success("We'll consider your Feedback.. Thanks!");
    } catch (error) {
      console.error("Error Type updating product:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader></Loader>
      </div>
    );
  }

  const {
    productName,
    productImage,
    description,
    tags,
    link,
    upVote,
    _id,
    ProductFeedback,
    voters,
    email,
  } = data.data;
  return (
    <>
      <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-lg w-11/12 mx-auto md:flex-row flex-col">
        <div className="relative md:w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
          <img src={productImage} className="object-cover w-full h-full" />
        </div>
        <div className="p-6">
          <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
            {Array.isArray(tags) &&
              tags?.map((tag, index) => (
                <span
                  key={index}
                  className="mr-2 mb-2 bg-green-100 text-green-600 py-1 px-2 rounded-full text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
          </h6>
          <h4 className="block mb-6 mt-6 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {productName}
          </h4>
          <p className="block mb-5 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
            {description}
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xl antialiased font-medium text-blue-700 hover:underline leading-snug tracking-normal text-blue-gray-900"
          >
            {link}
          </a>
          <div className="flex gap-6 justify-end">
            <button
              onClick={() => {
                if (voters?.includes(user?.email)) {
                  toast.error("You've already voted this product");
                } else {
                  handleVoteCount();
                }
              }}
              disabled={user?.email === email}
              className={`py-1 px-4 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-300 h-8 text-sm flex items-center gap-1 lg:gap-2 ${
                user?.email === email
                  ? "cursor-not-allowed opacity-60 hover:text-black"
                  : ""
              }`}
            >
              <BiUpvote className="text-2xl"></BiUpvote>
              <span className="text-lg">{upVote}</span>
            </button>
            <button className="py-1 px-4 hover:text-red-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2">
              <BiDownvote className="hover:text-red-600 text-2xl"></BiDownvote>
              <span className="text-lg">0</span>
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleReportedProduct(_id)}
            className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-xl px-6 italic py-1.5 m-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {ProductFeedback === "Reported" ? "Reported" : "Report"}
          </button>
        </div>
      </div>
      <PostReview productId={_id} />
      <AllReviews productId={_id} />
    </>
  );
};

export default ProductDetails;
