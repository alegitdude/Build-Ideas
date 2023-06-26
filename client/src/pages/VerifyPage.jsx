import Modal from "../Modal";
import Navbar from "../Navbar";
import HomeList from "../HomeList";
import Landing from "../Landing";
import { AppProvider } from "../context/Context";
import { LeaderboardProvider } from "../LeaderboardContext/Context";
import { useGlobalContext } from "../GlobalContext/Context";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import { errorResponseAlert, genericSuccessAlert } from "../Alerts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoading } = useGlobalContext();
  const query = useQuery();

  const verifyToken = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/auth/verify-email", {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
      genericSuccessAlert(
        "Success! Login at the top to start creating and ranking ideas!"
      );
    } catch (error) {
      errorResponseAlert(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      verifyToken();
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="landing">
        <h4>There was an error, please double check your verification link </h4>
      </div>
    );
  }

  return (
    <main>
      <AppProvider>
        {isLoading && <Loader />}
        <Modal />
        <Navbar />
        <h2>Account Confirmed</h2>
        <Landing />
      </AppProvider>
      <LeaderboardProvider>
        <HomeList />
      </LeaderboardProvider>
    </main>
  );
};
export default VerifyPage;
