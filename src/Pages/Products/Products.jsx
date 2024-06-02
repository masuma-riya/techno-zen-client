import useProducts from "../../Hooks/useProducts";
import { BiDownvote } from "react-icons/bi";
import { BiUpvote } from "react-icons/bi";

const Products = () => {
  const [products] = useProducts();
  return (
    <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {products.map((product) => (
        <div
          key={product._id}
          className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
        >
          <img
            src={product.productImage}
            alt=""
            className="h-80 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="mr-3 font-bold text-green-600 text-lg">
              # {""}
              {product.tags}
            </span>
            <p className="text-2xl mt-3 hover:underline font-bold text-black">
              {product.productName}
            </p>
            <p className="text-sm mt-4 h-32 font-semibold text-gray-500 italic">
              {product.description}
            </p>

            <div className="flex gap-2 mt-4 mb-3 justify-end">
              <button className="py-1 px-4 hover:text-green-600 hover:scale-105 hover:shadow text-center border b rounded-md border-gray-300 h-8 text-sm flex items-center gap-1 lg:gap-2">
                <BiUpvote className="hover:text-green-600 text-xl"></BiUpvote>
                <span className="text-lg">42</span>
              </button>
              <button className="py-1 px-4 hover:text-red-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2">
                <BiDownvote className="hover:text-red-600 text-xl"></BiDownvote>
                <span className="text-lg">12</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
