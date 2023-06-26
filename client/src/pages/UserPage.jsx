import Modal from "../Modal";
import Navbar from "../Navbar";
import TopIdeasList from "../TopIdeasList";
import IdeaForm from "../IdeaForm";
import IdeaList from "../IdeaList";
import { LeaderboardProvider } from "../LeaderboardContext/Context";
import { AppProvider } from "../context/Context";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../GlobalContext/Context";
const UserPage = () => {
  return (
    <main>
      <AppProvider>
        <Modal />
        <Navbar />
        <IdeaForm />
        <IdeaList />
      </AppProvider>
      <LeaderboardProvider>
        <TopIdeasList />
      </LeaderboardProvider>
    </main>
  );
};
export default UserPage;
