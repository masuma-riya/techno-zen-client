import { useForm } from "react-hook-form";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const onSubmit = async (data) => {
    console.log(data);
    const res = await axiosSecure.post("/products", {
      productName: data.productName,
      productImage: data.productImage,
      description: data.description,
      tags: data.tags,
      link: data.link,
      username: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
    });

    if (res.data.insertedId) {
      reset();
      Swal.fire({
        title: "Great!",
        text: `Your product (${data.productName}) is added`,
        icon: "success",
      });
    }
    console.log(res.data);
  };
  return (
    <div className="container mx-auto p4-10">
      <div className="mx-auto bg-white rounded-lg overflow-hidden max-w-3xl">
        <div className="md:flex">
          <div className="w-full px-6 py-8 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800">Add Product</h2>
            <p className="mt-4 text-gray-600">
              Please add your suggested or your own product!
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="productName"
                >
                  Product Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="productName"
                  {...register("productName", { required: true })}
                  type="text"
                  placeholder="Product Name"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="productImage"
                >
                  Product Image
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="productImage"
                  type="text"
                  placeholder="Product Image"
                  {...register("productImage", { required: true })}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  type="text"
                  placeholder="Product Description"
                  {...register("description", { required: true })}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="tags"
                >
                  Tags
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="tags"
                  type="text"
                  placeholder="Product Tags"
                  {...register("tags", { required: true })}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="link"
                >
                  External Link Of Product
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="link"
                  type="text"
                  placeholder="Product Link"
                  {...register("link", { required: true })}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Owner Name"
                  // {...register("username", { required: true })}
                  name="username"
                  defaultValue={user?.displayName}
                  readOnly
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Owner Email"
                  // {...register("email", { required: true })}
                  name="email"
                  defaultValue={user?.email}
                  readOnly
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="photoURL"
                >
                  Photo URL
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="photoURL"
                  type="text"
                  placeholder="Owner Photo URL"
                  // {...register("photoURL", { required: true })}
                  name="photoURL"
                  defaultValue={user?.photoURL}
                  readOnly
                />
              </div>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
