import { useState } from "react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import Loader from "../../../../Layout/Loader";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const [tags, setTags] = useState([]);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => await axiosSecure.get(`/allProducts/${id}`),
  });

  const { mutateAsync: updateProduct } = useMutation({
    mutationFn: async (updateProduct) =>
      await axiosSecure.put(`/allProducts/${id}`, updateProduct),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader />
      </div>
    );
  }

  const product = data?.data;
  const { productName, productImage, description, link } = product;

  const handleUpdateProduct = async (event) => {
    event.preventDefault();

    const form = event.target;

    const updatedPro = {
      productName: form.productName.value,
      productImage: form.productImage.value,
      description: form.description.value,
      link: form.link.value,
    };

    try {
      await updateProduct(updatedPro);
      Swal.fire({
        title: "Success!",
        text: "Product Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
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

  // Tags handlers
  //   const handleDelete = (index) => {
  //     setTags(tags.filter((_, i) => i !== index));
  //   };

  //   const handleAddition = (tag) => {
  //     setTags([...tags, tag]);
  //   };

  //   const handleDrag = (tag, currPos, newPos) => {
  //     const newTags = tags.slice();
  //     newTags.splice(currPos, 1);
  //     newTags.splice(newPos, 0, tag);
  //     setTags(newTags);
  //   };

  //   const handleTagClick = (index) => {
  //     console.log("The tag at index " + index + " was clicked");
  //   };

  //   const onClearAll = () => {
  //     setTags([]);
  //   };

  return (
    <>
      <div className="leading-loose w-9/12 mx-auto">
        <form
          onSubmit={handleUpdateProduct}
          className="w-9/12 mx-auto p-10 bg-white rounded shadow-xl"
        >
          <p className="text-gray-800 text-2xl mb-7 font-bold">
            Product Information
          </p>
          <div className>
            <label
              className="block text-base font-semibold mb-2"
              htmlFor="productName"
            >
              Product Name
            </label>
            <input
              className="w-full outline-none text-lg font-semibold px-5 py-1 text-black italic bg-gray-100 rounded"
              id="productName"
              name="productName"
              type="text"
              defaultValue={productName}
            />
          </div>
          <div className="mt-2">
            <label
              className="block text-base font-semibold mb-2 mt-5"
              htmlFor="productImage"
            >
              Product Image
            </label>
            <input
              className="w-full outline-none px-5  py-2 text-black font-semibold bg-gray-100 rounded"
              id="productImage"
              name="productImage"
              type="text"
              defaultValue={productImage}
            />
          </div>
          <div className="mt-2">
            <label
              className="block text-base font-semibold mb-3 mt-5"
              htmlFor="description"
            >
              Product Description
            </label>
            <input
              className="w-full outline-none px-2 py-2 font-semibold text-black  bg-gray-100 rounded"
              id="description"
              name="description"
              type="text"
              defaultValue={description}
            />
          </div>
          <div className="mt-2">
            <label
              className="block text-base font-semibold mb-3 mt-5"
              htmlFor="link"
            >
              External Link
            </label>
            <input
              className="w-full outline-none px-2 py-2 text-black font-semibold bg-gray-100 rounded"
              id="link"
              name="link"
              type="text"
              defaultValue={link}
            />
          </div>
          {/* <div className="mb-6">
            <label
              className="block text-base font-semibold mb-3 mt-5"
              htmlFor="tags"
            >
              Tags
            </label>

            <ReactTags
              tags={tags}
              suggestions={[]}
              separators={[SEPARATORS.SPACE, SEPARATORS.COMMA]}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              handleTagClick={handleTagClick}
              onClearAll={onClearAll}
              maxTags={6}
              placeholder="Type a tag and hit spacebar"
              classNames={{
                tagInputField:
                  "w-full outline-none px-2 py-2 text-gray-700 bg-gray-200 rounded",
              }}
            />
          </div> */}
          <div className="mt-7">
            <button
              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
              type="submit"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
