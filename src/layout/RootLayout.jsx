import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      {/* header */}
      <Navbar />

      {/* main */}
      <main className="max-w-7xl mx-auto px-4 min-h-[calc(100vh-370px)]">
        <Outlet />
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
