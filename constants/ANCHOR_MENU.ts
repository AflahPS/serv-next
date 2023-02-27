import {
  ExitToAppOutlined,
  HomeOutlined,
  Notifications,
  VerifiedUserOutlined,
} from "@mui/icons-material";

export const ANCHOR_MENU = [
  {
    title: "Home",
    icon: HomeOutlined,
    route: "/",
  },
  {
    title: "Profile",
    icon: VerifiedUserOutlined,
    route: "/profile",
  },
  {
    title: "Notifications",
    icon: Notifications,
    route: "/notifications",
  },
  {
    title: "Sign Out",
    icon: ExitToAppOutlined,
    route: null,
  },
];
