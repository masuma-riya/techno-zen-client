import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const PostReview = ({ productId }) => {
  const { user } = useAuth();
  const { displayName, photoURL } = user;
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);

  const { mutateAsync: addReview } = useMutation({
    mutationFn: async (usersReview) =>
      await axiosSecure.post("/addReview", usersReview),
  });

  const handleAddFood = async (event) => {
    event.preventDefault();

    const form = event.target;
    const feedback = form.feedback.value;

    const usersReview = {
      displayName,
      photoURL,
      feedback,
      rating,
      productId,
    };

    try {
      await addReview(usersReview);
      form.reset();
      setRating(0);
      toast.success("Thanks for your Feedback");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleAddFood}
      className="w-7/12 mx-auto mt-20 p-6 bg-white border rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Feedback Form</h2>
      <div className="mb-8">
        <label className="block text-gray-700 font-bold mb-3" htmlFor="name">
          Name :
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 font-semibold italic text-xl leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          defaultValue={displayName}
          readOnly
        />
      </div>
      <div className="">
        <label className="block text-gray-700 font-bold mb-3" htmlFor="photo">
          PhotoURL :
        </label>
        <input
          className="shadow text-base appearance-none border rounded w-full py-2 px-3 text-gray-900 font-medium leading-tight focus:outline-none focus:shadow-outline"
          id="photo"
          type="text"
          name="photo"
          placeholder="Your photoURL"
          defaultValue={photoURL}
          readOnly
        />
      </div>
      <div className="mb-6 mt-6">
        <Rating value={rating} onChange={setRating} style={{ maxWidth: 230 }} />
      </div>
      <div className="mb-4">
        <label
          className="block mt-4 text-gray-700 font-bold mb-3"
          htmlFor="feedback"
        >
          Your Feedback :
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="feedback"
          name="feedback"
          rows={5}
          placeholder="Enter your feedback"
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default PostReview;
