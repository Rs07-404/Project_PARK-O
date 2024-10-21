// import AddConversation from "../../components/AddConversationBox/AddConversationBox.tsx";
// import { MessageContainer } from "../../components/MessageContainer/MessageContainer.tsx";
// import SideBar from "../../components/SideBar/SideBar.tsx";
import { useAppContext } from "../../context/AppContext.tsx";
// import useConversation from "../../zustand/useConversation.ts";

const Home = () => {
  //   const { selectedConversation } = useConversation();
  const { screenWidth } = useAppContext();

  return (
    <div className="chatBox">
      Home
      {/* <AddConversation />
                {screenWidth <= 850 && !selectedConversation &&<SideBar />}
                {screenWidth > 850 && <SideBar />}
                {screenWidth <= 850 && selectedConversation &&<MessageContainer />}
                {screenWidth > 850 && <MessageContainer />} */}
    </div>
  );
};

export default Home;
