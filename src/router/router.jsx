import { createBrowserRouter } from "react-router";
import Home from "../components/Home/Home";
import RootLayout from "../layout/RootLayout";
import AllProducts from "../components/AllProducts/AllProducts";

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
]);
