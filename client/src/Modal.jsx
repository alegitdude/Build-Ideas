import { useAppContext } from "./context/Context";

import { Login } from "./Login";
import Profile from "./Profile";
import { useGlobalContext } from "./GlobalContext/Context";
import TimesIcon from "./assets/TimesIcon";

const Modal = () => {
  const { isModalOpen, closeModal } = useAppContext();
  const { user } = useGlobalContext();

  return (
    <div className={isModalOpen ? "modal-overlay show-modal" : "modal-overlay"}>
      <div className="modal-container">
        <button className="close-modal-btn" onClick={closeModal}>
          <TimesIcon />
        </button>

        {user ? <Profile /> : <Login />}
      </div>
    </div>
  );
};

export default Modal;
