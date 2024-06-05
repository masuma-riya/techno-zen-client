import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

const AllReviews = ({ productId }) => {
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => await axiosSecure.get("/allReviews"),
  });

  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    if (data) {
      const allReviews = data.data;
      const reviewsProduct = allReviews.filter(
        (review) => review.productId === productId
      );
      setProductReviews(reviewsProduct);
    }
  }, [data, productId]);

  return (
    <section className="py-6 mt-16 bg-gray-200 shadow-md rounded-xl w-11/12 mx-auto">
      <div className="max-w-6xl  mx-auto px-8 md:px-10 lg:px-20 xl:px-auto">
        {productReviews.length === 0 ? (
          <p className="text-center text-lg">
            No reviews found for this product.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {productReviews.map((review) => (
              <div key={review._id} className="text-sm leading-6">
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-700 shadow-2xl ring-1 ring-gray-900/5">
                    <div className="flex items-center space-x-4">
                      <img
                        src={review.photoURL}
                        className="w-12 h-12 bg-center bg-cover border rounded-full"
                        alt=""
                      />
                      <div>
                        <h3 className="text-xl  mb-2 font-semibold text-white">
                          {review.displayName}
                        </h3>
                        <Rating
                          value={review.rating}
                          style={{ maxWidth: 150 }}
                          readOnly
                        />
                      </div>
                    </div>
                    <p className="leading-normal text-gray-300 text-base italic">
                      {review.feedback}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllReviews;
