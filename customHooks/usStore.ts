import { useSelector } from "react-redux";
import { StoreState } from "../store/store";

export const useStore = () => {
  const isAuth = useSelector((state: StoreState) => state.auth.isAuth);
  const token = useSelector((state: StoreState) => state.jwt.token);
  const role = useSelector((state: StoreState) => state.role.currentUser);
  const profileTab = useSelector(
    (state: StoreState) => state.profileTab.currentTab
  );
  const panelTab = useSelector(
    (state: StoreState) => state.panelTab.currentTab
  );
  const activitiesTab = useSelector(
    (state: StoreState) => state.activitiesTab.currentTab
  );
  const currentUser = useSelector((state: StoreState) => state.user.data);
  const sideNavTab = useSelector(
    (state: StoreState) => state.sideNavTab.currentTab
  );
  const layoutLoading = useSelector(
    (state: StoreState) => state.layoutLoading.isLayoutLoading
  );
  const selectedChat = useSelector((state: StoreState) => state.chat.chatId);
  const chatList = useSelector((state: StoreState) => state.chatList.chats);
  const socketCurrent = useSelector(
    (state: StoreState) => state.socket.current
  );
  const onlineUsers = useSelector(
    (state: StoreState) => state.onlineUsers.users
  );

  return {
    isAuth,
    token,
    role,
    profileTab,
    panelTab,
    activitiesTab,
    currentUser,
    sideNavTab,
    layoutLoading,
    selectedChat,
    chatList,
    socketCurrent,
    onlineUsers,
  };
};
