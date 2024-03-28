import { Link } from "react-router-dom";
import "./navbar.css"
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          <span className="logo">Journey</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
