import { createBrowserRouter } from "react-router";
import Home from "../components/Home/Home";
import RootLayout from "../layout/RootLayout";
import AllProducts from "../components/AllProducts/AllProducts";
import AuthLayout from "../layout/AuthLayout";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import PrivetRoute from "../components/PrivetRoute/PrivetRoute";
import MyProducts from "../components/MyProducts/MyProducts";
import MyProfile from "../components/MyProfile/MyProfile";
import ProductDetails from "../components/ProductDetails/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allProducts",
        Component: AllProducts,
      },
      {
        // path: "products/:id",
        // Component: ProductDetails,
        path: "products/:id",
        Component: ProductDetails,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_HOST_URL}/products/${params.id}`),
      },
      {
        path: "myProducts",
        element: (
          <PrivetRoute>
            <MyProducts></MyProducts>
          </PrivetRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivetRoute>
            <MyProfile></MyProfile>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);
