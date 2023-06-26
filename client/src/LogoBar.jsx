import { Link } from "react-router-dom";
import Lightbulb from "./Lightbulb";

const LogoBar = () => {
  return (
    <div className="nav-container" id="nav">
      <nav>
        <Link to="/landing">
          <img className="logo" src="/Logo.png" alt="logo" />
        </Link>

        <Lightbulb />
      </nav>
    </div>
  );
};
export default LogoBar;
