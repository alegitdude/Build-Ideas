import { useState } from "react";
import { useAppContext } from "./context/Context";
import { useGlobalContext } from "./GlobalContext/Context";
import Lightbulb from "./Lightbulb";
import FIUserCheck from "./assets/FIUserCheck";

const Navbar = () => {
  const { openModal } = useAppContext();
  const { logoutUser, user } = useGlobalContext();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleProfile = () => {
    setUserMenuOpen(false);
    openModal();
  };

  return (
    <div
      onMouseLeave={() => setUserMenuOpen(false)}
      className="nav-container"
      id="nav"
    >
      <nav>
        <img className="logo" src="./Logo.png" alt="logo" />

        <Lightbulb />
        {user ? (
          <div className="user-menu">
            <FIUserCheck className="user-icon" onClick={toggleUserMenu} />

            <div
              className={isUserMenuOpen ? "submenu show-submenu" : "submenu"}
            >
              <button
                onClick={handleProfile}
                className="profile-btns profile-btn"
                type="button"
              >
                Profile
              </button>
              <button
                type="button"
                onClick={() => logoutUser()}
                className="profile-btns logout-btn"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button onClick={openModal} className="btn login">
            Login
          </button>
        )}
      </nav>
    </div>
  );
};
export default Navbar;
