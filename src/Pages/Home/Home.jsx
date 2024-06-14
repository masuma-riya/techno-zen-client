import Banner from "./Banner/Banner";
import CouponBanner from "./CouponBanner/CouponBanner";
import ExtraSec from "./ExtraSec/ExtraSec";
import ExtraSec2 from "./ExtraSec2/ExtraSec2";
import FeaturedProduct from "./FeaturedProduct/FeaturedProduct";
import Hero from "./Hero/Hero";
import TrendingProduct from "./TrendingProduct/TrendingProduct";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <FeaturedProduct></FeaturedProduct>
      <Banner></Banner>
      <TrendingProduct></TrendingProduct>
      <CouponBanner></CouponBanner>
      <ExtraSec2></ExtraSec2>
      <ExtraSec></ExtraSec>
    </div>
  );
};

export default Home;
