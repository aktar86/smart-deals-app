import { Outlet, Link } from "react-router";
import Logo from "../components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        <Link to="/">
          <Logo />
        </Link>

        <div className="text-primary-content">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Smart Deals,<br />Smarter Bids.
          </h1>
          <p className="text-primary-content/70 text-lg">
            Join thousands of buyers and sellers on the platform built for real-time deal discovery.
          </p>
        </div>

        <p className="text-primary-content/50 text-sm">
          © {new Date().getFullYear()} Smart Deals. All rights reserved.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
