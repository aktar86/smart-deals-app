import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="text-2xl font-bold">
      Smart<span className="text-primary">Deals</span>
    </Link>
  );
};

export default Logo;
