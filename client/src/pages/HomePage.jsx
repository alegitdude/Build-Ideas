import Modal from "../Modal";
import Navbar from "../Navbar";
import HomeList from "../HomeList";
import Landing from "../Landing";
import { AppProvider } from "../context/Context";
import { LeaderboardProvider } from "../LeaderboardContext/Context";
import { useGlobalContext } from "../GlobalContext/Context";
import { Navigate } from "react-router-dom";
import Loader from "../Loader";

const HomePage = () => {
  const { user, isLoading } = useGlobalContext();
  return (
    <main>
      {user && <Navigate to="/" />}
      <AppProvider>
        {isLoading && <Loader />}
        <Modal />
        <Navbar />
        <Landing />
      </AppProvider>
      <LeaderboardProvider>
        <HomeList />
      </LeaderboardProvider>
    </main>
  );
};
export default HomePage;
