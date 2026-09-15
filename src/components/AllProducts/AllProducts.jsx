import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const AllProducts = () => {
  const { refetch, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_HOST_URL}/products`);
      return res.data;
    },
  });
  console.log(products);
  return (
    <div>
      <h1 className="text-xl font-bold text-center">All Products</h1>
      <p>Total Products: {products.length}</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Product Image */}
            <div className="h-56 w-full overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                  {product.category}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.condition === "used"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {product.condition}
                </span>
              </div>

              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {product.title}
              </h3>

              <p className="mb-3 text-sm text-gray-500">
                {product.description}
              </p>

              {/* Price */}
              <p className="mb-3 text-lg font-bold text-green-600">
                ৳{product.price_min.toLocaleString()} - ৳
                {product.price_max.toLocaleString()}
              </p>

              {/* Location */}
              <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                <span>📍 {product.location}</span>
                <span>{product.usage}</span>
              </div>

              {/* Button */}
              <Link
                to={`/products/${product._id}`}
                className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
