import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddCoupon = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { mutateAsync: addCoupon } = useMutation({
    mutationFn: async (newCoupon) =>
      await axiosSecure.post("/coupons", newCoupon),
    onSuccess: () => {
      queryClient.refetchQueries("coupons");
    },
  });

  const handleAddCoupon = async (event) => {
    event.preventDefault();

    const form = event.target;

    const couponCode = form.couponCode.value;
    const expireDate = form.expireDate.value;
    const description = form.description.value;
    const amount = form.amount.value;

    const newCoupon = {
      couponCode,
      expireDate,
      description,
      amount,
    };

    try {
      await addCoupon(newCoupon);
      form.reset();
      Swal.fire({
        title: "Success",
        text: "Coupon added successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Request failed",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center sm:px-6 lg:px-8">
      <h2 className="mt-2 italic text-center text-3xl leading-9 font-semibold text-gray-900">
        Add a Coupon
      </h2>

      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleAddCoupon}>
            <div>
              <label
                htmlFor="couponCode"
                className="block text-sm font-medium leading-5  text-gray-700"
              >
                Coupon Code
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="couponCode"
                  name="couponCode"
                  placeholder="Enter a Coupon Code"
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="expireDate"
                className="block text-sm font-medium leading-5  text-gray-700"
              >
                Expiry Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="expireDate"
                  name="expireDate"
                  placeholder="Enter Expire Date"
                  type="date"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5
          "
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Coupon code Description
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Describe About the Coupon"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="amount"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Discount Amount
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="amount"
                  name="amount"
                  type="price"
                  placeholder="Enter Discount Amount"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Add Coupon
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoupon;
