import {
  AccountBoxOutlined,
  CalendarMonthOutlined,
  DynamicFeedOutlined,
  EngineeringOutlined,
  HomeRepairServiceOutlined,
  MailOutline,
  NotificationsOutlined,
  WorkOutlined,
} from "@mui/icons-material";

export const SIDE_NAV_LINKS = [
  {
    title: "Posts",
    icon: DynamicFeedOutlined,
    href: "/",
  },
  {
    title: "Services Nearby",
    icon: HomeRepairServiceOutlined,
    href: "/services",
  },
  {
    title: "Jobs Nearby",
    icon: EngineeringOutlined,
    href: "/jobs",
  },
  {
    title: "Profile",
    icon: AccountBoxOutlined,
    href: "/profile",
  },
  {
    title: "Messages",
    icon: MailOutline,
    href: "/chat",
  },
  {
    title: "Notifications",
    icon: NotificationsOutlined,
    href: "/notifications",
  },
  {
    title: "Calendar",
    icon: CalendarMonthOutlined,
    href: "/calendar",
  },
];
