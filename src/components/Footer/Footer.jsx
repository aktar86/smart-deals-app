import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo & Description */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xl">
                S
              </div>
              <span className="text-2xl font-bold">
                Smart<span className="text-primary">Deals</span>
              </span>
            </Link>

            <p className="text-sm opacity-80 max-w-sm">
              Discover the best deals, discounts, and offers from trusted
              sellers. Shop smarter and save more with SmartDeals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="link link-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="link link-hover">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="link link-hover">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link link-hover">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-title">Contact</h3>
            <p>Email: support@smartdeals.com</p>
            <p>Phone: +880 1234-567890</p>
            <p>Location: Sylhet, Bangladesh</p>
          </div>
        </div>

        <div className="border-t border-base-300 mt-8 pt-5 text-center text-sm">
          © {new Date().getFullYear()} SmartDeals. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
