import { AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMail } from "react-icons/fi";

export const NAV = [
  {
    title: "Home",
    icon: AiOutlineHome,
    href: "/",
  },
  {
    title: "Requests",
    icon: AiOutlineUserAdd,
    href: "/requests",
  },
  {
    title: "Notifications",
    icon: IoMdNotificationsOutline,
    href: "/notifications",
  },
  {
    title: "Messages",
    icon: FiMail,
    href: "/chat",
  },
];
