import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main className="max-w-7xl mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
