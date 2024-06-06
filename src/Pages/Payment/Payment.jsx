import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout/Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
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
            <Checkout></Checkout>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
