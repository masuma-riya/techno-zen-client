import AddCoupon from "../AddCoupon/AddCoupon";
import ShowCoupon from "./ShowCoupon/ShowCoupon";

const Coupons = () => {
  return (
    <div>
      <AddCoupon></AddCoupon>
      <div className="mt-8">
        <ShowCoupon></ShowCoupon>
      </div>
    </div>
  );
};

export default Coupons;
