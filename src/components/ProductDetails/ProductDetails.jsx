import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import React, { use, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Bidlist from "./Bidlist";

// Apply saved theme before first render
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

const ProductDetails = () => {
  // const { user } = use(AuthContext);
  const { _id: id } = useLoaderData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState(savedTheme);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user: userID } = use(AuthContext);
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/users`);
      return res.data?.data;
    },
  });

  const myProfile = users.find((user) => user.email === userID?.email);

  // Product details page loading query
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_HOST_URL}/products/${id}`,
      );
      return res.data;
    },
  });
  console.log(product);

  console.log(myProfile?.email);

  const { refetch: refetchExistingBid, data: existingBid = null } = useQuery({
    queryKey: ["existingBid", id, myProfile?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_HOST_URL}/bids/check`,
        {
          params: {
            productId: id,
            buyerEmail: myProfile?.email,
          },
        },
      );

      return res.data;
    },
    enabled: !!id && !!myProfile?.email,
  });
  console.log("existingBid:", existingBid);

  const { refetch: refetchBids, data: bids = [] } = useQuery({
    queryKey: ["bids", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/bids`, {
        params: {
          productId: id,
        },
      });

      return res.data.data;
    },
    enabled: !!id,
  });
  console.log("products bids", bids);

  // submit bid data
  const handleSubmitBid = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;

    const bidinfo = {
      product_id: id,
      buyer_image: form.buyerImage.value.trim(),
      buyer_name: form.buyerName.value.trim(),
      buyer_contact: form.buyerContact.value.trim(),
      buyer_email: form.buyerEmail.value.trim(),
      bid_price: form.bidPrice.value.trim(),
    };

    console.log("Bid Info:", bidinfo);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_HOST_URL}/bids`,
        bidinfo,
      );

      console.log("POST response:", res.data);

      if (res.data.success) {
        // প্রথমে নতুন bid list reload
        await refetchBids();

        // existing bid check reload
        await refetchExistingBid();

        // তারপর modal close
        setIsModalOpen(false);

        // form reset
        form.reset();

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.data.message,
          confirmButtonText: "Okay",
        });
      }
    } catch (error) {
      console.error("Bid submit error:", error);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        confirmButtonText: "Okay",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Back Button */}
      <Link
        to="/products"
        className="mb-6 inline-block text-sm font-medium text-gray-500 hover:text-blue-600"
      >
        ← Back to Products
      </Link>

      <div className="grid overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-2">
        {/* Product Image */}
        <div className="h-full min-h-[450px] bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col p-6 md:p-8">
          {/* Category + Status */}
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600">
              {product.category}
            </span>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold capitalize text-yellow-700">
              {product.status}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          {/* Price */}
          <p className="mt-4 text-2xl font-bold text-green-600">
            ৳{product.price_min?.toLocaleString()} - ৳
            {product.price_max?.toLocaleString()}
          </p>

          {/* Product Details */}
          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
            <div>
              <p className="text-sm text-gray-400">Condition</p>
              <p className="mt-1 font-semibold capitalize text-gray-800">
                {product.condition}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Usage</p>
              <p className="mt-1 font-semibold text-gray-800">
                {product.usage}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Location</p>
              <p className="mt-1 font-semibold text-gray-800">
                📍 {product.location}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Seller</p>
              <p className="mt-1 font-semibold text-gray-800">
                {product.seller_name}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-900">Description</h2>

            <p className="mt-2 leading-7 text-gray-600">
              {product.description}
            </p>
          </div>

          {/* Seller */}
          <div className="mt-6 flex items-center gap-3 border-t pt-5">
            <img
              src={product.seller_image}
              alt={product.seller_name}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold text-gray-800">
                {product.seller_name}
              </p>

              <p className="text-sm text-gray-500">{product.email}</p>
            </div>
          </div>

          {/* Bid Button */}
          <button
            disabled={!!existingBid}
            onClick={() => setIsModalOpen(true)}
            className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3.5 text-lg font-bold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            {existingBid ? "Already Bid" : "I want buy this product"}
          </button>
        </div>

        {/* Bid Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
              className={` w-full max-w-md rounded-2xl p-6  shadow-xl ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white  text-gray-900"} `}
            >
              {/* 1 */}
              <div className="flex items-center justify-between">
                <h2 className="w-full text-center font-semibold text-2xl mb-5 ">
                  Give Seller Your Offered Price
                </h2>
                {/* <button onClick={() => setIsModalOpen(false)}>X</button> */}
              </div>

              {/* 2 */}
              <div>
                <form onSubmit={handleSubmitBid} className="space-y-5">
                  {/* Buyer Name */}
                  <div>
                    <label className="mb-1 block font-medium">Buyer Name</label>

                    <input
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF385C] cursor-not-allowed"
                      type="text"
                      name="buyerName"
                      placeholder="Your name"
                      value={myProfile?.name || " "}
                      readOnly
                    />
                  </div>

                  {/* Buyer Email */}
                  <div>
                    <label className="mb-1 block font-medium">
                      Buyer Email
                    </label>

                    <input
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF385C] cursor-not-allowed"
                      type="email"
                      name="buyerEmail"
                      placeholder="Your Email"
                      value={myProfile?.email || " "}
                      readOnly
                    />
                  </div>

                  {/* Buyer Image URL */}
                  <div>
                    <label className="mb-1 block font-medium">
                      Buyer Image URL
                    </label>

                    <input
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
                      type="url"
                      name="buyerImage"
                      placeholder="https://...your_img_url"
                    />
                  </div>

                  {/* Place Your Price */}
                  <div>
                    <label className="mb-1 block font-medium">
                      Place your Price
                    </label>

                    <input
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
                      type="number"
                      name="bidPrice"
                      placeholder="e.g. 50000"
                    />
                  </div>

                  {/* Contact Info */}
                  <div>
                    <label className="mb-1 block font-medium">
                      Contact Info
                    </label>

                    <input
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
                      type="tel"
                      name="buyerContact"
                      placeholder="e.g. +8801XXXXXXXXX"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-lg border border-[#FF385C] px-5 py-2.5 font-medium text-[#FF385C] transition hover:bg-[#FF385C] hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-lg bg-[#FF385C] px-5 py-2.5 font-medium text-white transition hover:bg-[#e63250]"
                    >
                      Submit Bid
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white w-full mt-10 p-10 border border-gray-300 rounded-xl">
        <h1>bid profile</h1>
        <Bidlist bids={bids} product={product}></Bidlist>
      </div>
    </div>
  );
};

export default ProductDetails;
