import { useState } from "react";
import { NavLink } from "react-router";
import Logo from "../Logo/Logo";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive
                ? "text-primary font-bold"
                : "text-base-content hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/allProducts"
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive
                ? "text-primary font-bold"
                : "text-base-content hover:text-primary"
            }`
          }
        >
          All Products
        </NavLink>
      </li>
    </>
  );

  return (
    <header>
      <nav className="bg-base-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div>
              <Logo></Logo>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-8 items-center">{navLinks}</ul>

            {/* Right side: theme toggle + mobile button */}
            <div className="flex items-center gap-2">
              <ToggleTheme />

              {/* Mobile Button */}
              <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <span className="text-2xl">✕</span>
                ) : (
                  <span className="text-2xl">☰</span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <ul className="md:hidden flex flex-col gap-4 pb-4">{navLinks}</ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
