import {
  AccountBoxOutlined,
  CalendarMonthOutlined,
  DashboardCustomizeOutlined,
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
    allowedRoles: ["user", "guest", "vendor"],
  },
  {
    title: "Services Nearby",
    icon: HomeRepairServiceOutlined,
    href: "/services",
    allowedRoles: ["user", "guest", "vendor"],
  },
  {
    title: "Jobs Nearby",
    icon: EngineeringOutlined,
    href: "/jobs",
    allowedRoles: ["user", "guest", "vendor"],
  },
  {
    title: "Profile",
    icon: AccountBoxOutlined,
    href: "/profile",
    allowedRoles: ["user", "vendor"],
  },
  {
    title: "Messages",
    icon: MailOutline,
    href: "/chat",
    allowedRoles: ["user", "vendor"],
  },
  {
    title: "Notifications",
    icon: NotificationsOutlined,
    href: "/notifications",
    allowedRoles: ["user", "vendor"],
  },
  {
    title: "Calendar",
    icon: CalendarMonthOutlined,
    href: "/calendar",
    allowedRoles: ["vendor"],
  },
  {
    title: "Dashboard",
    icon: DashboardCustomizeOutlined,
    href: "/dashboard",
    allowedRoles: ["vendor"],
  },
];
