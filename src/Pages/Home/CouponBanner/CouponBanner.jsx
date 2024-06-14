import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../../Layout/Loader";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast from "react-hot-toast";

const CouponBanner = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => await axiosPublic.get("/coupons"),
  });

  const allCoupons = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader></Loader>
      </div>
    );
  }

  const handleCopyCoupon = (couponCode) => {
    navigator.clipboard.writeText(couponCode);
    toast.success("Coupon code copied to clipboard: " + couponCode);
  };

  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showStatus={true}
      showThumbs={false}
      interval={5000}
      transitionTime={2000}
    >
      {allCoupons.map((coupon) => (
        <div
          key={coupon._id}
          className="container bg-gradient-to-r from-indigo-500 to-violet-300 text-white p-8 rounded-lg shadow-lg max-w-xl mx-auto"
        >
          <div className="text-3xl font-bold mb-4">Special Discount!</div>
          <div className="text-xl mb-4">
            Get{" "}
            <span className="text-yellow-400 font-bold text-2xl">
              {" "}
              $ {coupon?.amount}
            </span>{" "}
            <span className="text-yellow-400 font-bold">Offer</span> to Purchase
            Membership..!
          </div>
          <div className="text-lg mb-6">
            Coupon Details : {coupon?.description}
          </div>
          <div className="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
            <span className="text-2xl font-semibold">{coupon?.couponCode}</span>
            <button
              onClick={() => handleCopyCoupon(coupon?.couponCode)}
              className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Copy
            </button>
          </div>
          <div className="text-lg mt-4 mb-4">
            <p>
              Valid until{" "}
              <span className="font-semibold">{coupon?.expireDate}</span>
            </p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CouponBanner;
