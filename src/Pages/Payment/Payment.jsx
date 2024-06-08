import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout/Checkout";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { updateUserProfile } = useContext(AuthContext);

  const handlePaymentSuccess = async () => {
    try {
      // Update user's membership status upon successful purchase
      const updatedUser = { ...user, isMember: true };
      const res = await axiosSecure.post("/users", updatedUser);
      if (res.data.insertedId) {
        // Update user data in the auth context
        updateUserProfile(updatedUser);
        // Redirect to the payment history page or any other appropriate page
        navigate("/dashboard/profile");
      } else {
        // Handle update failure
      }
    } catch (error) {
      // Handle error
    }
  };
  return (
    <div className="max-w-5xl mx-auto flex justify-center py-5">
      <div>
        <div>
          <button className="text-3xl font-bold">
            Subscription Amount: $ 100
          </button>
        </div>
        <div className="mt-6">
          <Elements stripe={stripePromise}>
            <Checkout onSuccess={handlePaymentSuccess}></Checkout>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
