import FeaturedProduct from "./FeaturedProduct/FeaturedProduct";
import Hero from "./Hero/Hero";
import TrendingProduct from "./TrendingProduct/TrendingProduct";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <FeaturedProduct></FeaturedProduct>
      <TrendingProduct></TrendingProduct>
    </div>
  );
};

export default Home;
