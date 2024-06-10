import Banner from "./Banner/Banner";
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
      <ExtraSec2></ExtraSec2>
      <TrendingProduct></TrendingProduct>
      <ExtraSec></ExtraSec>
    </div>
  );
};

export default Home;
