import { useAppContext } from "./context/Context";

const Landing = () => {
  const { openModal } = useAppContext();

  return (
    <div className="login-banner">
      <button onClick={openModal} className="span-login">
        Login
      </button>
      to submit/rank ideas for my next website build!
    </div>
  );
};
export default Landing;
