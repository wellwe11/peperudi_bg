import useScrolled from "@/hooks/useScrolled";
import "./Nav.scss";
import { Link } from "@tanstack/react-router";

const LOGO_NAME = "Peperudi";
const NAV_LINKS = [
  { name: "home", to: "/" },
  { name: "gallery", to: "/gallery" },
  { name: "cart", to: "/cart" },
];

const Nav = () => {
  const isScrolled = useScrolled(10);

  return (
    <nav className={`nav ${isScrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav_inner">
        <Link to="/" className="nav_logo">
          {LOGO_NAME}
        </Link>

        <ul className="nav_links">
          {NAV_LINKS.map(({ name, to }, i) => (
            <li key={i}>
              <Link to={to} className="nav_link sans_text">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
