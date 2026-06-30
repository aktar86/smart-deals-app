import { createBrowserRouter } from "react-router";
import Home from "../components/Home/Home";
import RootLayout from "../layout/RootLayout";
import AllProducts from "../components/AllProducts/AllProducts";
import AuthLayout from "../layout/AuthLayout";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";

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
        path: "allProducts",
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
