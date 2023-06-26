import { useState } from "react";
import { useAppContext } from "./context/Context";
import { useGlobalContext } from "./GlobalContext/Context";
import { provideAllValuesAlert } from "./Alerts";
import RankedIdea from "./RankedIdea";
import { nanoid } from "nanoid";
import Loader from "./Loader";

const Profile = () => {
  const { myRankedIdeas, modalLoading } = useAppContext();
  const { user, updateUser } = useGlobalContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [formState, setFormState] = useState("profile");
  const [loading, setIsloading] = useState(false);

  const handleSubmit = (e) => {
    setIsloading(true);
    e.preventDefault();
    if (!name || !email) {
      provideAllValuesAlert();
      return;
    }
    updateUser({ name, email });
    setIsloading(false);
  };

  if (modalLoading) {
    return <Loader />;
  }
  return (
    <div className="login-container">
      <div className="login-tabs">
        <button
          onClick={() => setFormState("profile")}
          className={
            formState === "profile"
              ? "login-tab login-button active-tab"
              : "login-tab login-button"
          }
        >
          Profile
        </button>
        <button
          onClick={() => setFormState("rankedIdeas")}
          className={
            formState === "rankedIdeas"
              ? "login-tab signup-button active-tab"
              : "login-tab signup-button"
          }
        >
          Ranked Ideas
        </button>
      </div>
      <div
        className={
          formState === "profile"
            ? "modal-form login-form active"
            : "modal-form login-form"
        }
      >
        <h1>Profile</h1>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="login-form-row">
            <label className="login-form-label" id="name">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="login-input"
              type="text"
              id="name"
            ></input>
          </div>
          <div className="login-form-row">
            <label className="login-form-label" id="email">
              Email
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={email}
              name="email"
              className="login-input"
              type="email"
              id="email"
            ></input>
          </div>
          <button type="submit" className="btn btn-submit" disabled={loading}>
            {loading ? "Please Wait..." : "Save Changes"}
          </button>
        </form>
      </div>
      <div
        className={
          formState === "rankedIdeas"
            ? "modal-form signup-form active"
            : "modal-form signup-form"
        }
      >
        <div className="my-ranked-ideas-container">
          {myRankedIdeas.map((singleIdea) => {
            return <RankedIdea key={nanoid()} singleIdea={singleIdea} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Profile;
